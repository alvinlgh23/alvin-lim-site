import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alvin Lim — A Personal Archive",
  description:
    "A curiosity about how things work — and how they could work better. Research, technology, financial markets, academic transitions, and field notes by Alvin Lim."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-ink selection:text-ivory">
        <div className="museum-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
