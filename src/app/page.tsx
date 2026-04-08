import Link from "next/link";
import {
  Search,
  FileBarChart,
  Sparkles,
  Puzzle,
  ArrowRight,
  Rocket,
  TrendingUp,
  Globe,
  Eye,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesGrid />
      <ChromeExtensionPromo />
      <Roadmap />
      <Footer />
    </div>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <Eye className="h-4 w-4" />
          AI Search Visibility Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Is Your Web3 Project
          <br />
          <span className="gradient-text">Visible to AI Search?</span>
        </h1>

        {/* Sub-heading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          Scan your project across <strong>4 AI engines</strong> &mdash;
          ChatGPT, Perplexity, Gemini, and Grok &mdash; and get a{" "}
          <strong>free GEO report</strong> with visibility scores, engine
          comparison, and actionable insights.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/scan"
            className="gradient-btn inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-600/20"
          >
            <Search className="h-5 w-5" />
            Start GEO Scan
          </Link>
          <Link
            href="/extension"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
          >
            <Puzzle className="h-5 w-5" />
            Get Chrome Extension
          </Link>
        </div>

        {/* Engine badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {["ChatGPT", "Perplexity", "Gemini", "Grok"].map((engine) => (
            <span
              key={engine}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-200"
            >
              {engine}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── Features Grid ─────────────────────── */

const features = [
  {
    icon: Search,
    title: "4-Engine Detection",
    description:
      "Simultaneously query ChatGPT, Perplexity, Gemini, and Grok to measure how each AI engine sees your project. Real-time results, no manual testing.",
    highlights: ["ChatGPT", "Perplexity", "Gemini", "Grok"],
  },
  {
    icon: FileBarChart,
    title: "Free GEO Report",
    description:
      "Get a comprehensive visibility score, side-by-side engine comparison chart, and a prioritized list of problems to fix. Completely free.",
    highlights: ["Visibility Score", "Engine Comparison", "Problem List"],
  },
  {
    icon: Sparkles,
    title: "Paid AI Suggestions",
    description:
      "For $3 (payable in $FOUR or $DGAI), receive AI-generated optimization suggestions minted as an on-chain NFT. Your GEO strategy, permanently recorded.",
    highlights: ["$3 / $FOUR / $DGAI", "NFT Minted", "On-Chain Record"],
  },
];

function FeaturesGrid() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need for{" "}
            <span className="gradient-text">AI Visibility</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From detection to optimization, GEO-Chain covers the full pipeline.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                {f.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {f.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Chrome Extension Promo ──────────────────── */

function ChromeExtensionPromo() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">
            {/* Left: text */}
            <div className="text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Puzzle className="h-4 w-4" />
                Chrome Extension
              </div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                GEO Scan While You Browse
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blue-100">
                Install the GEO-Chain Chrome Extension and check any Web3
                project&apos;s AI visibility with one click &mdash; right from
                your browser. No need to visit our site.
              </p>
              <ul className="mt-6 space-y-3 text-blue-100">
                {[
                  "One-click scan on any webpage",
                  "Inline visibility score badge",
                  "Quick access to full reports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/extension"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-lg transition-colors hover:bg-blue-50"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: mock extension popup */}
            <div className="flex justify-center lg:justify-end">
              <MockExtensionPopup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockExtensionPopup() {
  return (
    <div className="w-full max-w-xs">
      {/* Popup frame */}
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-white/20">
            <Search className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-white">GEO-Chain</span>
          <span className="ml-auto text-xs text-blue-200">v1.0</span>
        </div>

        {/* Body */}
        <div className="space-y-4 p-4">
          {/* URL bar */}
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">uniswap.org</span>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-4xl font-extrabold text-green-500">78</div>
            <div className="mt-1 text-xs font-medium text-gray-500">
              GEO Visibility Score
            </div>
          </div>

          {/* Mini engine bars */}
          <div className="space-y-2">
            {[
              { name: "ChatGPT", score: 85, color: "bg-green-500" },
              { name: "Perplexity", score: 72, color: "bg-blue-500" },
              { name: "Gemini", score: 80, color: "bg-yellow-500" },
              { name: "Grok", score: 65, color: "bg-purple-500" },
            ].map((e) => (
              <div key={e.name} className="flex items-center gap-2 text-xs">
                <span className="w-16 shrink-0 font-medium text-gray-600">
                  {e.name}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${e.color}`}
                    style={{ width: `${e.score}%` }}
                  />
                </div>
                <span className="w-6 text-right font-semibold text-gray-700">
                  {e.score}
                </span>
              </div>
            ))}
          </div>

          {/* Action */}
          <button
            type="button"
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-xs font-semibold text-white"
          >
            View Full Report
          </button>
        </div>
      </div>

      {/* Tooltip arrow */}
      <div className="mx-auto -mt-px h-3 w-3 rotate-45 rounded-sm bg-white shadow" />
    </div>
  );
}

/* ─────────────────────── Roadmap ──────────────────────────── */

const roadmapItems = [
  {
    phase: "Q2 2026",
    label: "NOW",
    icon: Rocket,
    color: "from-green-500 to-emerald-600",
    items: [
      "4-engine GEO scan",
      "Free visibility report",
      "Paid AI suggestions (NFT)",
      "Chrome extension MVP",
      "Token payment ($FOUR / $DGAI)",
    ],
  },
  {
    phase: "Q3 2026",
    label: "Growth",
    icon: TrendingUp,
    color: "from-blue-500 to-blue-700",
    items: [
      "Historical trend tracking",
      "Competitor comparison",
      "Batch project scanning",
      "API access for developers",
      "Community dashboard",
    ],
  },
  {
    phase: "Q4 2026",
    label: "Scale",
    icon: Globe,
    color: "from-purple-500 to-purple-700",
    items: [
      "Multi-chain expansion",
      "DAO governance integration",
      "Enterprise tier",
      "GEO score leaderboard",
      "Partner integrations",
    ],
  },
  {
    phase: "2027+",
    label: "Vision",
    icon: Sparkles,
    color: "from-orange-500 to-red-500",
    items: [
      "Autonomous GEO agents",
      "Real-time AI monitoring",
      "Cross-language support",
      "Decentralized oracle network",
      "Full on-chain analytics",
    ],
  },
];

function Roadmap() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our journey to make every Web3 project visible to AI.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roadmapItems.map((item) => (
            <div
              key={item.phase}
              className="card-hover relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Phase badge */}
              <div
                className={`mb-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${item.color} px-3 py-1 text-xs font-bold text-white`}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.phase}
                {item.label === "NOW" && (
                  <span className="ml-1 animate-pulse rounded bg-white/25 px-1.5 py-0.5 text-[10px]">
                    NOW
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold">{item.label}</h3>

              <ul className="mt-4 space-y-2.5">
                {item.items.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── Footer ──────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <Search className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">GEO-Chain</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/peiffer-innovations/geo-chain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://twitter.com/Feng21671868"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ExternalLink className="h-4 w-4" />
              @Feng21671868
            </a>
            <a
              href="https://dorahacks.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ExternalLink className="h-4 w-4" />
              DoraHacks
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; 2026 GEO-Chain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
