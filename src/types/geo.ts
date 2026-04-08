// GEO-Chain Type Definitions

export interface GEOScanRequest {
  projectName?: string;
  contractAddress?: string;
  category?: string;
  network?: "bsc" | "bsc-testnet";
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  contractAddress: string;
  website?: string;
}

export interface EngineQuery {
  query: string;
  category: "brand" | "category" | "comparison" | "scenario" | "general";
}

export interface EngineResponse {
  engine: "chatgpt" | "perplexity" | "gemini" | "grok";
  query: string;
  response: string;
  error?: string;
  responseTime: number;
}

export interface QueryAnalysis {
  engine: string;
  query: string;
  mentionDetected: boolean;
  mentionPosition: number; // -1 if not mentioned, 0-based paragraph index
  accuracyScore: number; // 0-100
  accuracyIssues: string[];
  sentiment: "positive" | "neutral" | "negative";
  competitorRanking: string[];
  sourceUrls: string[];
  rawResponse: string;
}

export interface EngineScore {
  engine: string;
  score: number;
  mentioned: boolean;
  sentiment: string;
  keyIssue: string;
}

export interface GEOScore {
  total: number;
  mention: number;
  accuracy: number;
  ranking: number;
  sentiment: number;
  sources: number;
  engines: EngineScore[];
}

export interface Suggestion {
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  category: "content" | "technical" | "authority" | "social";
}

export interface GEOScanResult {
  id: string;
  projectName: string;
  contractAddress?: string;
  tokenInfo?: TokenInfo;
  category?: string;
  geoScore: GEOScore;
  queries: EngineQuery[];
  analyses: QueryAnalysis[];
  suggestions: Suggestion[];
  reportHash: string;
  createdAt: string;
}
