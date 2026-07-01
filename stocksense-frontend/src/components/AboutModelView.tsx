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
          StockSense-AI is a machine learning web application that predicts BUY or SELL signals using historical stock market data. The application combines a React frontend, a FastAPI backend, and a Random Forest classifier to deliver real-time stock trend predictions.
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
              The primary classifier is a Random Forest Ensemble trained with historical price data. It constructs multiple decision trees and averages their probabilistic votes to guard against overfitting on high-frequency market noise.
            </p>
          </div>
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-mono border-b border-border-card/40 pb-2">
              <span className="text-text-secondary">Algorithm</span>
              <span className="text-text-primary font-semibold">Random Forest Classifier</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono border-b border-border-card/40 pb-2">
              <span className="text-text-secondary">Training Accuracy</span>
              <span className="text-text-primary font-semibold">66.85%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono border-b border-border-card/40 pb-2">
              <span className="text-text-secondary">Prediction Output</span>
              <span className="text-text-primary font-semibold">BUY / SELL</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-text-secondary">Confidence Score</span>
              <span className="text-text-primary font-semibold">Probability Based</span>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">MA20</span>
              <p className="text-xs text-text-secondary leading-normal">
                20-day Simple Moving Average tracking short-term momentum and baseline price trends.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">MA50</span>
              <p className="text-xs text-text-secondary leading-normal">
                50-day Simple Moving Average used to identify intermediate trend thresholds and support lines.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">RSI</span>
              <p className="text-xs text-text-secondary leading-normal">
                Relative Strength Index (14-period) tracking overbought and oversold conditions.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">Daily Return</span>
              <p className="text-xs text-text-secondary leading-normal">
                Percentage rate of change in close price day-over-day, representing standard asset volatility.
              </p>
            </div>
            <div className="rounded-lg bg-bg-base border border-border-card/40 p-3 space-y-1 sm:col-span-2">
              <span className="font-mono text-[10px] text-precision-blue font-bold uppercase block">Volume</span>
              <p className="text-xs text-text-secondary leading-normal">
                Total traded shares within a session, confirming the strength or weakness of price trends.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Technology Stack */}
        <div className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8 space-y-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/40 text-precision-blue">
            <Layers className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              Technology Stack
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              An engineering-grade framework stack selected for reliable computation, high-performance API throughput, and responsive user feedback.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Scikit-learn', 'Yahoo Finance', 'GitHub'].map((tech) => (
              <span key={tech} className="rounded-md bg-bg-base border border-border-card/60 px-3 py-1.5 font-mono text-xs text-text-primary">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card 4: Future Improvements */}
        <div className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8 space-y-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/40 text-precision-blue">
            <Settings className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              Future Improvements
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Planned development roadmap items designed to enhance prediction accuracy, system flexibility, and analytical insights.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {['LSTM', 'XGBoost', 'Portfolio Tracking', 'Real-time Alerts', 'User Authentication', 'Cloud Deployment'].map((improvement) => (
              <div key={improvement} className="flex items-center gap-2 rounded-lg bg-bg-base border border-border-card/40 p-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-precision-blue" />
                <span className="font-sans text-xs font-medium text-text-primary">{improvement}</span>
              </div>
            ))}
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
              The feature vector is passed to the trained Random Forest Classifier. It evaluates probabilities to calculate the predicted trend direction (<code>BUY</code> or <code>SELL</code>) and its confidence score.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
  }
