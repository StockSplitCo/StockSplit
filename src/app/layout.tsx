import type { Metadata } from "next";

import "./globals.css";
import { SolanaProvider } from "./components/SolanaProvider";
import Navbar from "./components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "StockSplit - Democratizing Startup Investments",
  description: "StockSplit enables micro-investments into startups through tokenized equity shares.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>
          <Navbar />
          <main className="min-h-screen bg-amber-50">
            {children}
          </main>
        </SolanaProvider>
      </body>
    </html>
  );
}
