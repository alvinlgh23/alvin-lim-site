import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alvin Lim | Chainstox Lab",
  description: "Personal landing page and Chainstox Lab experiments by Alvin Lim."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
