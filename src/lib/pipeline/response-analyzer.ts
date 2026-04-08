import { dgrid } from "@/lib/dgrid";
import type { QueryAnalysis, EngineResponse } from "@/types/geo";

const ANALYSIS_SYSTEM_PROMPT = `You are a Web3 project AI search visibility analyst. Analyze an AI engine's response to determine how well it covers a specific project.

Output strict JSON:
{
  "mentionDetected": boolean,
  "mentionPosition": number,  // -1 if not mentioned, 0-based paragraph index
  "accuracyScore": number,    // 0-100, how accurate the information is
  "accuracyIssues": string[], // list of inaccurate or outdated claims
  "sentiment": "positive" | "neutral" | "negative",
  "competitorRanking": string[], // other projects mentioned, in order
  "sourceUrls": string[]     // any URLs cited in the response
}

Be strict about accuracy. Common issues in Web3:
- Outdated TVL or price data
- Wrong chain attribution
- Confusing project versions (v1 vs v3)
- Missing recent features or updates
- Vague descriptions without specifics`;

export async function analyzeResponse(
  engineResponse: EngineResponse,
  projectName: string
): Promise<QueryAnalysis> {
  // Skip analysis for failed queries
  if (engineResponse.error || !engineResponse.response) {
    return createEmptyAnalysis(engineResponse, projectName);
  }

  try {
    const userPrompt = `Target Project: ${projectName}
Query: "${engineResponse.query}"
Engine: ${engineResponse.engine}

AI Response:
"""
${engineResponse.response.slice(0, 3000)}
"""

Analyze this response for the target project.`;

    const result = await dgrid.analyze(ANALYSIS_SYSTEM_PROMPT, userPrompt);
    const parsed = JSON.parse(result);

    return {
      engine: engineResponse.engine,
      query: engineResponse.query,
      mentionDetected: parsed.mentionDetected ?? false,
      mentionPosition: parsed.mentionPosition ?? -1,
      accuracyScore: Math.min(100, Math.max(0, parsed.accuracyScore ?? 0)),
      accuracyIssues: parsed.accuracyIssues ?? [],
      sentiment: parsed.sentiment ?? "neutral",
      competitorRanking: parsed.competitorRanking ?? [],
      sourceUrls: parsed.sourceUrls ?? [],
      rawResponse: engineResponse.response,
    };
  } catch (error) {
    console.warn(`Analysis failed for ${engineResponse.engine}/${engineResponse.query}:`, error);
    return simpleAnalysis(engineResponse, projectName);
  }
}

export async function analyzeAllResponses(
  responses: EngineResponse[],
  projectName: string
): Promise<QueryAnalysis[]> {
  const BATCH = 4;
  const results: QueryAnalysis[] = [];

  for (let i = 0; i < responses.length; i += BATCH) {
    const batch = responses.slice(i, i + BATCH);
    const batchResults = await Promise.all(
      batch.map((r) => analyzeResponse(r, projectName))
    );
    results.push(...batchResults);
  }

  return results;
}

// Fallback: simple keyword-based analysis
function simpleAnalysis(response: EngineResponse, projectName: string): QueryAnalysis {
  const text = response.response.toLowerCase();
  const name = projectName.toLowerCase();
  const mentioned = text.includes(name);
  const paragraphs = response.response.split("\n\n");
  const position = paragraphs.findIndex((p) => p.toLowerCase().includes(name));

  return {
    engine: response.engine,
    query: response.query,
    mentionDetected: mentioned,
    mentionPosition: position,
    accuracyScore: mentioned ? 50 : 0, // can't assess accuracy without AI
    accuracyIssues: [],
    sentiment: "neutral",
    competitorRanking: [],
    sourceUrls: [],
    rawResponse: response.response,
  };
}

function createEmptyAnalysis(response: EngineResponse, _projectName: string): QueryAnalysis {
  return {
    engine: response.engine,
    query: response.query,
    mentionDetected: false,
    mentionPosition: -1,
    accuracyScore: 0,
    accuracyIssues: [response.error || "Query failed"],
    sentiment: "neutral",
    competitorRanking: [],
    sourceUrls: [],
    rawResponse: "",
  };
}
