import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UploadWorkspace } from './components/UploadWorkspace';
import { ResultsView } from './components/ResultsView';
import { ScreeningResult } from './types';

export default function App() {
  const [activeResult, setActiveResult] = useState<ScreeningResult | null>(null);

  const handleReset = () => {
    setActiveResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Clean Top Navigation */}
      <Navbar
        onReset={handleReset}
        hasActiveResult={activeResult !== null}
      />

      {/* Main Content Area: Focused on Document Screening */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Simple Page Header when on upload screen */}
        {!activeResult && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Document Authenticity Verification
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Upload any identity document (Aadhaar, PAN, Passport, or Voter ID) to check whether it is original or counterfeit.
            </p>
          </div>
        )}

        {/* Screening Workflow or Results View */}
        {activeResult ? (
          <ResultsView
            result={activeResult}
            onReset={handleReset}
          />
        ) : (
          <UploadWorkspace
            onScreeningComplete={(result) => {
              setActiveResult(result);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Clean, Simple Footer */}
      <Footer />
    </div>
  );
}
