"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingHero from "@/components/LandingHero";
import JobInput from "@/components/JobInput";
import FateCounter from "@/components/FateCounter";
import LoadingScreen from "@/components/LoadingScreen";
import ScoreGauge from "@/components/ScoreGauge";
import VerdictBanner from "@/components/VerdictBanner";
import BreakdownSection from "@/components/BreakdownSection";
import LastStand from "@/components/LastStand";
import SurvivalTips from "@/components/SurvivalTips";
import ShareButtons from "@/components/ShareButtons";
import { CookedResult, AnalyzeResponse, AnalyzeErrorResponse } from "@/lib/types";
import { RotateCcw } from "lucide-react";

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CookedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (description: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: description }),
      });

      const data: AnalyzeResponse | AnalyzeErrorResponse = await res.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setResult(data.data);

      // Update URL for shareability
      const url = new URL(window.location.href);
      url.searchParams.set("s", String(data.data.score));
      window.history.replaceState({}, "", url.toString());
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    // Clean up URL
    const url = new URL(window.location.href);
    url.searchParams.delete("s");
    window.history.replaceState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full max-w-[680px]">
        {/* Landing section */}
        <div className="flex flex-col items-center gap-8">
          <LandingHero />
          <JobInput onSubmit={handleSubmit} isLoading={isLoading} />
          <FateCounter />
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-6 rounded-xl bg-cooked/10 px-5 py-3 text-center text-sm text-cooked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              className="mt-12 flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScoreGauge score={result.score} />
              <VerdictBanner verdict={result.verdict} />
              <BreakdownSection breakdown={result.breakdown} />
              <LastStand text={result.lastStand} />
              <SurvivalTips tips={result.survivalTips} />
              <ShareButtons result={result} />

              {/* Try again */}
              <motion.button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-full border border-card-border px-6 py-2.5 text-sm font-medium text-muted transition-all hover:bg-foreground/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6 }}
              >
                <RotateCcw className="h-4 w-4" />
                Try Another Job
              </motion.button>

              {/* Footer */}
              <motion.p
                className="pb-8 text-xs text-muted/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.2 }}
              >
                For entertainment purposes only. Your job is probably fine. Probably.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
