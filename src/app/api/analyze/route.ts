import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { CookedResult, AnalyzeResponse, AnalyzeErrorResponse } from "@/lib/types";

function validateResult(data: unknown): data is CookedResult {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (typeof d.score !== "number" || d.score < 0 || d.score > 100) return false;
  if (typeof d.verdict !== "string") return false;
  if (!Array.isArray(d.breakdown) || d.breakdown.length < 4 || d.breakdown.length > 6)
    return false;
  for (const item of d.breakdown) {
    if (typeof item.task !== "string") return false;
    if (typeof item.score !== "number") return false;
    if (typeof item.explanation !== "string") return false;
  }
  if (typeof d.lastStand !== "string") return false;
  if (!Array.isArray(d.survivalTips) || d.survivalTips.length !== 3) return false;
  return true;
}

async function callOpenRouter(
  jobDescription: string
): Promise<CookedResult> {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "Am I Cooked?",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-v3.2",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(jobDescription) },
        ],
        response_format: { type: "json_object" },
        temperature: 0.9,
        max_tokens: 1500,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} — ${text}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content in OpenRouter response");

  const parsed = JSON.parse(content);
  if (!validateResult(parsed)) {
    throw new Error("Invalid response structure from LLM");
  }

  return parsed as CookedResult;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<AnalyzeResponse | AnalyzeErrorResponse>> {
  try {
    const body = await request.json();
    const { jobDescription } = body;

    if (
      !jobDescription ||
      typeof jobDescription !== "string" ||
      jobDescription.trim().length < 10
    ) {
      return NextResponse.json(
        { success: false, error: "Please describe your job in at least 10 characters." },
        { status: 400 }
      );
    }

    if (jobDescription.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Please keep your description under 1000 characters." },
        { status: 400 }
      );
    }

    // Try once, retry on parse failure
    let result: CookedResult;
    try {
      result = await callOpenRouter(jobDescription.trim());
    } catch (firstError) {
      console.error("First attempt failed, retrying:", firstError);
      result = await callOpenRouter(jobDescription.trim());
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong analyzing your job. Please try again.",
      },
      { status: 500 }
    );
  }
}
