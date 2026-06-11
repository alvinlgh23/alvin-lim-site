import Link from "next/link";

export default function ThoughtsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-bone">
      <div className="max-w-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-ember/80">Thoughts</p>
        <h1 className="mt-4 text-4xl font-semibold">Coming soon.</h1>
        <Link className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
