import type { QueryAnalysis, GEOScore, EngineScore, Suggestion } from "@/types/geo";

// Weights for GEO Score dimensions
const WEIGHTS = {
  mention: 0.3,
  accuracy: 0.25,
  ranking: 0.2,
  sentiment: 0.15,
  sources: 0.1,
};

const ENGINES = ["chatgpt", "perplexity", "gemini", "grok"];

export function calculateScore(analyses: QueryAnalysis[]): GEOScore {
  // Group by engine
  const byEngine = new Map<string, QueryAnalysis[]>();
  for (const a of analyses) {
    const list = byEngine.get(a.engine) || [];
    list.push(a);
    byEngine.set(a.engine, list);
  }

  // Calculate per-engine scores
  const engineScores: EngineScore[] = ENGINES.map((engine) => {
    const engineAnalyses = byEngine.get(engine) || [];
    if (engineAnalyses.length === 0) {
      return { engine, score: 0, mentioned: false, sentiment: "N/A", keyIssue: "No data" };
    }

    const mentionRate = engineAnalyses.filter((a) => a.mentionDetected).length / engineAnalyses.length;
    const avgAccuracy = avg(engineAnalyses.map((a) => a.accuracyScore));
    const avgSentiment = sentimentToScore(majorSentiment(engineAnalyses));
    const mentioned = mentionRate > 0;

    // Per-engine score: simplified formula (40% mention, 40% accuracy, 20% sentiment).
    // This intentionally differs from the 5-dimension WEIGHTS used for the overall score,
    // because per-engine ranking and sources dimensions are not meaningful in isolation.
    const score = Math.round(
      mentionRate * 40 + avgAccuracy * 0.4 + avgSentiment * 0.2
    );

    const issues = engineAnalyses.flatMap((a) => a.accuracyIssues);
    const keyIssue = issues[0] || (mentioned ? "No major issues" : "Not mentioned");

    return {
      engine,
      score: Math.min(100, score),
      mentioned,
      sentiment: majorSentiment(engineAnalyses),
      keyIssue,
    };
  });

  // Calculate dimension scores
  const allMentioned = analyses.filter((a) => a.mentionDetected);
  const mentionScore = analyses.length > 0
    ? Math.round((allMentioned.length / analyses.length) * 100)
    : 0;

  const accuracyScore = Math.round(avg(analyses.map((a) => a.accuracyScore)));

  // Ranking: based on mention position (lower = better)
  const positions = allMentioned
    .filter((a) => a.mentionPosition >= 0)
    .map((a) => a.mentionPosition);
  const rankingScore = positions.length > 0
    ? Math.round(Math.max(0, 100 - avg(positions) * 20))
    : 0;

  const sentimentScore = Math.round(
    avg(analyses.map((a) => sentimentToScore(a.sentiment)))
  );

  const sourcesWithUrls = analyses.filter((a) => a.sourceUrls.length > 0);
  const sourcesScore = analyses.length > 0
    ? Math.round((sourcesWithUrls.length / analyses.length) * 100)
    : 0;

  // Weighted total
  const total = Math.round(
    mentionScore * WEIGHTS.mention +
    accuracyScore * WEIGHTS.accuracy +
    rankingScore * WEIGHTS.ranking +
    sentimentScore * WEIGHTS.sentiment +
    sourcesScore * WEIGHTS.sources
  );

  return {
    total: Math.min(100, Math.max(0, total)),
    mention: mentionScore,
    accuracy: accuracyScore,
    ranking: rankingScore,
    sentiment: sentimentScore,
    sources: sourcesScore,
    engines: engineScores,
  };
}

export function generateSuggestions(score: GEOScore, projectName: string): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (score.mention < 50) {
    suggestions.push({
      priority: "high",
      title: "Increase online presence for AI indexing",
      description: `${projectName} is mentioned in less than 50% of AI queries. Create comprehensive documentation, Wikipedia entry, and ensure listing on major aggregators (CoinGecko, DeFiLlama, DappRadar).`,
      category: "content",
    });
  }

  if (score.accuracy < 60) {
    suggestions.push({
      priority: "high",
      title: "Fix outdated information across sources",
      description: "AI engines are citing inaccurate data. Update official docs, ensure data feeds reflect current metrics, and publish correction articles.",
      category: "content",
    });
  }

  if (score.ranking < 50) {
    suggestions.push({
      priority: "medium",
      title: "Publish comparison and category content",
      description: "Create detailed comparison articles (vs competitors) to improve category ranking in AI responses.",
      category: "content",
    });
  }

  // Check Grok specifically
  const grokEngine = score.engines.find((e) => e.engine === "grok");
  if (grokEngine && grokEngine.score < 60) {
    suggestions.push({
      priority: "medium",
      title: "Boost X/Twitter presence for Grok visibility",
      description: "Grok heavily indexes X content. Post regular technical threads, engage in discussions, and build community presence on X.",
      category: "social",
    });
  }

  suggestions.push({
    priority: "medium",
    title: "Add structured data (JSON-LD) to website",
    description: "Implement Organization, Product, and FAQ schema markup to help AI engines better understand your project.",
    category: "technical",
  });

  if (score.sources < 40) {
    suggestions.push({
      priority: "low",
      title: "Build authoritative backlink profile",
      description: "Get mentioned in reputable crypto media, research reports, and technical publications to improve source coverage.",
      category: "authority",
    });
  }

  return suggestions;
}

// Helpers
function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function sentimentToScore(s: string): number {
  if (s === "positive") return 100;
  if (s === "neutral") return 60;
  if (s === "negative") return 20;
  return 0;
}

function majorSentiment(analyses: QueryAnalysis[]): string {
  const counts = { positive: 0, neutral: 0, negative: 0 };
  for (const a of analyses) {
    if (a.sentiment in counts) counts[a.sentiment as keyof typeof counts]++;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
