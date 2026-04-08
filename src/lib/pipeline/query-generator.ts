import { dgrid } from "@/lib/dgrid";
import type { EngineQuery } from "@/types/geo";

const SYSTEM_PROMPT = `You are an AI search query strategist. Generate 8 search queries that a user might ask an AI assistant (ChatGPT, Perplexity, Gemini, Grok) about a Web3 project.

Output JSON array with objects: { "query": string, "category": "brand" | "category" | "comparison" | "scenario" | "general" }

Rules:
- 2 brand queries (directly about the project)
- 2 category queries (best in category, without naming the project)
- 2 comparison queries (vs competitors)
- 2 scenario queries (how to do X, where the project might be recommended)
- Queries should be in English
- Queries should be natural, like a real user would ask an AI`;

export async function generateQueries(
  projectName: string,
  category?: string,
  contractAddress?: string
): Promise<EngineQuery[]> {
  try {
    const userPrompt = `Project: ${projectName}${category ? `\nCategory: ${category}` : ""}${contractAddress ? `\nContract: ${contractAddress}` : ""}\n\nGenerate 8 AI search queries.`;

    const response = await dgrid.analyze(SYSTEM_PROMPT, userPrompt);
    const parsed = JSON.parse(response);
    const queries = Array.isArray(parsed) ? parsed : parsed.queries || [];

    if (queries.length >= 4) {
      return queries.map((q: { query: string; category: string }) => ({
        query: q.query,
        category: q.category as EngineQuery["category"],
      }));
    }
    throw new Error("Too few queries generated");
  } catch (error) {
    console.warn("AI query generation failed, using templates:", error);
    return getFallbackQueries(projectName, category);
  }
}

function getFallbackQueries(name: string, category?: string): EngineQuery[] {
  const cat = category || "project";
  return [
    { query: `What is ${name}?`, category: "brand" },
    { query: `${name} review and features`, category: "brand" },
    { query: `Best ${cat} on BNB Chain?`, category: "category" },
    { query: `Top ${cat} platforms in crypto 2026`, category: "category" },
    { query: `${name} vs competitors`, category: "comparison" },
    { query: `Is ${name} safe and legit?`, category: "general" },
    { query: `How to use ${name}?`, category: "scenario" },
    { query: `${name} latest news and updates`, category: "general" },
  ];
}
