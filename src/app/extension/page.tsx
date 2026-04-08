"use client";

import Link from "next/link";
import {
  Download,
  Globe,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Settings,
  Eye,
  MousePointer,
  Puzzle,
  Clock,
} from "lucide-react";

export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-semibold text-gray-800">Chrome Extension</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-5">
            <Puzzle className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            GEO-Chain for Four.Meme
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            See AI search visibility scores directly on four.meme project
            pages. Know which projects AI engines recognize before you invest.
          </p>
        </div>

        {/* Two Download Options */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {/* Option 1: Chrome Web Store */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock size={12} />
                Coming Soon
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Globe size={20} className="text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Chrome Web Store
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              One-click install from Chrome Web Store. Auto-updates included.
              Currently under review.
            </p>
            <button
              disabled
              className="w-full py-2.5 px-4 rounded-xl bg-gray-100 text-gray-400 font-medium text-sm cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>

          {/* Option 2: Manual Install */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} />
                Available Now
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
              <Download size={20} className="text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Manual Install (Developer Mode)
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Download the extension package and load it in Chrome Developer
              Mode. Takes about 1 minute.
            </p>
            <a
              href="https://github.com/nicekate/geo-chain/tree/main/extension"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download size={16} />
              Download Extension Package
            </a>
          </div>
        </div>

        {/* Install Guide */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            How to Install (Manual Mode)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Download & Unzip
                </h4>
                <p className="text-sm text-gray-500">
                  Download the extension package from GitHub, then unzip the
                  file to a folder on your computer.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Open Extensions Page
                </h4>
                <p className="text-sm text-gray-500">
                  In Chrome, go to{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
                    chrome://extensions
                  </code>{" "}
                  or click Menu → Extensions → Manage Extensions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Enable Developer Mode
                </h4>
                <p className="text-sm text-gray-500">
                  Toggle the{" "}
                  <strong>&quot;Developer mode&quot;</strong> switch in the
                  top-right corner of the extensions page.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Load Unpacked
                </h4>
                <p className="text-sm text-gray-500">
                  Click <strong>&quot;Load unpacked&quot;</strong>, select the
                  unzipped extension folder. Done! Visit four.meme to see GEO
                  scores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                icon: <Settings size={20} />,
                title: "Auto-Activate",
                desc: "Extension activates only on four.meme — no other sites affected.",
              },
              {
                icon: <Eye size={20} />,
                title: "Scan Projects",
                desc: "Detects projects with X/Twitter or website links on the page.",
              },
              {
                icon: <MousePointer size={20} />,
                title: "GEO Badge",
                desc: "Hover the badge to see 4-engine scores and key findings.",
              },
              {
                icon: <ExternalLink size={20} />,
                title: "Full Report",
                desc: "Click to open GEO-Chain web app for detailed analysis.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-gray-50"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 text-blue-600">
                  {step.icon}
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="text-center mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">
            Supported Platforms
          </h3>
          <div className="flex gap-3 justify-center flex-wrap">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
              four.meme ✓
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-400">
              pump.fun (Soon)
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-400">
              GMGN (Soon)
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-400">
              DEXScreener (Soon)
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            ← Back to GEO-Chain
          </Link>
        </div>
      </div>
    </div>
  );
}
