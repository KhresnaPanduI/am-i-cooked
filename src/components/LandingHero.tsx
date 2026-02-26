"use client";

import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <div className="text-center">
      <motion.h1
        className="text-5xl font-bold tracking-tight sm:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Am I Cooked?
        <span className="ml-2 inline-block animate-bounce">🍳</span>
      </motion.h1>

      <motion.p
        className="mx-auto mt-4 max-w-md text-lg text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Describe your job title and what you do.
        <br />
        We&apos;ll tell you how cooked you are.
      </motion.p>
    </div>
  );
}
