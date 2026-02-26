"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Linkedin, Twitter, Share2 } from "lucide-react";
import { CookedResult } from "@/lib/types";
import {
  getShareUrl,
  shareToLinkedIn,
  shareToTwitter,
  shareNative,
  downloadShareCard,
} from "@/lib/share";
import ShareCard from "./ShareCard";

interface ShareButtonsProps {
  result: CookedResult;
  delay?: number;
}

export default function ShareButtons({ result, delay = 5.5 }: ShareButtonsProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const shareUrl = getShareUrl(result.score);

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      await downloadShareCard(cardRef.current, result.score);
    } catch (err) {
      console.error("Failed to generate share card:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleLinkedIn = () => shareToLinkedIn(shareUrl);

  const handleTwitter = () => {
    const text = `I'm ${result.score}% replaceable by AI 🤖\n\n"${result.verdict}"\n\nCheck if you're cooked too:`;
    shareToTwitter(text, shareUrl);
  };

  const handleNativeShare = async () => {
    await shareNative(result.score, result.verdict, shareUrl);
  };

  const supportsNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const buttons = [
    {
      label: downloading ? "Generating..." : "Download Card",
      icon: Download,
      onClick: handleDownload,
      className: "bg-accent text-white hover:brightness-110",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      onClick: handleLinkedIn,
      className: "bg-[#0A66C2] text-white hover:brightness-110",
    },
    {
      label: "Twitter/X",
      icon: Twitter,
      onClick: handleTwitter,
      className: "bg-foreground text-background hover:opacity-90",
    },
  ];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="mb-3 text-center text-lg font-bold text-foreground">
        Share Your Results
      </h2>

      {/* Visible share card preview — scaled down for display */}
      <div className="mb-6 flex justify-center overflow-hidden">
        <div
          className="origin-top"
          style={{
            transform: "scale(0.55)",
            marginBottom: "-360px",
          }}
        >
          <ShareCard result={result} />
        </div>
      </div>

      {/* Hidden full-size card for html-to-image capture (no CSS transform) */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: "0px",
        }}
      >
        <ShareCard ref={cardRef} result={result} />
      </div>

      <div className="flex flex-wrap justify-center gap-2.5">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${btn.className}`}
          >
            <btn.icon className="h-4 w-4" />
            {btn.label}
          </button>
        ))}

        {supportsNativeShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        )}
      </div>
    </motion.div>
  );
}
