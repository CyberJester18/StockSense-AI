export type PredictionTrend = 'BUY' | 'SELL' | 'HOLD';

export interface PredictRequest {
  symbol: string;
}

export interface PredictResponse {
  symbol: string;
  prediction: PredictionTrend;
  confidence: number;
  timestamp?: string;
  error?: string;
}

export interface PredictionHistoryItem {
  id: string;
  symbol: string;
  prediction: PredictionTrend;
  confidence: number;
  timestamp: string;
}

export interface ModelDetails {
  algorithm: string;
  backend: string;
  dataSource: string;
  modelAccuracy: string;
}
