import { useState } from 'react';
import { TrendingUp, Layers, HelpCircle, Activity, Globe, Cpu, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { AuthUser } from '../services/auth';

interface HeaderProps {
  activeTab: 'dashboard' | 'about';
  onTabChange: (tab: 'dashboard' | 'about') => void;
  isSimulating: boolean;
  onToggleMode: () => void;
  hasApiUrl: boolean;
  user: AuthUser | null;
  onSignInClick: () => void;
  onSignOut: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  isSimulating,
  onToggleMode,
  hasApiUrl,
  user,
  onSignInClick,
  onSignOut,
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

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
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex space-x-1" id="nav-tabs">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`relative px-3 sm:px-4 py-2 font-sans text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              id="tab-dashboard"
            >
              Dashboard
              {activeTab === 'dashboard' && (
                <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-0.5 bg-precision-blue rounded-full" />
              )}
            </button>
            <button
              onClick={() => onTabChange('about')}
              className={`relative px-3 sm:px-4 py-2 font-sans text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              id="tab-about"
            >
              About Model
              {activeTab === 'about' && (
                <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-0.5 bg-precision-blue rounded-full" />
              )}
            </button>
          </nav>

          <div className="hidden sm:block h-4 w-px bg-border-card" />

          {/* Execution Environment Status Pill (Live FastAPI API vs High-Fid Simulator) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMode}
              title={
                hasApiUrl 
                  ? `Click to toggle between live backend API and client-side simulator`
                  : 'Live backend API not configured. Running in client-side simulator mode.'
              }
              className={`hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide transition-all ${
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
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-border-card bg-surface-card text-text-secondary hover:text-text-primary transition-colors"
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

            <div className="h-4 w-px bg-border-card" />

            {/* USER SESSIONS AUTH ACTIONS TRIGGER */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1.5 rounded-lg border border-border-card bg-surface-card/80 px-2.5 py-1.5 hover:bg-zinc-800/50 transition-all select-none"
                  id="user-profile-button"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="h-5 w-5 rounded-full bg-zinc-800 border border-zinc-700"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden md:inline font-sans text-xs font-semibold text-text-primary max-w-[100px] truncate">
                    {user.displayName}
                  </span>
                  <ChevronDown className="h-3 w-3 text-text-secondary" />
                </button>

                {/* Glassmorphic Dropdown Menu */}
                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-border-card bg-surface-card/95 p-1.5 shadow-2xl backdrop-blur-md z-20 animate-fade-in">
                      <div className="px-3 py-2 border-b border-border-card/40">
                        <p className="font-sans text-xs font-semibold text-text-primary truncate">
                          {user.displayName}
                        </p>
                        <p className="font-mono text-[9px] text-text-secondary truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onSignOut();
                          setShowDropdown(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-sans text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Log Out Session</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="flex items-center gap-1.5 rounded-lg bg-precision-blue hover:bg-precision-blue-hover px-3.5 py-1.5 font-sans text-xs font-bold text-white transition-colors"
                id="header-signin-btn"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}

