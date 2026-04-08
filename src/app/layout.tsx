import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Zap } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEO-Chain | AI Search Visibility for Web3",
  description:
    "Check if your Web3 project is visible to AI search engines. Get a free GEO report with scores across ChatGPT, Perplexity, Gemini, and Grok.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "var(--nav-bg)", color: "var(--nav-text)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-btn">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              GEO-Chain
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden items-center gap-1 sm:flex">
            <Link
              href="/scan"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              New Scan
            </Link>
            <Link
              href="/extension"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              Extension
            </Link>
          </div>

          {/* Wallet button placeholder */}
          <button
            type="button"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}
