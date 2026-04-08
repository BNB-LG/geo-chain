import { dgrid } from "@/lib/dgrid";
import type { EngineQuery, EngineResponse } from "@/types/geo";

const ENGINES = ["chatgpt", "perplexity", "gemini", "grok"] as const;
const ENGINE_TIMEOUT = 25000;
const BATCH_SIZE = 2; // concurrent queries per batch to avoid rate limits

export async function queryAllEngines(queries: EngineQuery[]): Promise<EngineResponse[]> {
  const results: EngineResponse[] = [];

  // Process queries in batches
  for (let i = 0; i < queries.length; i += BATCH_SIZE) {
    const batch = queries.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map((q) => queryAllEnginesForQuery(q.query))
    );
    results.push(...batchResults.flat());
  }

  return results;
}

async function queryAllEnginesForQuery(query: string): Promise<EngineResponse[]> {
  const results = await Promise.allSettled(
    ENGINES.map((engine) => querySingleEngine(engine, query))
  );

  return results.map((result, idx) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    return {
      engine: ENGINES[idx],
      query,
      response: "",
      error: (result.reason as Error)?.message || "Query failed",
      responseTime: 0,
    };
  });
}

async function querySingleEngine(engine: string, query: string): Promise<EngineResponse> {
  const start = Date.now();

  const prompt = buildEnginePrompt(engine, query);

  try {
    const response = await dgrid.askEngine(engine, prompt, ENGINE_TIMEOUT);
    return {
      engine: engine as EngineResponse["engine"],
      query,
      response,
      responseTime: Date.now() - start,
    };
  } catch (error) {
    return {
      engine: engine as EngineResponse["engine"],
      query,
      response: "",
      error: (error as Error).message,
      responseTime: Date.now() - start,
    };
  }
}

function buildEnginePrompt(engine: string, query: string): string {
  // Simulate how a user would ask each AI engine
  const prefix =
    engine === "grok"
      ? "Based on recent X/Twitter discussions and web data: "
      : engine === "perplexity"
        ? "Search the web and provide an answer with sources: "
        : "";

  return `${prefix}${query}`;
}
