"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  FileCode2,
  Type,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Circle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import type { GEOScanResult } from "@/types/geo";
import { getMockResult, MOCK_SCAN_STEPS, CATEGORIES } from "@/lib/mock-data";
import { GeoScoreRing } from "@/components/scan/GeoScoreRing";
import { DimensionBars } from "@/components/scan/DimensionBars";
import { EngineCards } from "@/components/scan/EngineCards";
import { QueryAnalysisPanel } from "@/components/scan/QueryAnalysisPanel";
import { PaywallSection } from "@/components/scan/PaywallSection";
import { SuggestionsList } from "@/components/scan/SuggestionsList";
import { NFTResult } from "@/components/scan/NFTResult";

type PagePhase = "input" | "scanning" | "results";
type TabMode = "contract" | "project";

export default function ScanPage() {
  // --- input state ---
  const [tab, setTab] = useState<TabMode>("contract");
  const [contractAddress, setContractAddress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [category, setCategory] = useState("");
  const [detectedInfo, setDetectedInfo] = useState<{
    name: string;
    symbol: string;
  } | null>(null);

  // --- scanning state ---
  const [phase, setPhase] = useState<PagePhase>("input");
  const [scanStep, setScanStep] = useState(0);

  // --- results state ---
  const [result, setResult] = useState<GEOScanResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  // real contract detection via API
  const [detecting, setDetecting] = useState(false);
  useEffect(() => {
    if (tab !== "contract" || !/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      setDetectedInfo(null);
      return;
    }
    setDetecting(true);
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/token-info?address=${contractAddress}`, { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          setDetectedInfo({ name: data.name, symbol: data.symbol });
        } else {
          setDetectedInfo({ name: "Unknown Contract", symbol: "???" });
        }
      } catch {
        if (!controller.signal.aborted) setDetectedInfo({ name: "Unknown Contract", symbol: "???" });
      } finally {
        setDetecting(false);
      }
    }, 300);
    return () => { clearTimeout(t); controller.abort(); };
  }, [contractAddress, tab]);

  // scanning progress + real API call
  const [apiStarted, setApiStarted] = useState(false);
  const [apiResult, setApiResult] = useState<GEOScanResult | null>(null);

  // Start real API call when scanning begins
  useEffect(() => {
    if (phase !== "scanning" || apiStarted) return;
    setApiStarted(true);
    const body: Record<string, string> = {};
    if (tab === "contract" && contractAddress) body.contractAddress = contractAddress;
    if (projectName) body.projectName = projectName;
    if (category) body.category = category;

    fetch("/api/scan/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setApiResult(data); })
      .catch(() => {}); // fallback to mock on failure
  }, [phase, apiStarted, tab, contractAddress, projectName, category]);

  // Progress animation (visual only, runs independently of API)
  useEffect(() => {
    if (phase !== "scanning") return;
    if (scanStep >= MOCK_SCAN_STEPS.length) {
      // Use real API result if available, otherwise fallback to mock
      const finalResult = apiResult || getMockResult(projectName || undefined, contractAddress || undefined);
      setResult(finalResult);
      setPhase("results");
      setApiStarted(false);
      setApiResult(null);
      return;
    }
    const delay = 600 + Math.random() * 800;
    const t = setTimeout(() => setScanStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [phase, scanStep, projectName, contractAddress, apiResult]);

  const canSubmit =
    (tab === "contract" && contractAddress.length >= 10) ||
    (tab === "project" && projectName.trim().length > 0);

  const handleScan = useCallback(() => {
    setScanStep(0);
    setResult(null);
    setUnlocked(false);
    setApiStarted(false);
    setApiResult(null);
    setPhase("scanning");
  }, []);

  const handleReset = useCallback(() => {
    setPhase("input");
    setScanStep(0);
    setResult(null);
    setUnlocked(false);
    setApiStarted(false);
    setApiResult(null);
  }, []);

  // ----------------------------------------------------------------
  // RENDER: INPUT PHASE
  // ----------------------------------------------------------------
  if (phase === "input") {
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold text-gray-800">GEO Scan</h1>
          </div>
        </header>

        <main className="flex-1 flex items-start justify-center pt-16 px-4 pb-16">
          <div className="w-full max-w-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Scan AI Visibility
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Analyze how AI engines perceive your Web3 project across
                ChatGPT, Perplexity, Gemini, and Grok.
              </p>
            </div>

            {/* Tab Switch */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setTab("contract")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === "contract"
                    ? "bg-white shadow text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileCode2 size={16} />
                Contract Address
              </button>
              <button
                onClick={() => setTab("project")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === "project"
                    ? "bg-white shadow text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Type size={16} />
                Project Name
              </button>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {tab === "contract" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contract Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm font-mono transition-shadow"
                  />
                  {detecting && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2.5 rounded-xl">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Detecting token info...</span>
                    </div>
                  )}
                  {!detecting && detectedInfo && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2.5 rounded-xl">
                      <CheckCircle2 size={16} />
                      <span>
                        Detected:{" "}
                        <strong>
                          {detectedInfo.name} ({detectedInfo.symbol})
                        </strong>{" "}
                        on BNB Chain
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. PancakeSwap"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm appearance-none bg-white transition-shadow"
                      >
                        <option value="">Select category (optional)</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleScan}
                disabled={!canSubmit}
                className="w-full mt-6 gradient-btn py-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Search size={16} />
                Start GEO Scan
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Scans are stored on-chain as NFT credentials via BNB Chain
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // RENDER: SCANNING PHASE
  // ----------------------------------------------------------------
  if (phase === "scanning") {
    const progress = (scanStep / MOCK_SCAN_STEPS.length) * 100;
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <h1 className="text-lg font-bold text-gray-800">Scanning...</h1>
          </div>
        </header>

        <main className="flex-1 flex items-start justify-center pt-16 px-4">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <Loader2 size={28} className="text-blue-500 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Analyzing AI Visibility
              </h2>
              <p className="text-sm text-gray-500">
                {tab === "contract"
                  ? contractAddress.slice(0, 10) + "..."
                  : projectName}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-3">
                {MOCK_SCAN_STEPS.map((step, i) => {
                  let status: "done" | "active" | "pending";
                  if (i < scanStep) status = "done";
                  else if (i === scanStep) status = "active";
                  else status = "pending";

                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                        status === "pending" ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      {status === "done" && (
                        <CheckCircle2
                          size={18}
                          className="text-green-500 shrink-0"
                        />
                      )}
                      {status === "active" && (
                        <Loader2
                          size={18}
                          className="text-blue-500 animate-spin shrink-0"
                        />
                      )}
                      {status === "pending" && (
                        <Circle
                          size={18}
                          className="text-gray-300 shrink-0"
                        />
                      )}
                      <span
                        className={
                          status === "done"
                            ? "text-green-700"
                            : status === "active"
                              ? "text-blue-700 font-medium"
                              : "text-gray-400"
                        }
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // RENDER: RESULTS PHASE
  // ----------------------------------------------------------------
  if (phase === "results" && result) {
    return (
      <div className="min-h-screen bg-[#f5f6fa]">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  {result.projectName}
                </h1>
                <p className="text-xs text-gray-400">
                  {result.category && (
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mr-2">
                      {result.category}
                    </span>
                  )}
                  Scan ID: {result.id}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <RotateCcw size={14} />
              New Scan
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center">
              <GeoScoreRing score={result.geoScore.total} />
            </div>
            <div className="md:col-span-2">
              <DimensionBars
                mention={result.geoScore.mention}
                accuracy={result.geoScore.accuracy}
                ranking={result.geoScore.ranking}
                sentiment={result.geoScore.sentiment}
                sources={result.geoScore.sources}
              />
            </div>
          </div>

          {/* Engine Cards */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Engine Comparison
            </h2>
            <EngineCards engines={result.geoScore.engines} />
          </div>

          {/* Query Analysis */}
          <QueryAnalysisPanel
            queries={result.queries}
            analyses={result.analyses}
          />

          {/* Paywall or Unlocked Content */}
          {!unlocked ? (
            <PaywallSection onUnlock={() => setUnlocked(true)} />
          ) : (
            <div className="space-y-6">
              <SuggestionsList suggestions={result.suggestions} />
              <NFTResult
                tokenId="1042"
                txHash="0x7a3b8c92d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e4f2"
                projectName={result.projectName}
                score={result.geoScore.total}
              />
            </div>
          )}
        </main>
      </div>
    );
  }

  return null;
}
