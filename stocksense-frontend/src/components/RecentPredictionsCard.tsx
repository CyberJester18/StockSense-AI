import { PredictionHistoryItem } from '../types';
import { ArrowUpRight, ArrowDownRight, Clock, Trash2, ListFilter } from 'lucide-react';

interface RecentPredictionsCardProps {
  history: PredictionHistoryItem[];
  onSelectSymbol: (symbol: string) => void;
  onClearHistory?: () => void;
}

export function RecentPredictionsCard({
  history,
  onSelectSymbol,
  onClearHistory,
}: RecentPredictionsCardProps) {
  return (
    <div 
      className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8 flex flex-col h-full"
      id="recent-predictions-card"
    >
      {/* Header section with optional Clear action */}
      <div className="flex items-center justify-between border-b border-border-card/50 pb-5 mb-5">
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-text-secondary" />
          <h3 className="font-sans text-lg font-semibold text-text-primary tracking-tight">
            Recent Predictions
          </h3>
        </div>
        {onClearHistory && history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 font-mono text-[10px] text-text-secondary hover:text-alert-red transition-colors"
            title="Clear all recent history"
          >
            <Trash2 className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* List content */}
      <div className="flex-1 overflow-y-auto pr-1" id="recent-predictions-list">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Clock className="h-8 w-8 text-zinc-700 mb-3" />
            <p className="font-sans text-sm text-text-secondary">No recent predictions.</p>
            <p className="font-sans text-xs text-zinc-600 mt-1 max-w-[200px]">
              Enter a ticker symbol and trigger the prediction model to see results here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-card/40">
            {history.map((item) => {
              const isBuy = item.prediction === 'BUY';
              const isSell = item.prediction === 'SELL';
              
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSymbol(item.symbol)}
                  className="group flex items-center justify-between py-4 cursor-pointer hover:bg-zinc-800/10 rounded-md px-2 -mx-2 transition-all"
                  title="Click to load this symbol"
                >
                  {/* Left Column: Symbol & Timestamp */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-sm font-semibold text-text-primary group-hover:text-precision-blue transition-colors">
                        {item.symbol}
                      </span>
                      {isBuy ? (
                        <ArrowUpRight className="h-3 w-3 text-success-green opacity-0 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-alert-red opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary font-mono">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>

                  {/* Right Column: Prediction Action & Confidence */}
                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="text-[10px] text-text-secondary">CONFIDENCE</div>
                      <div className="text-xs font-bold text-text-primary">{item.confidence}%</div>
                    </div>
                    
                    <div className="w-16 text-right">
                      <span
                        className={`inline-block font-sans text-xs font-bold tracking-widest uppercase transition-transform group-hover:scale-105 ${
                          isBuy
                            ? 'text-success-green bg-success-green/10 border border-success-green/20 px-2 py-0.5 rounded'
                            : isSell
                            ? 'text-alert-red bg-alert-red/10 border border-alert-red/20 px-2 py-0.5 rounded'
                            : 'text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded'
                        }`}
                      >
                        {item.prediction}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
