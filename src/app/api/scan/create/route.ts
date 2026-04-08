import { NextRequest, NextResponse } from "next/server";
import { generateQueries } from "@/lib/pipeline/query-generator";
import { queryAllEngines } from "@/lib/pipeline/engine-querier";
import { analyzeAllResponses } from "@/lib/pipeline/response-analyzer";
import { calculateScore, generateSuggestions } from "@/lib/pipeline/score-calculator";
import { getTokenInfo } from "@/lib/bscscan";
import type { GEOScanRequest, GEOScanResult } from "@/types/geo";
import { createHash, randomUUID } from "crypto";

export const maxDuration = 120; // Vercel Pro: 120s timeout

export async function POST(req: NextRequest) {
  try {
    const body: GEOScanRequest = await req.json();

    if (!body.projectName && !body.contractAddress) {
      return NextResponse.json(
        { error: "Either projectName or contractAddress is required" },
        { status: 400 }
      );
    }

    let projectName = body.projectName || "";
    let tokenInfo: import("@/types/geo").TokenInfo | undefined = undefined;

    // Step 1: Resolve contract address if provided
    if (body.contractAddress) {
      // Validate address format before passing to external API
      if (!/^0x[a-fA-F0-9]{40}$/.test(body.contractAddress)) {
        return NextResponse.json(
          { error: "Invalid contract address format" },
          { status: 400 }
        );
      }
      const info = await getTokenInfo(body.contractAddress);
      if (info) {
        tokenInfo = info;
        projectName = tokenInfo.name || projectName;
      }
    }

    if (!projectName) {
      return NextResponse.json(
        { error: "Could not resolve project name from contract address" },
        { status: 400 }
      );
    }

    // Sanitize projectName: limit length and strip control characters
    projectName = projectName.replace(/[\x00-\x1f]/g, "").trim().slice(0, 200);
    if (!projectName) {
      return NextResponse.json(
        { error: "Project name is empty after sanitization" },
        { status: 400 }
      );
    }

    // Step 2: Generate queries
    const queries = await generateQueries(projectName, body.category, body.contractAddress);

    // Step 3: Query all 4 engines
    const engineResponses = await queryAllEngines(queries);

    // Step 4: Analyze responses
    const analyses = await analyzeAllResponses(engineResponses, projectName);

    // Step 5: Calculate GEO Score
    const geoScore = calculateScore(analyses);

    // Step 6: Generate suggestions
    const suggestions = generateSuggestions(geoScore, projectName);

    // Step 7: Create report hash
    const reportData = JSON.stringify({ projectName, geoScore, analyses, createdAt: new Date().toISOString() });
    const reportHash = "0x" + createHash("sha256").update(reportData).digest("hex");

    const result: GEOScanResult = {
      id: randomUUID(),
      projectName,
      contractAddress: body.contractAddress,
      tokenInfo,
      category: body.category,
      geoScore,
      queries,
      analyses,
      suggestions,
      reportHash,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "Scan failed. Please try again later." },
      { status: 500 }
    );
  }
}
