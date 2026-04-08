// DGrid AI Gateway Client
// OpenAI-compatible API format

const DGRID_BASE_URL = process.env.DGRID_API_URL || "https://api.dgrid.ai/v1";
const DGRID_API_KEY = process.env.DGRID_API_KEY || "";

// Model mapping for different engines
const ENGINE_MODELS: Record<string, string> = {
  chatgpt: "gpt-4o",
  perplexity: "gpt-4o", // Route through DGrid; swap when Perplexity endpoint available
  gemini: "gemini-1.5-pro",
  grok: "grok-2",
  analysis: "claude-sonnet-4-20250514", // Best for structured analysis
};

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  timeoutMs?: number;
}

interface ChatCompletionResult {
  content: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number };
}

export class DGridClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey || DGRID_API_KEY;
    this.baseUrl = baseUrl || DGRID_BASE_URL;
  }

  async chatCompletion(opts: ChatCompletionOptions): Promise<ChatCompletionResult> {
    const model = opts.model || ENGINE_MODELS.analysis;
    const timeoutMs = opts.timeoutMs || 30000;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: opts.messages,
          temperature: opts.temperature ?? 0.3,
          max_tokens: opts.maxTokens ?? 2048,
          ...(opts.jsonMode ? { response_format: { type: "json_object" } } : {}),
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Unknown error");
        throw new Error(`DGrid API error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || "",
        model: data.model || model,
        usage: data.usage
          ? { promptTokens: data.usage.prompt_tokens, completionTokens: data.usage.completion_tokens }
          : undefined,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  // Retry wrapper: 1 retry with 1s backoff
  async chatCompletionWithRetry(opts: ChatCompletionOptions): Promise<ChatCompletionResult> {
    try {
      return await this.chatCompletion(opts);
    } catch (err) {
      console.warn(`DGrid call failed, retrying in 1s...`, (err as Error).message);
      await new Promise((r) => setTimeout(r, 1000));
      return await this.chatCompletion(opts);
    }
  }

  // Convenience: ask a specific engine model
  async askEngine(engine: string, prompt: string, timeoutMs = 25000): Promise<string> {
    const model = ENGINE_MODELS[engine] || ENGINE_MODELS.chatgpt;
    const result = await this.chatCompletionWithRetry({
      model,
      messages: [{ role: "user", content: prompt }],
      timeoutMs,
    });
    return result.content;
  }

  // Convenience: structured analysis with JSON output
  async analyze(systemPrompt: string, userPrompt: string): Promise<string> {
    const result = await this.chatCompletionWithRetry({
      model: ENGINE_MODELS.analysis,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      jsonMode: true,
      temperature: 0.1,
    });
    return result.content;
  }
}

// Singleton instance
export const dgrid = new DGridClient();
