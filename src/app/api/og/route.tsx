import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getScoreColor(score: number): string {
  if (score <= 20) return "#059669";
  if (score <= 50) return "#D97706";
  if (score <= 80) return "#EA580C";
  return "#DC2626";
}

function getScoreLabel(score: number): string {
  if (score <= 20) return "You're Safe... For Now";
  if (score <= 50) return "Getting Warm";
  if (score <= 80) return "Feeling the Heat";
  return "Absolutely Cooked";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scoreParam = searchParams.get("s");
  const score = scoreParam ? Math.min(100, Math.max(0, parseInt(scoreParam, 10))) : null;

  // If no score, return a generic OG image
  if (score === null || isNaN(score)) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFF8F0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 700, color: "#1a1a1a", display: "flex", alignItems: "center" }}>
            Am I Cooked? 🍳
          </div>
          <div style={{ fontSize: 32, color: "#6B7280", marginTop: 16, display: "flex" }}>
            Find out if AI is coming for your job
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#7C3AED",
              marginTop: 40,
              padding: "12px 32px",
              borderRadius: 999,
              backgroundColor: "#7C3AED20",
              display: "flex",
            }}
          >
            Check your score →
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF8F0",
          fontFamily: "system-ui, sans-serif",
          gap: 8,
        }}
      >
        {/* Title */}
        <div style={{ fontSize: 40, fontWeight: 700, color: "#1a1a1a", display: "flex", alignItems: "center" }}>
          Am I Cooked? 🍳
        </div>

        {/* Score */}
        <div
          style={{
            fontSize: 160,
            fontWeight: 800,
            color: color,
            lineHeight: 1,
            marginTop: 8,
            display: "flex",
          }}
        >
          {score}%
        </div>

        {/* Label */}
        <div style={{ fontSize: 32, fontWeight: 600, color: color, display: "flex" }}>
          {label}
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: 22,
            color: "#6B7280",
            marginTop: 32,
            display: "flex",
          }}
        >
          Check if you&apos;re cooked too →
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
