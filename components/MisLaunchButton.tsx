"use client";

import { useEffect, useState } from "react";

type MisLaunchButtonProps = {
  variant?: "primary" | "secondary" | "compact";
  label?: string;
  targetUrl?: string;
};

const DEFAULT_MIS_URL = "https://mis.alvin-lim.com";

export function MisLaunchButton({
  variant = "primary",
  label = "Launch Application",
  targetUrl = DEFAULT_MIS_URL
}: MisLaunchButtonProps) {
  const [status, setStatus] = useState<"checking" | "online" | "pending">("checking");
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    fetch(targetUrl, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal
    })
      .then(() => {
        if (active) setStatus("online");
      })
      .catch(() => {
        if (active) setStatus("pending");
      })
      .finally(() => {
        clearTimeout(timer);
      });

    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [targetUrl]);

  const baseStyles =
    variant === "compact"
      ? "lab-button-primary lab-focus-ring inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-white"
      : variant === "secondary"
        ? "lab-button-secondary lab-focus-ring inline-flex items-center gap-2.5 rounded-md px-4 py-3 font-medium transition hover:-translate-y-0.5 hover:border-bone/30"
        : "lab-button-primary lab-focus-ring inline-flex items-center gap-2.5 rounded-md px-5 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white";

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <div className="flex flex-wrap items-center gap-2.5">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            if (status === "pending" && !showNotice) {
              event.preventDefault();
              setShowNotice(true);
            }
          }}
          className={baseStyles}
          aria-label={`${label} (opens ${targetUrl} in a new tab)`}
        >
          <span>{label}</span>
          <span className="font-mono text-xs" aria-hidden="true">
            ↗
          </span>
        </a>

        <span
          className={`lab-eyebrow inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] ${
            status === "online"
              ? "border-moss/30 bg-moss/10 text-moss"
              : status === "pending"
                ? "border-ember/35 bg-ember/10 text-ember"
                : "border-white/12 bg-white/[0.03] text-bone/55"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status === "online"
                ? "bg-moss"
                : status === "pending"
                  ? "bg-ember"
                  : "bg-bone/45"
            }`}
          />
          {status === "online"
            ? "mis.alvin-lim.com · ready"
            : status === "pending"
              ? "mis.alvin-lim.com · dns / deployment pending"
              : "verifying endpoint..."}
        </span>
      </div>

      {showNotice ? (
        <div
          role="status"
          className="max-w-md rounded-md border border-ember/35 bg-ember/10 px-3.5 py-2.5 text-xs leading-relaxed text-bone/85"
        >
          <p className="font-medium text-bone">
            Standalone application endpoint (`https://mis.alvin-lim.com`) is not responding yet.
          </p>
          <p className="mt-1 text-bone/65">
            The external launch link is configured and ready. Once DNS and deployment for{" "}
            <span className="font-mono text-bone">mis.alvin-lim.com</span> are active, this button will open the live workstation directly.{" "}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-bone underline underline-offset-4 hover:text-white"
            >
              Proceed to {targetUrl} anyway ↗
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
