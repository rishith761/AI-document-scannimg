import React from 'react';
import { Shield, RotateCcw, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onReset?: () => void;
  hasActiveResult?: boolean;
}

export function Navbar({ onReset, hasActiveResult }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 cursor-pointer"
          id="brand-logo"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900">
                TruthLens
              </span>
              <span className="text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                Document Screening
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              5-Layer Automated Identity & Forgery Detection
            </p>
          </div>
        </div>

        {/* Right Status / Action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Screening Engine Online</span>
          </div>

          {hasActiveResult && (
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              id="nav-reset-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
