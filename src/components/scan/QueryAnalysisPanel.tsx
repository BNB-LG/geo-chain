"use client";

import { useState } from "react";
import type { QueryAnalysis, EngineQuery } from "@/types/geo";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Bot,
  Globe,
  Sparkles,
  Zap,
} from "lucide-react";

interface QueryAnalysisPanelProps {
  queries: EngineQuery[];
  analyses: QueryAnalysis[];
}

const ENGINE_ICON: Record<string, typeof Bot> = {
  chatgpt: Bot,
  perplexity: Globe,
  gemini: Sparkles,
  grok: Zap,
};

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  gemini: "Gemini",
  grok: "Grok",
};

const CATEGORY_COLORS: Record<string, string> = {
  brand: "bg-blue-100 text-blue-700",
  category: "bg-purple-100 text-purple-700",
  comparison: "bg-orange-100 text-orange-700",
  scenario: "bg-green-100 text-green-700",
  general: "bg-gray-100 text-gray-600",
};

export function QueryAnalysisPanel({
  queries,
  analyses,
}: QueryAnalysisPanelProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Query Analysis
      </h3>
      <div className="space-y-2">
        {queries.map((q, i) => {
          const isOpen = openIndex === i;
          const queryAnalyses = analyses.filter((a) => a.query === q.query);
          const mentionCount = queryAnalyses.filter(
            (a) => a.mentionDetected
          ).length;
          const avgAccuracy = queryAnalyses.length
            ? Math.round(
                queryAnalyses.reduce((s, a) => s + a.accuracyScore, 0) /
                  queryAnalyses.length
              )
            : 0;

          return (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${CATEGORY_COLORS[q.category]}`}
                  >
                    {q.category}
                  </span>
                  <span className="text-sm text-gray-800 truncate">
                    {q.query}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-3">
                  <span className="text-xs text-gray-500">
                    {mentionCount}/4 engines
                  </span>
                  <span className="text-xs text-gray-500">
                    Acc: {avgAccuracy}%
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {queryAnalyses.map((a, j) => {
                    const Icon = ENGINE_ICON[a.engine] || Bot;
                    return (
                      <div key={j} className="p-4 bg-gray-50/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={16} className="text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {ENGINE_LABEL[a.engine] || a.engine}
                          </span>
                          {a.mentionDetected ? (
                            <CheckCircle2 size={14} className="text-green-500" />
                          ) : (
                            <XCircle size={14} className="text-red-400" />
                          )}
                          <span className="text-xs text-gray-400 ml-auto">
                            Accuracy: {a.accuracyScore}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed bg-white rounded-lg p-3 border border-gray-100">
                          {a.rawResponse}
                        </p>
                        {a.accuracyIssues.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {a.accuracyIssues.map((issue, k) => (
                              <span
                                key={k}
                                className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded"
                              >
                                {issue}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
