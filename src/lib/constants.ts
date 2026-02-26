import { ScoreRange } from "./types";

export const PLACEHOLDERS = [
  "I'm a marketing manager who writes copy, analyzes campaign data, and manages a team of 5...",
  "I'm a software engineer who builds APIs, reviews code, and debugs production issues...",
  "I'm a financial analyst who builds Excel models, writes reports, and presents to executives...",
  "I'm a graphic designer who creates brand assets, edits photos, and designs social media posts...",
  "I'm a project manager who runs standups, writes requirements, and keeps stakeholders aligned...",
];

export const LOADING_MESSAGES = [
  "Scanning your job description...",
  "Consulting the AI overlords...",
  "Calculating your replaceability...",
  "Cross-referencing with 10,000 AI papers...",
  "Preparing your diagnosis...",
];

export const SCORE_CONFIG: Record<
  ScoreRange,
  { bg: string; text: string; label: string; min: number; max: number }
> = {
  safe: {
    bg: "#ECFDF5",
    text: "#059669",
    label: "You're Safe... For Now",
    min: 0,
    max: 20,
  },
  warning: {
    bg: "#FFFBEB",
    text: "#D97706",
    label: "Getting Warm",
    min: 21,
    max: 50,
  },
  danger: {
    bg: "#FFF7ED",
    text: "#EA580C",
    label: "Feeling the Heat",
    min: 51,
    max: 80,
  },
  cooked: {
    bg: "#FEF2F2",
    text: "#DC2626",
    label: "Absolutely Cooked",
    min: 81,
    max: 100,
  },
};

export function getScoreRange(score: number): ScoreRange {
  if (score <= 20) return "safe";
  if (score <= 50) return "warning";
  if (score <= 80) return "danger";
  return "cooked";
}

export function getScoreColor(score: number): string {
  const range = getScoreRange(score);
  return SCORE_CONFIG[range].text;
}

export function getScoreBg(score: number): string {
  const range = getScoreRange(score);
  return SCORE_CONFIG[range].bg;
}

// Fate counter: fake seed that slowly grows
const BASE_COUNT = 12847;
const START_DATE = new Date("2025-06-01").getTime();

export function getFateCount(): number {
  const now = Date.now();
  const hoursSinceStart = (now - START_DATE) / (1000 * 60 * 60);
  return BASE_COUNT + Math.floor(hoursSinceStart * 2.3);
}
