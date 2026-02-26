export interface TaskBreakdown {
  task: string;
  score: number;
  explanation: string;
}

export interface CookedResult {
  score: number;
  verdict: string;
  breakdown: TaskBreakdown[];
  lastStand: string;
  survivalTips: string[];
}

export interface AnalyzeRequest {
  jobDescription: string;
}

export interface AnalyzeResponse {
  success: true;
  data: CookedResult;
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
}

export type ScoreRange = "safe" | "warning" | "danger" | "cooked";
