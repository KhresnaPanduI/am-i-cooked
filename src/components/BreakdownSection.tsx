"use client";

import { motion } from "framer-motion";
import { TaskBreakdown } from "@/lib/types";
import BreakdownCard from "./BreakdownCard";

interface BreakdownSectionProps {
  breakdown: TaskBreakdown[];
}

export default function BreakdownSection({ breakdown }: BreakdownSectionProps) {
  return (
    <motion.div
      className="w-full space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 2.8 }}
    >
      <h2 className="text-lg font-bold text-foreground">The Breakdown</h2>
      <div className="space-y-3">
        {breakdown.map((item, index) => (
          <BreakdownCard key={item.task} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
