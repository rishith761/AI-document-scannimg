import React, { useState } from 'react';
import { FIVE_LAYERS_META } from '../data/mockData';
import { 
  Cpu, 
  FileCheck, 
  UserCheck, 
  QrCode, 
  Scale, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ICONS = [Cpu, FileCheck, UserCheck, QrCode, Scale];

export function LayersSection() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  return (
    <section id="layers-section" className="relative py-20 bg-[#050814] border-b border-white/5">
      {/* Background cyber accent */}
      <div className="absolute inset-0 cyber-grid-dense opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEFENSE-IN-DEPTH ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Five-Layer Intelligence Engine
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Every document undergoes continuous parallel interrogation. Single-factor checks fail against modern generative AI; TruthLens correlates multi-dimensional forensics in milliseconds.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {FIVE_LAYERS_META.map((layer, idx) => {
            const IconComponent = ICONS[idx];
            const isHovered = activeLayerIndex === idx;

            return (
              <div
                key={layer.code}
                onMouseEnter={() => setActiveLayerIndex(idx)}
                className={`relative group rounded-xl p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isHovered
                    ? 'bg-slate-900/90 border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.15)] -translate-y-1'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                } backdrop-blur-md`}
                id={`layer-card-${layer.code.toLowerCase()}`}
              >
                {/* Glowing top line accent */}
                <div 
                  className={`absolute top-0 left-4 right-4 h-[2px] transition-all duration-300 rounded-full ${
                    isHovered ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-transparent'
                  }`} 
                />

                <div>
                  {/* Top Row: Layer Code & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-cyan-400/90 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {layer.code}
                    </span>
                    <div className={`p-2 rounded-lg border transition-colors ${
                      isHovered 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50' 
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/50'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-2">
                    <span className="text-[11px] font-mono text-violet-400 tracking-wider uppercase">
                      {layer.badge}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {layer.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {layer.description}
                  </p>
                </div>

                <div>
                  {/* Animated Visual Micro-Component */}
                  <div className="h-24 w-full rounded-lg bg-black/60 border border-slate-800/80 p-2.5 flex flex-col justify-between overflow-hidden relative mb-4 font-mono text-[10px]">
                    {idx === 0 && (
                      /* ELA Scan Lines Visualizer */
                      <div className="relative h-full w-full flex flex-col justify-between">
                        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:8px_8px] opacity-25" />
                        <div className="relative flex justify-between text-cyan-300 text-[9px]">
                          <span>DCT RESIDUAL</span>
                          <span className="animate-pulse text-emerald-400">NORMAL</span>
                        </div>
                        <div className="relative w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 w-3/4 animate-pulse" />
                        </div>
                        <div className="relative text-slate-400 flex justify-between text-[9px]">
                          <span>QUANT Δ: 0.04%</span>
                          <span>8x8 BLOCKS</span>
                        </div>
                        {/* Moving scanline */}
                        <div className="absolute inset-x-0 h-4 bg-cyan-400/15 blur-[2px] animate-scan pointer-events-none" />
                      </div>
                    )}

                    {idx === 1 && (
                      /* Typography & Microprint Visualizer */
                      <div className="h-full flex flex-col justify-between text-slate-300">
                        <div className="flex justify-between text-[9px] text-violet-400">
                          <span>KERNING CHECK</span>
                          <span>99.4% F1</span>
                        </div>
                        <div className="border border-violet-500/40 border-dashed rounded p-1 text-[9px] text-center bg-violet-950/20 text-violet-200">
                          [AADHAAR UIDAI SPEC]
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>ASPECT: 1.586</span>
                          <span className="text-emerald-400">VALID</span>
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      /* 3D Facial Landmark Triangulation */
                      <div className="h-full flex flex-col justify-between relative">
                        <div className="flex justify-between text-[9px] text-sky-400">
                          <span>BIOMETRIC MESH</span>
                          <span className="text-emerald-400">68 PTS</span>
                        </div>
                        <div className="relative h-9 flex items-center justify-center">
                          {/* Face landmarks mock SVG */}
                          <svg className="w-16 h-8 text-sky-400" viewBox="0 0 60 30" fill="none">
                            <circle cx="20" cy="12" r="1.5" fill="#00f0ff" />
                            <circle cx="40" cy="12" r="1.5" fill="#00f0ff" />
                            <circle cx="30" cy="18" r="1.5" fill="#38bdf8" />
                            <circle cx="25" cy="24" r="1.5" fill="#818cf8" />
                            <circle cx="35" cy="24" r="1.5" fill="#818cf8" />
                            <line x1="20" y1="12" x2="30" y2="18" stroke="rgba(0,240,255,0.4)" strokeWidth="0.8" />
                            <line x1="40" y1="12" x2="30" y2="18" stroke="rgba(0,240,255,0.4)" strokeWidth="0.8" />
                            <line x1="30" y1="18" x2="25" y2="24" stroke="rgba(0,240,255,0.4)" strokeWidth="0.8" />
                            <line x1="30" y1="18" x2="35" y2="24" stroke="rgba(0,240,255,0.4)" strokeWidth="0.8" />
                          </svg>
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>GAN ARTIFACT: 0.2%</span>
                          <span className="text-emerald-400">LIVE</span>
                        </div>
                      </div>
                    )}

                    {idx === 3 && (
                      /* QR & Cryptographic Parity */
                      <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between text-[9px] text-cyan-300">
                          <span>QR DECRYPT</span>
                          <span className="text-emerald-400">RSA-2048</span>
                        </div>
                        <div className="bg-slate-900 rounded p-1 text-[8px] text-slate-300 font-mono truncate border border-slate-700">
                          HASH: 7f83b165...00126d
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>MRZ 9303: MATCH</span>
                          <span className="text-emerald-400">PARITY 1.0</span>
                        </div>
                      </div>
                    )}

                    {idx === 4 && (
                      /* Trust Score Bayesian Fusion */
                      <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between text-[9px] text-emerald-400">
                          <span>FUSION SYNTHESIS</span>
                          <span>WEIGHTED</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[8px]">
                            <span className="w-8 text-slate-400">L1-L3</span>
                            <div className="h-1 bg-cyan-400 rounded-full flex-1" />
                            <span className="text-cyan-300">0.45</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[8px]">
                            <span className="w-8 text-slate-400">L4-L5</span>
                            <div className="h-1 bg-emerald-400 rounded-full w-4/5" />
                            <span className="text-emerald-300">0.55</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>VERDICT</span>
                          <span className="text-emerald-400 font-bold">LEGIT</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Subfeatures List */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    {layer.subfeatures.slice(0, 2).map((sub, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Footer */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-mono border-t border-slate-800">
                    <span className="text-slate-500">{layer.metricLabel}</span>
                    <span className="text-cyan-300 font-medium">{layer.metricValue}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
