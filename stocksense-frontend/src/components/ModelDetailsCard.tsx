import { Sliders, Cpu, Database, Award } from 'lucide-react';
import { ModelDetails } from '../types';

interface ModelDetailsCardProps {
  details?: ModelDetails;
}

export function ModelDetailsCard({
  details = {
    algorithm: 'Random Forest',
    backend: 'FastAPI',
    dataSource: 'Yahoo Finance',
    modelAccuracy: '66.85%',
  },
}: ModelDetailsCardProps) {
  return (
    <div 
      className="rounded-2xl border border-border-card bg-surface-card p-6 md:p-8"
      id="model-details-card"
    >
      {/* Card Header with Icon */}
      <div className="flex items-center gap-3 border-b border-border-card/50 pb-5 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/40 text-precision-blue">
          <Sliders className="h-4.5 w-4.5" />
        </div>
        <h3 className="font-sans text-lg font-semibold text-text-primary tracking-tight">
          Model Details
        </h3>
      </div>

      {/* Details List */}
      <div className="space-y-4 font-sans text-sm">
        
        {/* Algorithm */}
        <div className="flex items-center justify-between py-1.5 border-b border-border-card/30">
          <span className="text-text-secondary font-medium">Algorithm</span>
          <span className="rounded-full bg-zinc-800/60 border border-zinc-700/50 px-3.5 py-1 font-mono text-xs text-text-primary">
            {details.algorithm}
          </span>
        </div>

        {/* Backend */}
        <div className="flex items-center justify-between py-1.5 border-b border-border-card/30">
          <span className="text-text-secondary font-medium">Backend</span>
          <span className="rounded-full bg-zinc-800/60 border border-zinc-700/50 px-3.5 py-1 font-mono text-xs text-text-primary">
            {details.backend}
          </span>
        </div>

        {/* Data Source */}
        <div className="flex items-center justify-between py-1.5 border-b border-border-card/30">
          <span className="text-text-secondary font-medium">Data Source</span>
          <span className="rounded-full bg-zinc-800/60 border border-zinc-700/50 px-3.5 py-1 font-mono text-xs text-text-primary">
            {details.dataSource}
          </span>
        </div>

        {/* Model Accuracy */}
        <div className="flex items-center justify-between py-1.5 pt-3">
          <span className="text-text-secondary font-semibold">Model Accuracy</span>
          <span className="font-mono text-sm font-bold text-precision-blue">
            {details.modelAccuracy}
          </span>
        </div>

      </div>
    </div>
  );
}
