import { Terminal, Shield, FileText, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border-card bg-[#0A0A0A] py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Main Grid split */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* Left Column: Tech Attribution */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold tracking-widest text-text-primary block uppercase">
              STOCKSENSE-AI
            </span>
            <p className="font-sans text-xs text-text-secondary">
              Powered by{' '}
              <span className="font-mono text-[11px] text-zinc-400">FastAPI</span> •{' '}
              <span className="font-mono text-[11px] text-zinc-400">Scikit-learn</span> •{' '}
              <span className="font-mono text-[11px] text-zinc-400">Yahoo Finance API</span>
            </p>
          </div>

          {/* Right Column: Footer Links & Copyright */}
          <div className="flex flex-col gap-3 md:items-end">
            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 font-sans text-xs text-text-secondary">
              <a 
                href="#docs" 
                className="hover:text-precision-blue transition-colors flex items-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                <Terminal className="h-3 w-3 text-precision-blue" />
                <span>Documentation</span>
              </a>
              <span className="text-zinc-800">|</span>
              <a 
                href="#privacy" 
                className="hover:text-precision-blue transition-colors flex items-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                <Shield className="h-3 w-3 text-precision-blue" />
                <span>Privacy</span>
              </a>
              <span className="text-zinc-800">|</span>
              <a 
                href="#terms" 
                className="hover:text-precision-blue transition-colors flex items-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                <FileText className="h-3 w-3 text-precision-blue" />
                <span>Terms</span>
              </a>
            </div>

            {/* Copyright */}
            <p className="font-sans text-[11px] text-text-secondary tracking-tight">
              © {new Date().getFullYear()} StockSense-AI. Engineering-Grade Financial Intelligence.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
