"use client";

import { motion } from "framer-motion";
import { getScoreColor, getScoreBg } from "@/lib/constants";
import { TaskBreakdown } from "@/lib/types";

interface BreakdownCardProps {
  item: TaskBreakdown;
  index: number;
}

export default function BreakdownCard({ item, index }: BreakdownCardProps) {
  const color = getScoreColor(item.score);
  const bg = getScoreBg(item.score);

  return (
    <motion.div
      className="rounded-2xl border border-card-border bg-card-bg p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 3 + index * 0.15 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{item.task}</h3>
        <span className="text-sm font-bold" style={{ color }}>
          {item.score}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="mb-3 h-2.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: bg }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${item.score}%` }}
          transition={{ duration: 0.8, delay: 3.2 + index * 0.15, ease: "easeOut" }}
        />
      </div>

      <p className="text-sm leading-relaxed text-muted">{item.explanation}</p>
    </motion.div>
  );
}
