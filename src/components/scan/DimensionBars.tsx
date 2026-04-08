"use client";

import { useEffect, useState } from "react";

interface DimensionBarsProps {
  mention: number;
  accuracy: number;
  ranking: number;
  sentiment: number;
  sources: number;
}

const DIMENSION_META: { key: keyof DimensionBarsProps; label: string; icon: string }[] = [
  { key: "mention", label: "Mention Rate", icon: "M" },
  { key: "accuracy", label: "Accuracy", icon: "A" },
  { key: "ranking", label: "Ranking", icon: "R" },
  { key: "sentiment", label: "Sentiment", icon: "S" },
  { key: "sources", label: "Grok / X", icon: "G" },
];

function barColor(val: number): string {
  if (val >= 80) return "bg-green-500";
  if (val >= 60) return "bg-yellow-500";
  if (val >= 40) return "bg-orange-500";
  return "bg-red-500";
}

export function DimensionBars(props: DimensionBarsProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Score Dimensions
      </h3>
      <div className="space-y-4">
        {DIMENSION_META.map(({ key, label }) => {
          const val = props[key];
          return (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold text-gray-800">{val}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor(val)} transition-all duration-1000 ease-out`}
                  style={{ width: animated ? `${val}%` : "0%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
