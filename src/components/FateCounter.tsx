"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFateCount } from "@/lib/constants";

export default function FateCounter() {
  const [count, setCount] = useState(getFateCount());

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 26000); // ~1 increment every 26 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      className="text-sm text-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <span className="font-semibold text-foreground">
        {count.toLocaleString()}
      </span>{" "}
      people have checked their fate
    </motion.p>
  );
}
