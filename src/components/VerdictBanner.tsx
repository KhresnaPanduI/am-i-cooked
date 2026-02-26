"use client";

import { motion } from "framer-motion";

interface VerdictBannerProps {
  verdict: string;
}

export default function VerdictBanner({ verdict }: VerdictBannerProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.2 }}
    >
      <p className="text-xl font-semibold italic text-foreground sm:text-2xl">
        &ldquo;{verdict}&rdquo;
      </p>
    </motion.div>
  );
}
