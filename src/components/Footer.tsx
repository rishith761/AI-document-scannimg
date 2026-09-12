import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 text-xs py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-800">TruthLens Document Screening</span>
          <span>•</span>
          <span>Automated 5-Layer Identity Verification</span>
        </div>

        <div className="text-slate-400 text-center sm:text-right">
          Privacy First: Uploaded documents are processed in-memory and not stored.
        </div>

      </div>
    </footer>
  );
}
