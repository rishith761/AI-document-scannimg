import React from 'react';
import { SecurityShield3D } from './3d/SecurityShield3D';
import { SECURITY_FEATURES } from '../data/mockData';
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Compass, 
  UserCog, 
  CheckCircle,
  FileKey,
  DatabaseZap
} from 'lucide-react';

const ICONS = [ShieldCheck, Lock, Trash2, Compass, UserCog];

export function SecuritySection() {
  return (
    <section id="security-section" className="relative py-20 bg-[#050814] border-b border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENTERPRISE PRIVACY ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Security & Privacy by Design
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Zero persistent image storage, verifiable cryptographic hashes, and explainable forensic decisions engineered for strict banking & KYC compliance.
          </p>
        </div>

        {/* 2-Column Grid: 3D Shield Model on Left, 5 Pillars on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: 3D Holographic Cryptographic Shield Visual */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-cyan-500/20 backdrop-blur-xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
              
              {/* 3D Shield Canvas */}
              <SecurityShield3D />

              {/* Status Badge beneath 3D Shield */}
              <div className="mt-2 w-full p-3 rounded-xl bg-slate-950/80 border border-white/5 text-center font-mono text-xs">
                <div className="text-emerald-400 font-bold flex items-center justify-center gap-1.5 mb-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>EPHEMERAL SECURE ENCLAVE</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  AES-256 Memory Encryption • Auto-Purge Cache &lt;15min
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Pillars List */}
          <div className="lg:col-span-7 space-y-4">
            {SECURITY_FEATURES.map((feat, idx) => {
              const IconComp = ICONS[idx];
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/70 transition-all duration-200 flex items-start gap-4 backdrop-blur-md"
                  id={`security-pillar-${idx}`}
                >
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
