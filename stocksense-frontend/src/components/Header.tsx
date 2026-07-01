import { TrendingUp, Layers, HelpCircle, Activity, Globe, Cpu } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'about';
  onTabChange: (tab: 'dashboard' | 'about') => void;
  isSimulating: boolean;
  onToggleMode: () => void;
  hasApiUrl: boolean;
}

export function Header({
  activeTab,
  onTabChange,
  isSimulating,
  onToggleMode,
  hasApiUrl,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-card bg-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onTabChange('dashboard')}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
          id="brand-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-precision-blue text-white shadow-[0_0_12px_rgba(0,112,243,0.3)]">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <span className="font-sans text-lg font-bold tracking-tight text-text-primary">
              StockSense-AI
            </span>
          </div>
        </div>

        {/* Navigation Tabs & System Toggles */}
        <div className="flex items-center gap-6">
          <nav className="flex space-x-1" id="nav-tabs">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              id="tab-dashboard"
            >
              Dashboard
              {activeTab === 'dashboard' && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-precision-blue rounded-full" />
              )}
            </button>
            <button
              onClick={() => onTabChange('about')}
              className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              id="tab-about"
            >
              About Model
              {activeTab === 'about' && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-precision-blue rounded-full" />
              )}
            </button>
          </nav>

          <div className="h-4 w-px bg-border-card" />

          {/* Execution Environment Status Pill (Live FastAPI API vs High-Fid Simulator) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMode}
              title={
                hasApiUrl 
                  ? `Click to toggle between live backend API and client-side simulator`
                  : 'Live backend API not configured. Running in client-side simulator mode.'
              }
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide transition-all ${
                !isSimulating && hasApiUrl
                  ? 'bg-precision-blue/10 border border-precision-blue/30 text-precision-blue'
                  : 'bg-zinc-800/60 border border-zinc-700/50 text-text-secondary'
              }`}
              id="status-mode-toggle"
            >
              {!isSimulating && hasApiUrl ? (
                <>
                  <Globe className="h-3 w-3 animate-pulse" />
                  <span>Live API</span>
                </>
              ) : (
                <>
                  <Cpu className="h-3 w-3" />
                  <span>Simulator</span>
                </>
              )}
            </button>

            {/* Quiet Dark Mode Indicator Icon */}
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-card bg-surface-card text-text-secondary hover:text-text-primary transition-colors"
              title="System optimized for dark theme"
              id="theme-indicator"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon text-precision-blue h-4 w-4"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
