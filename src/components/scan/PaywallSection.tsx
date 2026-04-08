"use client";

import { useState } from "react";
import { Lock, Coins, Loader2, CheckCircle2 } from "lucide-react";

interface PaywallSectionProps {
  onUnlock: () => void;
}

const TOKEN_OPTIONS = [
  { symbol: "$FOUR", name: "FOUR Token", recommended: true },
  { symbol: "$DGAI", name: "DegenAI", recommended: true },
  { symbol: "BNB", name: "BNB", recommended: false },
  { symbol: "USDT", name: "Tether USD", recommended: false },
];

type PayState = "idle" | "processing" | "success";

export function PaywallSection({ onUnlock }: PaywallSectionProps) {
  const [selected, setSelected] = useState(0);
  const [payState, setPayState] = useState<PayState>("idle");

  function handlePay() {
    setPayState("processing");
    setTimeout(() => {
      setPayState("success");
      setTimeout(() => {
        onUnlock();
      }, 800);
    }, 2000);
  }

  if (payState === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle2 size={48} className="mx-auto text-green-500 mb-3" />
        <p className="text-green-700 font-semibold">Payment Successful</p>
        <p className="text-sm text-green-600 mt-1">
          Unlocking optimization suggestions...
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-sm border-2 border-dashed border-blue-200 overflow-hidden">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <Lock size={24} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Unlock AI Optimization Suggestions
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Get actionable recommendations to improve your project's AI visibility
          across all major engines. Results are minted as an on-chain NFT
          credential.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-lg mx-auto">
        {TOKEN_OPTIONS.map((tok, i) => (
          <button
            key={tok.symbol}
            onClick={() => setSelected(i)}
            className={`relative p-3 rounded-xl border-2 transition-all text-center ${
              selected === i
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {tok.recommended && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] bg-blue-500 text-white px-2 py-0 rounded-full">
                Recommended
              </span>
            )}
            <Coins size={18} className="mx-auto mb-1 text-gray-600" />
            <p className="text-sm font-semibold text-gray-800">{tok.symbol}</p>
            <p className="text-[10px] text-gray-400">{tok.name}</p>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handlePay}
          disabled={payState === "processing"}
          className="gradient-btn px-8 py-3 rounded-xl font-semibold text-sm disabled:opacity-60 inline-flex items-center gap-2"
        >
          {payState === "processing" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>Pay $3 & Unlock</>
          )}
        </button>
        <p className="text-xs text-gray-400 mt-3">
          Powered by GEO-Chain Smart Contract on BNB Chain
        </p>
      </div>
    </div>
  );
}
