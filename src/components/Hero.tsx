import React from 'react';
import { HeroScene3D } from './3d/HeroScene3D';
import { ArrowRight, ShieldCheck, Cpu, Zap, Fingerprint, Layers, AlertTriangle } from 'lucide-react';

interface HeroProps {
  onStartScreening: () => void;
  onExploreDemo: (preset?: 'legit' | 'suspect' | 'tampered') => void;
}

export function Hero({ onStartScreening, onExploreDemo }: HeroProps) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/5">
      {/* Background ambient lighting and grid */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            {/* Tagline / System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 w-fit backdrop-blur-md shadow-lg shadow-cyan-950/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-xs font-mono font-medium text-cyan-300 tracking-wide">
                NEXT-GEN FORENSIC INTELLIGENCE • v2.4
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Trust Every <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-400 bg-clip-text text-transparent">
                Identity.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              AI-powered multi-layer screening for tampered documents, synthetic identities, and face-authenticity risks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartScreening}
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all duration-200 cursor-pointer"
                id="hero-start-screening-btn"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Start Screening</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExploreDemo('suspect')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 backdrop-blur-md transition-all cursor-pointer"
                id="hero-explore-demo-btn"
              >
                <Zap className="w-4 h-4 text-violet-400" />
                <span>Explore Demo</span>
              </button>
            </div>

            {/* Disclaimer pill */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Frontend Prototype — simulated forensic analysis & demo datasets</span>
            </div>

            {/* Telemetry Stats Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="text-xl font-bold font-mono text-cyan-400">5 Layers</div>
                <div className="text-[11px] text-slate-400">Deep Inspection</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="text-xl font-bold font-mono text-violet-400">&lt;650ms</div>
                <div className="text-[11px] text-slate-400">Analysis Pipeline</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="text-xl font-bold font-mono text-emerald-400">99.8%</div>
                <div className="text-[11px] text-slate-400">Target Precision</div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: 3D Centerpiece */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/40 via-[#0a1128]/70 to-slate-950/80 border border-cyan-500/20 backdrop-blur-xl p-2 shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
              {/* 3D Visual Centerpiece */}
              <HeroScene3D />

              {/* Holographic HUD floating telemetry cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 mt-1 bg-slate-950/70 rounded-xl border border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <div className="text-slate-400 text-[10px]">ELA Grid</div>
                    <div className="text-white font-medium">8x8 Quantized</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-violet-400 shrink-0" />
                  <div className="truncate">
                    <div className="text-slate-400 text-[10px]">Face Depth</div>
                    <div className="text-white font-medium">3D Landmark Mesh</div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <div className="text-slate-400 text-[10px]">Cryptographic</div>
                    <div className="text-white font-medium">QR & MRZ Match</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
