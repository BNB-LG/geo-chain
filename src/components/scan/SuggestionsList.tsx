"use client";

import type { Suggestion } from "@/types/geo";
import { Lightbulb } from "lucide-react";

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const PRIORITY_STYLES: Record<string, { bar: string; bg: string }> = {
  high: { bar: "bg-red-500", bg: "bg-red-50" },
  medium: { bar: "bg-yellow-500", bg: "bg-yellow-50" },
  low: { bar: "bg-blue-400", bg: "bg-blue-50" },
};

const CATEGORY_LABELS: Record<string, string> = {
  content: "Content",
  technical: "Technical",
  authority: "Authority",
  social: "Social",
};

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={18} className="text-yellow-500" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Optimization Suggestions
        </h3>
      </div>
      <div className="space-y-3">
        {suggestions.map((s, i) => {
          const style = PRIORITY_STYLES[s.priority] || PRIORITY_STYLES.low;
          return (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className={`w-1 rounded-full shrink-0 ${style.bar}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800">
                    {s.title}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium ${style.bg} ${style.bar.replace("bg-", "text-")}`}
                  >
                    {s.priority}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    {CATEGORY_LABELS[s.category] || s.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
