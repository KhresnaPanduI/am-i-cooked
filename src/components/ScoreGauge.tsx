"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { getScoreRange, SCORE_CONFIG } from "@/lib/constants";

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const range = getScoreRange(score);
  const config = SCORE_CONFIG[range];

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (value) => setDisplayScore(Math.round(value)),
    });
    return () => controls.stop();
  }, [score]);

  return (
    <motion.div
      className="flex flex-col items-center gap-3 rounded-3xl px-8 py-10"
      style={{ backgroundColor: config.bg }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        Your Replaceability Score
      </p>

      <div className="relative">
        <span
          className="text-8xl font-bold tabular-nums sm:text-9xl"
          style={{ color: config.text }}
        >
          {displayScore}
        </span>
        <span
          className="text-4xl font-bold sm:text-5xl"
          style={{ color: config.text }}
        >
          %
        </span>
      </div>

      <p className="text-lg font-semibold" style={{ color: config.text }}>
        {config.label}
      </p>
    </motion.div>
  );
}
