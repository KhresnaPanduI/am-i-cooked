"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface LastStandProps {
  text: string;
  delay?: number;
}

export default function LastStand({ text, delay = 4.5 }: LastStandProps) {
  return (
    <motion.div
      className="w-full rounded-2xl border border-safe/20 bg-[#ECFDF5] p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Shield className="h-5 w-5 text-safe" />
        <h2 className="text-lg font-bold text-safe">Your Last Stand</h2>
      </div>
      <p className="leading-relaxed text-foreground/80">{text}</p>
    </motion.div>
  );
}
