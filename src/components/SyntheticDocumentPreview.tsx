import React from 'react';
import { DocumentType } from '../types';
import { Shield, Sparkles, AlertCircle } from 'lucide-react';

interface SyntheticDocumentPreviewProps {
  documentType: DocumentType;
  overlayMode?: 'standard' | 'ela' | 'landmarks' | 'qr';
  hasTampering?: boolean;
}

export function SyntheticDocumentPreview({
  documentType,
  overlayMode = 'standard',
  hasTampering = false,
}: SyntheticDocumentPreviewProps) {
  return (
    <div className="relative w-full aspect-[1.586/1] max-w-lg mx-auto rounded-xl overflow-hidden shadow-md border border-slate-300 bg-slate-900 font-sans select-none">
      
      {/* 1. Base Document Visual Layout based on DocumentType */}
      {documentType === 'Passport' && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 p-4 flex flex-col justify-between text-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sky-400/20 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-widest uppercase font-mono text-cyan-200">
                  INTERNATIONAL PASSPORT
                </div>
                <div className="text-[8px] text-slate-400 font-mono">SPECIMEN / SYNTHETIC IDENTITY</div>
              </div>
            </div>
            <div className="text-right font-mono text-[10px] text-cyan-400">
              UTO-P892017441
            </div>
          </div>

          {/* Middle Body: Photo & Demographic Info */}
          <div className="flex gap-4 items-center my-auto">
            {/* Synthetic Vector Face Portrait */}
            <div className="relative w-24 h-28 rounded-lg bg-slate-800 border border-cyan-400/40 flex flex-col items-center justify-center overflow-hidden shrink-0 shadow-inner">
              <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 text-xs font-bold mb-1">
                <svg className="w-8 h-8 text-cyan-400/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="text-[7px] text-cyan-300 font-mono uppercase tracking-wider">
                BIOMETRIC REF
              </div>
              {/* Holographic eagle / seal overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[9px] font-mono flex-1">
              <div>
                <span className="text-slate-400 block text-[8px]">SURNAME / GIVEN NAME</span>
                <span className="text-white font-bold tracking-wider">CHEN, ALEXANDER D.</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px]">NATIONALITY</span>
                <span className="text-slate-200">UTOPIAN FED.</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px]">DATE OF BIRTH</span>
                <span className="text-slate-200">14 APR 1991</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[8px]">SEX / EXPIRY</span>
                <span className="text-slate-200">M / 28 OCT 2032</span>
              </div>
            </div>
          </div>

          {/* Bottom MRZ Strip */}
          <div className="bg-black/80 rounded p-1 font-mono text-[8px] sm:text-[9px] tracking-widest text-cyan-300 border border-sky-500/20 leading-tight select-none">
            P&lt;UTOCHEN&lt;&lt;ALEXANDER&lt;D&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
            P8920174418UTO9104147M3210284&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06
          </div>
        </div>
      )}

      {documentType === 'PAN' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1833] via-[#09152b] to-[#040b17] p-4 flex flex-col justify-between text-white border border-sky-500/20">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sky-400/20 pb-2">
            <div>
              <div className="text-[11px] font-bold font-mono tracking-wider text-sky-200">
                INCOME TAX DEPARTMENT
              </div>
              <div className="text-[8px] text-slate-400 font-mono">GOVT. OF INDIA (SYNTHETIC MOCK)</div>
            </div>
            <div className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-400/30 text-sky-300">
              PERMANENT ACCOUNT CARD
            </div>
          </div>

          {/* Body */}
          <div className="flex gap-4 items-center my-auto">
            <div className="w-20 h-24 rounded bg-slate-800 border border-sky-400/30 flex flex-col items-center justify-center p-1 relative overflow-hidden shrink-0">
              <svg className="w-8 h-8 text-sky-300/80 mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <div className="text-[7px] text-slate-400 font-mono">SIGNATURE</div>
              <div className="w-14 h-3 border-t border-slate-600 mt-1 font-mono text-[6px] text-center italic text-slate-400">
                R. Verma
              </div>
            </div>

            <div className="space-y-1.5 flex-1 font-mono text-[9px]">
              <div>
                <span className="text-slate-400 text-[8px] block">NAME / FATHER'S NAME</span>
                <span className="text-white font-bold">RAJESH K. VERMA / SURESH VERMA</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[8px] block">DATE OF BIRTH</span>
                  <span className="text-slate-200">09/11/1986</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[8px] block">PAN NUMBER</span>
                  <span className="text-cyan-400 font-bold tracking-wider">BNZPV4910K</span>
                </div>
              </div>
            </div>

            {/* QR block */}
            <div className="w-14 h-14 bg-white/95 rounded p-1 flex items-center justify-center shrink-0 border border-slate-400">
              <div className="w-full h-full bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:4px_4px]" />
            </div>
          </div>

          <div className="text-[8px] font-mono text-slate-400 flex justify-between border-t border-slate-800 pt-1">
            <span>ISSUED UNDER SECTION 139A OF IT ACT</span>
            <span className="text-cyan-400">CATEGORY: INDIVIDUAL (P)</span>
          </div>
        </div>
      )}

      {documentType === 'Aadhaar' && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#101c38] to-slate-950 p-4 flex flex-col justify-between text-white border border-violet-500/20">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-violet-400/20 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-400 flex items-center justify-center text-[8px] font-bold text-red-300">
                ●
              </div>
              <div className="text-[11px] font-bold font-mono tracking-wider text-violet-200">
                UNIQUE IDENTIFICATION AUTHORITY
              </div>
            </div>
            <div className="text-[8px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              SYNTHETIC SPECIMEN
            </div>
          </div>

          {/* Body */}
          <div className="flex gap-4 items-center my-auto">
            {/* Subject Photo with subtle tampering box indicator if applicable */}
            <div className={`relative w-20 h-24 rounded bg-slate-800 flex flex-col items-center justify-center shrink-0 overflow-hidden ${
              hasTampering ? 'border-2 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'border border-violet-400/30'
            }`}>
              <svg className="w-9 h-9 text-violet-300/80 mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <div className="text-[7px] text-violet-300 font-mono">ENROLLED ID</div>
              {hasTampering && (
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[7px] font-bold px-1 rounded animate-pulse">
                  SPLICE
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1 font-mono text-[9px]">
              <div>
                <span className="text-slate-400 text-[8px] block">NAME</span>
                <span className="text-white font-bold text-[10px]">PRIYA SHARMA</span>
              </div>
              <div>
                <span className="text-slate-400 text-[8px] block">DOB / GENDER</span>
                <span className="text-slate-200">18/06/1996 / Female</span>
              </div>
              <div className="text-[8px] text-slate-400">
                ADDRESS: 42 Palm Grove Colony, Sector 9, New Delhi
              </div>
            </div>

            {/* QR Block */}
            <div className="w-16 h-16 bg-white rounded p-1 flex flex-col items-center justify-center shrink-0 border border-slate-300">
              <div className="w-full h-full bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:4px_4px]" />
            </div>
          </div>

          {/* 12-digit Aadhaar Number */}
          <div className="border-t border-violet-500/20 pt-1.5 text-center font-mono text-sm sm:text-base font-extrabold tracking-widest text-violet-300">
            4920 8812 0019
          </div>
        </div>
      )}

      {documentType === 'Voter ID' && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-950 p-4 flex flex-col justify-between text-white border border-emerald-500/20">
          <div className="flex items-center justify-between border-b border-emerald-400/20 pb-2">
            <div>
              <div className="text-[11px] font-bold font-mono tracking-wider text-emerald-200">
                ELECTION COMMISSION IDENTITY CARD
              </div>
              <div className="text-[8px] text-slate-400 font-mono">FORM 6 SPECIMEN (SYNTHETIC)</div>
            </div>
            <div className="text-[10px] font-mono text-emerald-300 font-bold">
              WZL1049281
            </div>
          </div>

          <div className="flex gap-4 items-center my-auto">
            <div className="w-20 h-24 rounded bg-slate-800 border border-emerald-400/30 flex flex-col items-center justify-center shrink-0 overflow-hidden">
              <svg className="w-8 h-8 text-emerald-300/80 mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <div className="text-[7px] text-emerald-300 font-mono">ELECTOR PHOTO</div>
            </div>

            <div className="space-y-1.5 flex-1 font-mono text-[9px]">
              <div>
                <span className="text-slate-400 text-[8px] block">ELECTOR'S NAME</span>
                <span className="text-white font-bold">KAVITA MENON</span>
              </div>
              <div>
                <span className="text-slate-400 text-[8px] block">FATHER'S / HUSBAND'S NAME</span>
                <span className="text-slate-200">M. S. MENON</span>
              </div>
              <div>
                <span className="text-slate-400 text-[8px] block">AGE / SEX</span>
                <span className="text-slate-200">31 Years / Female</span>
              </div>
            </div>

            <div className="w-12 h-16 rounded bg-gradient-to-b from-amber-400/20 to-emerald-400/20 border border-amber-400/40 flex items-center justify-center text-[7px] font-mono text-center text-amber-200 shrink-0">
              SECURITY<br />HOLOGRAM
            </div>
          </div>

          <div className="text-[8px] font-mono text-slate-400 border-t border-slate-800 pt-1 flex justify-between">
            <span>ELECTORAL REGISTRATION OFFICER</span>
            <span className="text-emerald-400">AUTHENTICATED DIGEST</span>
          </div>
        </div>
      )}

      {/* 2. OVERLAYS */}

      {/* Overlay: Error Level Analysis (ELA) Heatmap simulation */}
      {overlayMode === 'ela' && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px] p-4 flex flex-col justify-between z-20">
          <div className="flex justify-between items-center bg-black/80 px-2 py-1 rounded border border-cyan-500/40 text-[9px] font-mono">
            <span className="text-cyan-300 font-bold">ELA QUANTIZATION HEATMAP (8X8 DCT)</span>
            <span className={hasTampering ? 'text-red-400 font-bold animate-pulse' : 'text-emerald-400'}>
              {hasTampering ? 'HIGH RESIDUAL DISPARITY DETECTED' : 'HOMOGENEOUS NOISE ENVELOPE'}
            </span>
          </div>

          {/* ELA Visual Representation */}
          <div className="relative w-full h-40 rounded border border-slate-800 overflow-hidden bg-slate-950">
            {/* Low background noise */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:6px_6px] opacity-70" />

            {/* If tampering detected: Hotspot glows over the photo / text field */}
            {hasTampering ? (
              <>
                {/* Hotspot 1: Photo splice box */}
                <div className="absolute top-4 left-6 w-24 h-28 rounded border-2 border-red-500 bg-red-600/30 blur-[1px] animate-pulse flex items-center justify-center">
                  <span className="text-[8px] font-mono font-extrabold text-white bg-red-700 px-1 rounded shadow">
                    Δ 78.9% HOTSPOT
                  </span>
                </div>
                {/* Hotspot 2: Altered text string */}
                <div className="absolute bottom-6 right-16 w-36 h-6 rounded border border-amber-500 bg-amber-500/30 blur-[1px] flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-amber-200">
                    RESAVING RESIDUAL Δ 34%
                  </span>
                </div>
              </>
            ) : (
              /* Uniform clean noise profile */
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center mb-2">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono text-emerald-300 font-bold">
                  UNIFORM QUANTIZATION RESIDUAL
                </span>
                <span className="text-[8px] font-mono text-slate-400 max-w-xs mt-1">
                  Average error delta 1.2% across photo, borders, and typography. Zero spliced compression boundaries.
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[8px] font-mono text-slate-400">
            <span>BANDWIDTH: 14.2 KHz</span>
            <span>SIMULATED ELA RESIDUAL</span>
          </div>
        </div>
      )}

      {/* Overlay: Facial Landmark 3D Triangulation */}
      {overlayMode === 'landmarks' && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] p-4 flex flex-col justify-between z-20">
          <div className="flex justify-between items-center bg-black/80 px-2 py-1 rounded border border-cyan-500/40 text-[9px] font-mono">
            <span className="text-cyan-300 font-bold">3D BIOMETRIC FACIAL MESH INTERROGATION</span>
            <span className="text-cyan-400">68 CANONICAL LANDMARKS</span>
          </div>

          <div className="relative w-full h-40 flex items-center justify-center">
            {/* Triangulated face SVG wireframe */}
            <svg className="w-36 h-36 text-cyan-400" viewBox="0 0 100 100" fill="none">
              {/* Outer jawline */}
              <path d="M25 35 Q50 90 75 35" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" />
              {/* Eye nodes */}
              <circle cx="36" cy="40" r="3" fill="#00f0ff" />
              <circle cx="64" cy="40" r="3" fill="#00f0ff" />
              {/* Eyebrows */}
              <line x1="28" y1="34" x2="44" y2="34" stroke="#00f0ff" strokeWidth="1.5" />
              <line x1="56" y1="34" x2="72" y2="34" stroke="#00f0ff" strokeWidth="1.5" />
              {/* Nose bridge & tip */}
              <line x1="50" y1="36" x2="50" y2="56" stroke="#8b5cf6" strokeWidth="1.5" />
              <circle cx="50" cy="56" r="2.5" fill="#8b5cf6" />
              <circle cx="44" cy="58" r="1.5" fill="#8b5cf6" />
              <circle cx="56" cy="58" r="1.5" fill="#8b5cf6" />
              {/* Lips */}
              <polygon points="40,68 50,65 60,68 50,73" stroke="#38bdf8" strokeWidth="1" fill="rgba(56,189,248,0.2)" />
              {/* Triangulation vectors */}
              <line x1="36" y1="40" x2="50" y2="56" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
              <line x1="64" y1="40" x2="50" y2="56" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
              <line x1="50" y1="56" x2="40" y2="68" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
              <line x1="50" y1="56" x2="60" y2="68" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-[8px] font-mono text-slate-300 bg-slate-900/90 px-2 py-1 rounded border border-slate-700">
            <span>PUPIL DISTANCE: 63.8mm</span>
            <span>POSE: PITCH -1.2° / YAW +0.8°</span>
            <span className="text-emerald-400 font-bold">LIVENESS PASS</span>
          </div>
        </div>
      )}

      {/* Overlay: QR Code Decode verification */}
      {overlayMode === 'qr' && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] p-4 flex flex-col justify-between z-20">
          <div className="flex justify-between items-center bg-black/80 px-2 py-1 rounded border border-cyan-500/40 text-[9px] font-mono">
            <span className="text-cyan-300 font-bold">CRYPTOGRAPHIC QR PAYLOAD DECODER</span>
            <span className="text-emerald-400">RSA-2048 / SHA-256</span>
          </div>

          <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[9px] text-slate-300 space-y-1.5 my-auto">
            <div className="text-slate-400 text-[8px]">DIGITAL SIGNATURE HASH:</div>
            <div className="text-cyan-400 break-all text-[8px] bg-slate-900 p-1.5 rounded border border-cyan-500/30">
              SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[8px]">
              <div>ISSUER: <span className="text-white">CENTRAL ID AUTHORITY</span></div>
              <div>ALGORITHM: <span className="text-white">PKCS#1 v1.5</span></div>
              <div>REED-SOLOMON: <span className="text-emerald-400">LEVEL H (30% RESTORE)</span></div>
              <div>OCR CROSS-CHECK: <span className="text-emerald-400 font-bold">PARITY 100%</span></div>
            </div>
          </div>

          <div className="flex justify-between text-[8px] font-mono text-slate-400">
            <span>EMBEDDED METADATA CONFIRMED</span>
            <span>PUBLIC KEY #49281-AUTH</span>
          </div>
        </div>
      )}

      {/* Small corner label indicating Synthetic Prototype */}
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[7px] font-mono text-slate-400 pointer-events-none z-30">
        SYNTHETIC PLACEHOLDER DOCUMENT • DEMO
      </div>
    </div>
  );
}
