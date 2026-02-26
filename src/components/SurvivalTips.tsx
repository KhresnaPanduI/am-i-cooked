"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface SurvivalTipsProps {
  tips: string[];
  delay?: number;
}

export default function SurvivalTips({ tips, delay = 5 }: SurvivalTipsProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-warning" />
        <h2 className="text-lg font-bold text-foreground">Survival Guide</h2>
      </div>

      <div className="space-y-2.5">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="flex gap-3 rounded-xl border border-card-border bg-card-bg p-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.2 + index * 0.15 }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-foreground/80">{tip}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
