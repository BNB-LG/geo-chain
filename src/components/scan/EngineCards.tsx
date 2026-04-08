"use client";

import type { EngineScore } from "@/types/geo";
import { Bot, Sparkles, Globe, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EngineCardsProps {
  engines: EngineScore[];
}

const ENGINE_ICONS: Record<string, LucideIcon> = {
  ChatGPT: Bot,
  Perplexity: Globe,
  Gemini: Sparkles,
  Grok: Zap,
};

const ENGINE_COLORS: Record<string, string> = {
  ChatGPT: "#10a37f",
  Perplexity: "#1a73e8",
  Gemini: "#8e44ad",
  Grok: "#f59e0b",
};

function sentimentBadge(s: string) {
  const map: Record<string, string> = {
    positive: "bg-green-100 text-green-700",
    neutral: "bg-gray-100 text-gray-600",
    negative: "bg-red-100 text-red-700",
  };
  return map[s] || map.neutral;
}

export function EngineCards({ engines }: EngineCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {engines.map((eng) => {
        const Icon = ENGINE_ICONS[eng.engine] || Bot;
        const color = ENGINE_COLORS[eng.engine] || "#6b7280";
        return (
          <div
            key={eng.engine}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {eng.engine}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${sentimentBadge(eng.sentiment)}`}
                >
                  {eng.sentiment}
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color }}>
              {eng.score}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {eng.mentioned ? "Mentioned" : "Not mentioned"} &middot;{" "}
              {eng.keyIssue}
            </p>
          </div>
        );
      })}
    </div>
  );
}
