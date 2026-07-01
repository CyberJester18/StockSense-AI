import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PredictorCard } from './components/PredictorCard';
import { ModelDetailsCard } from './components/ModelDetailsCard';
import { RecentPredictionsCard } from './components/RecentPredictionsCard';
import { AboutModelView } from './components/AboutModelView';
import { Footer } from './components/Footer';
import { predictStockTrend, getApiConfig } from './services/api';
import { PredictResponse, PredictionHistoryItem } from './types';
import { Cpu, Globe, Info, AlertTriangle, Sparkles, Database } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'about'>('dashboard');

  // API Config Status
  const apiConfig = getApiConfig();
  const [isSimulating, setIsSimulating] = useState<boolean>(!apiConfig.isConfigured);

  // Operation States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrediction, setLastPrediction] = useState<PredictResponse | null>(null);

  // Predefined/Preseeded history matching the original Google Stitch spec screenshot
  const [history, setHistory] = useState<PredictionHistoryItem[]>([
    {
      id: '1',
      symbol: 'RELIANCE.NS',
      prediction: 'SELL',
      confidence: 73.40,
      timestamp: '10:15:20 AM',
    },
    {
      id: '2',
      symbol: 'TCS.NS',
      prediction: 'BUY',
      confidence: 88.50,
      timestamp: '10:12:05 AM',
    },
    {
      id: '3',
      symbol: 'INFY.NS',
      prediction: 'BUY',
      confidence: 91.15,
      timestamp: '09:55:40 AM',
    },
    {
      id: '4',
      symbol: 'HDFCBANK.NS',
      prediction: 'SELL',
      confidence: 64.20,
      timestamp: '09:42:12 AM',
    },
  ]);

  // Handle predicting stock trend
  const handlePredict = async (symbol: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call standard prediction client with current mode selection
      const result = await predictStockTrend(symbol, isSimulating);
      
      setLastPrediction(result);

      // Prepend to history, avoiding duplicate IDs
      const newHistoryItem: PredictionHistoryItem = {
        id: Date.now().toString(),
        symbol: result.symbol,
        prediction: result.prediction,
        confidence: result.confidence,
        timestamp: result.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (err: any) {
      setError(err.message || 'An unexpected server error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Live API vs high fidelity simulation mode
  const handleToggleMode = () => {
    if (!apiConfig.isConfigured) {
      // Prompt warning if user tries to activate live without ENV variable
      alert(
        'Backend URL is empty. To connect a live FastAPI endpoint, add the "VITE_API_URL" parameter inside your env variables.'
      );
      return;
    }
    setIsSimulating((prev) => !prev);
    setError(null);
  };

  const handleSelectSymbol = (symbol: string) => {
    // Switch back to dashboard view if on about page
    setActiveTab('dashboard');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    setLastPrediction(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary selection:bg-precision-blue/30 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isSimulating={isSimulating}
        onToggleMode={handleToggleMode}
        hasApiUrl={apiConfig.isConfigured}
      />

      {/* Main Body */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 md:px-10 md:py-16">
        
        {/* Notice Info Banner if live API is missing / running in simulated mode */}
        {isSimulating && (
          <div className="mb-8 rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-4 font-sans text-xs text-text-secondary" id="env-notif-banner">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2.5">
                <Info className="h-4 w-4 text-precision-blue shrink-0" />
                <p>
                  Running in <strong className="text-text-primary">Simulator Mode</strong> with built-in high-fidelity predictions.
                  {!apiConfig.isConfigured && " To connect your FastAPI server, configure the VITE_API_URL secret."}
                </p>
              </div>
              {!apiConfig.isConfigured && (
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-precision-blue">
                  <Database className="h-3 w-3" />
                  <span>API_URL NOT SET</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' ? (
          /* Dashboard Layout */
          <div className="space-y-10" id="dashboard-tab-view">
            
            {/* Title & Description Intro section */}
            <div className="space-y-4">
              <h1 className="font-sans text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[48px] lg:leading-[1.1] lg:tracking-[-0.04em]">
                AI Powered Stock Trend Prediction
              </h1>
              <p className="max-w-2xl font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                Predict stock trends using a machine learning model trained on historical market data.
              </p>
            </div>

            {/* Grid Area: Left (Form + Details), Right (History) */}
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              
              {/* Left Column (Span 5) */}
              <div className="space-y-6 lg:col-span-5">
                <PredictorCard
                  onPredict={handlePredict}
                  isLoading={isLoading}
                  error={error}
                  lastPrediction={lastPrediction}
                  isSimulating={isSimulating}
                />
                
                <ModelDetailsCard />
              </div>

              {/* Right Column (Span 7) */}
              <div className="lg:col-span-7 h-full min-h-[500px] lg:min-h-[580px]">
                <RecentPredictionsCard
                  history={history}
                  onSelectSymbol={handleSelectSymbol}
                  onClearHistory={handleClearHistory}
                />
              </div>

            </div>

          </div>
        ) : (
          /* About Model Specifications Layout */
          <AboutModelView />
        )}

      </main>

      {/* Persistent Technical Footer */}
      <Footer />

    </div>
  );
}
