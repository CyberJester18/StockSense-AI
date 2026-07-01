import React, { useState } from 'react';
import { BarChart3, Loader2, Sparkles, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { PredictResponse, PredictionTrend } from '../types';

interface PredictorCardProps {
  onPredict: (symbol: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  lastPrediction: PredictResponse | null;
  isSimulating: boolean;
}

const POPULAR_TICKERS = [
  'RELIANCE.NS',
  'TCS.NS',
  'INFY.NS',
  'HDFCBANK.NS',
  'AAPL',
  'MSFT',
  'TSLA'
];

export function PredictorCard({
  onPredict,
  isLoading,
  error,
  lastPrediction,
  isSimulating,
}: PredictorCardProps) {
  const [symbol, setSymbol] = useState('RELIANCE.NS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim() && !isLoading) {
      onPredict(symbol.trim());
    }
  };

  const handleSelectTicker = (ticker: string) => {
    setSymbol(ticker);
  };

  return (
    <div 
      className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8"
      id="predictor-card"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Input Header & Form */}
        <div className="space-y-2">
          <label 
            htmlFor="ticker-input"
            className="font-mono text-xs font-semibold tracking-wider text-text-secondary uppercase"
          >
            Stock Symbol
          </label>
          <div className="relative">
            <input
              id="ticker-input"
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g. RELIANCE.NS, TSLA"
              className="w-full rounded-md border border-border-input bg-bg-base px-4 py-3.5 font-sans text-base font-medium text-text-primary placeholder-zinc-600 outline-none transition-colors focus:border-precision-blue focus:ring-1 focus:ring-precision-blue/40"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading || !symbol.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-precision-blue py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-precision-blue-hover focus:outline-none focus:ring-2 focus:ring-precision-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
          id="predict-button"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing Market Trends...</span>
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4" />
              <span>Predict</span>
            </>
          )}
        </button>

        {/* Quick Tickers Suggesters */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-text-secondary uppercase block">
            Quick Select Tickers
          </span>
          <div className="flex flex-wrap gap-1.5" id="quick-tickers-list">
            {POPULAR_TICKERS.map((ticker) => (
              <button
                key={ticker}
                type="button"
                onClick={() => handleSelectTicker(ticker)}
                className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-medium transition-all ${
                  symbol.toUpperCase() === ticker.toUpperCase()
                    ? 'bg-precision-blue/15 border border-precision-blue/45 text-precision-blue'
                    : 'bg-zinc-800/30 border border-zinc-800 hover:border-zinc-700 text-text-secondary hover:text-text-primary'
                }`}
              >
                {ticker}
              </button>
            ))}
          </div>
        </div>

        {/* Supported Exchanges metadata */}
        <div className="pt-2 border-t border-border-card/60 space-y-1">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-text-secondary uppercase block">
            Supported Exchanges
          </span>
          <p className="font-sans text-xs text-text-secondary leading-relaxed">
            NSE, BSE, NASDAQ, NYSE via Yahoo Finance API
          </p>
        </div>

      </form>

      {/* API Interaction Feedback Section */}
      <div className="mt-6 space-y-4" id="prediction-feedback-zone">
        
        {/* Error State Banner */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm" id="prediction-error">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-alert-red mt-0.5 shrink-0" />
              <div className="space-y-1">
                <span className="font-semibold text-red-400">Connection Failed</span>
                <p className="text-zinc-400 text-xs leading-relaxed">{error}</p>
                <div className="pt-1.5">
                  <span className="text-[10px] text-text-secondary block font-mono">
                    💡 Tip: Switch to Simulator Mode in the header if the FastAPI server is not hosted yet.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Results Render */}
        {lastPrediction && !isLoading && !error && (
          <div 
            className="rounded-xl border border-precision-blue/20 bg-precision-blue/5 p-5 space-y-4 animate-fade-in"
            id="prediction-result"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-precision-blue font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Prediction Result</span>
              </div>
              <span className="font-mono text-[10px] text-text-secondary">
                {lastPrediction.timestamp || 'Just now'}
              </span>
            </div>

            <div className="flex items-end justify-between border-b border-border-card/40 pb-3">
              <div>
                <span className="text-xs text-text-secondary font-mono block">SYMBOL</span>
                <span className="text-lg font-bold text-text-primary tracking-tight">
                  {lastPrediction.symbol}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-secondary font-mono block">SIGNAL</span>
                <span 
                  className={`text-lg font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${
                    lastPrediction.prediction === 'BUY'
                      ? 'bg-success-green/10 text-success-green border border-success-green/20'
                      : lastPrediction.prediction === 'SELL'
                      ? 'bg-alert-red/10 text-alert-red border border-alert-red/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {lastPrediction.prediction}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-text-secondary">CONFIDENCE SCORE</span>
                <span className="text-text-primary font-bold">{lastPrediction.confidence}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    lastPrediction.prediction === 'BUY'
                      ? 'bg-success-green'
                      : lastPrediction.prediction === 'SELL'
                      ? 'bg-alert-red'
                      : 'bg-zinc-500'
                  }`}
                  style={{ width: `${lastPrediction.confidence}%` }}
                />
              </div>
              <p className="text-[10px] text-text-secondary leading-normal pt-1 font-sans">
                Confidence is calculated via Random Forest probabilistic weights from Yahoo Finance signals.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
