export interface SentimentResponse {
  data: SentimentResult[];
}

export interface SentimentResult {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
  monthName?: string;
}
