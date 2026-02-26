"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { PLACEHOLDERS } from "@/lib/constants";

interface JobInputProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

export default function JobInput({ onSubmit, isLoading }: JobInputProps) {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = useCallback(() => {
    if (value.trim().length >= 10 && !isLoading) {
      onSubmit(value.trim());
    }
  }, [value, isLoading, onSubmit]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={PLACEHOLDERS[placeholderIndex]}
        disabled={isLoading}
        maxLength={1000}
        rows={4}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSubmit();
          }
        }}
        className="w-full resize-none rounded-2xl border border-card-border bg-card-bg px-5 py-4 text-base leading-relaxed text-foreground shadow-sm transition-all duration-200 placeholder:text-muted/50 focus:border-accent/40 focus:shadow-md focus:outline-none disabled:opacity-50"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted">
          {value.length}/1000
        </span>
        <span className="text-xs text-muted">
          Ctrl+Enter to submit
        </span>
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={value.trim().length < 10 || isLoading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <Flame className="h-5 w-5" />
        {isLoading ? "Analyzing..." : "Find Out If I'm Cooked"}
      </motion.button>
    </motion.div>
  );
}
