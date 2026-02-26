"use client";

import { forwardRef } from "react";
import { CookedResult } from "@/lib/types";
import { getScoreRange, SCORE_CONFIG, getScoreColor } from "@/lib/constants";

interface ShareCardProps {
  result: CookedResult;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  function ShareCard({ result }, ref) {
    const range = getScoreRange(result.score);
    const config = SCORE_CONFIG[range];

    return (
      <div
        ref={ref}
        style={{
          width: "600px",
          height: "800px",
          padding: "48px",
          backgroundColor: "#FFF8F0",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          borderRadius: "24px",
          border: "1px solid #F3E8D9",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#1a1a1a",
            }}
          >
            Am I Cooked? 🍳
          </div>
        </div>

        {/* Score */}
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            borderRadius: "24px",
            backgroundColor: config.bg,
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: config.text,
              lineHeight: 1,
            }}
          >
            {result.score}%
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: config.text,
              marginTop: "8px",
            }}
          >
            {config.label}
          </div>
        </div>

        {/* Verdict */}
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
            fontStyle: "italic",
            color: "#1a1a1a",
            padding: "0 16px",
          }}
        >
          &ldquo;{result.verdict}&rdquo;
        </div>

        {/* Mini breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {result.breakdown.map((item) => (
            <div
              key={item.task}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #F3E8D9",
              }}
            >
              <span style={{ fontSize: "13px", color: "#1a1a1a" }}>
                {item.task}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: getScoreColor(item.score),
                }}
              >
                {item.score}%
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            fontSize: "14px",
            color: "#6B7280",
          }}
        >
          Check if you&apos;re cooked too →
        </div>
      </div>
    );
  }
);

export default ShareCard;
