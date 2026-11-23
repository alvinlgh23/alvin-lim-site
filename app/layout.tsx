import type { Metadata } from "next";
import { Instrument_Sans, Inter_Tight, Newsreader } from "next/font/google";
import "./globals.css";
import { Shortcuts } from "@/components/site/Shortcuts";

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const grotesk = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Alvin Lim",
  description:
    "A curiosity about how things work — and how they could work better. Research, technology, financial markets, academic transitions, and field notes by Alvin Lim."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${grotesk.variable}`}>
      <body className="antialiased selection:bg-ink selection:text-ivory">
        {children}
        <Shortcuts />
      </body>
    </html>
  );
}
