import { 
  Cpu, 
  Workflow, 
  Settings, 
  TrendingUp, 
  LineChart, 
  Activity, 
  Database,
  Terminal,
  Layers
} from 'lucide-react';

export function AboutModelView() {
  return (
    <div className="space-y-10 animate-fade-in" id="about-model-view">
      
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-precision-blue/10 border border-precision-blue/20 px-3 py-1 font-mono text-[11px] text-precision-blue uppercase">
          <Cpu className="h-3 w-3" />
          <span>System Architecture</span>
        </div>
        <h1 className="font-sans text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          About StockSense-AI
        </h1>
        <p className="max-w-2xl font-sans text-base text-text-secondary leading-relaxed">
          StockSense-AI leverages a machine learning classifier optimized for low-latency financial signal forecasting. By ingesting historical market candles, our system extracts momentum and volatility features to output highly confident, direction-focused trend predictions.
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Card 1: Machine Learning Classifier */}
        <div className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8 space-y-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/40 text-precision-blue">
            <Workflow className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              Model Specifications
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              The primary classifier is a **Random Forest Ensemble** trained with historical price data. It constructs multiple decision trees and averages their probabilistic votes to guard against overfitting on high-frequency market noise.
            </p>
          </div>
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-mono border-b border-border-card/40 pb-2">
              <span className="text-text-secondary">Ensemble Estimators</span>
              <span className="text-text-primary font-semibold">100 Trees</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono border-b border-border-card/40 pb-2">
              <span className="text-text-secondary">Feature Criterion</span>
              <span className="text-text-primary font-semibold">Gini Impurity</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono border-b border-border-card/40 pb-2">
              <span className="text-text-secondary">Max Tree Depth</span>
              <span className="text-text-primary font-semibold">15 Nodes</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-text-secondary">Training Split</span>
              <span className="text-text-primary font-semibold">80% Train / 20% Test</span>
            </div>
          </div>
        </div>

        {/* Card 2: Technical Indicators (Feature Engineering) */}
        <div className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8 space-y-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/40 text-precision-blue">
            <LineChart className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              Feature Engineering Pipeline
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Raw OHLC (Open, High, Low, Close) stock candles are processed server-side through a feature extractor. The model computes key momentum and trend-reversal mathematical indicators.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">RSI (14)</span>
              <p className="text-xs text-text-secondary leading-normal">
                Relative Strength Index checks for overbought/oversold momentum triggers.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">MACD</span>
              <p className="text-xs text-text-secondary leading-normal">
                Moving Average Convergence Divergence spots trend velocity shifts.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">SMA (50/200)</span>
              <p className="text-xs text-text-secondary leading-normal">
                Golden/Death Crosses provide major macro support thresholds.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">VOL-EMA</span>
              <p className="text-xs text-text-secondary leading-normal">
                Volume moving averages track real institutional accumulation.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Connection Architecture & Pipeline Flow */}
      <div className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/40 text-precision-blue">
            <Terminal className="h-4.5 w-4.5" />
          </div>
          <h3 className="font-sans text-lg font-semibold text-text-primary tracking-tight">
            Integration Pipeline Architecture
          </h3>
        </div>

        <div className="relative border-l-2 border-zinc-800 pl-6 space-y-6">
          
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-precision-blue text-white ring-4 ring-zinc-900">
              <span className="text-[9px] font-bold">1</span>
            </div>
            <h4 className="font-sans text-sm font-semibold text-text-primary">
              Client Request Dispatch
            </h4>
            <p className="font-sans text-xs text-text-secondary mt-1">
              User submits a valid stock ticker symbol (e.g., <code>RELIANCE.NS</code>) from the UI. The request is dispatched via standard JSON payload payload to the FastAPI web server.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-precision-blue text-white ring-4 ring-zinc-900">
              <span className="text-[9px] font-bold">2</span>
            </div>
            <h4 className="font-sans text-sm font-semibold text-text-primary">
              FastAPI Data Ingestion
            </h4>
            <p className="font-sans text-xs text-text-secondary mt-1">
              The backend queries the <code>yfinance</code> API to retrieve historical daily candles, validates stock metrics, and builds a feature vector.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-precision-blue text-white ring-4 ring-zinc-900">
              <span className="text-[9px] font-bold">3</span>
            </div>
            <h4 className="font-sans text-sm font-semibold text-text-primary">
              Scikit-learn Prediction
            </h4>
            <p className="font-sans text-xs text-text-secondary mt-1">
              The feature vector is passed to the trained Random Forest Classifier. It evaluates probabilities to calculate the predicted trend direction (<code>BUY</code>, <code>SELL</code>, or <code>HOLD</code>) and its confidence score.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
