"use client";

import { useEffect, useRef } from "react";

/*
  A 3D "market surface": a field of points rolling like a price landscape,
  seen in perspective. The cursor tilts the camera and lifts the terrain under it.
  Plain canvas, no WebGL dependency; pauses when off screen or for reduced motion.
*/
export function MarketField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLS = 96;
    const ROWS = 52;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: 0, tActive: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.tActive = 1;
    };
    const onLeave = () => {
      pointer.tActive = 0;
    };

    const draw = (time: number) => {
      const t = time * 0.00035;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      pointer.active += (pointer.tActive - pointer.active) * 0.04;

      ctx.clearRect(0, 0, width, height);
      const focal = Math.min(width, height * 1.6) * 0.9;
      const horizon = height * (0.5 - pointer.y * 0.04);
      const camX = pointer.x * 0.6;
      const camY = 1.6;

      for (let r = ROWS - 1; r >= 0; r--) {
        const z = 1.2 + (r / (ROWS - 1)) * 10;
        for (let c = 0; c < COLS; c++) {
          const x = ((c / (COLS - 1)) * 2 - 1) * 7.5;
          // Rolling terrain: two slow swells and a faster ripple, like overlapping cycles
          let y =
            Math.sin(x * 0.55 + t * 2.1) * 0.5 +
            Math.cos(z * 0.6 - t * 1.6) * 0.42 +
            Math.sin((x + z) * 1.3 + t * 3.2) * 0.1;

          const sx = width / 2 + ((x - camX) / z) * focal;
          // Cursor lifts the field beneath it
          const dxp = (sx / width) * 2 - 1 - pointer.x;
          const near = Math.exp(-(dxp * dxp) * 6) * Math.exp(-((z - 4) * (z - 4)) * 0.05);
          y += near * 0.8 * pointer.active;

          const sy = horizon + ((camY - y) / z) * focal;
          if (sx < -4 || sx > width + 4 || sy < -4 || sy > height + 4) continue;

          const depth = 1 - r / (ROWS - 1);
          const size = Math.max(1, (2.6 / z) * 2.6);
          const crest = Math.max(0, y - 0.35);
          const alpha = Math.min(1, 0.16 + depth * 0.7 + crest * 0.8);
          ctx.fillStyle = crest > 0.12 ? `rgba(255,214,190,${alpha})` : `rgba(255,255,255,${alpha})`;
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
      }

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
