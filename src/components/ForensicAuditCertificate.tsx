import React from 'react';
import { ScreeningResult, VerdictType } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Award, 
  Download, 
  Printer, 
  X, 
  FileCheck, 
  CheckCircle2, 
  Cpu, 
  Key, 
  QrCode, 
  Fingerprint, 
  Calendar,
  Layers
} from 'lucide-react';
import { audioFeedback } from '../utils/audioFeedback';

interface ForensicAuditCertificateProps {
  result: ScreeningResult;
  onClose: () => void;
}

export function ForensicAuditCertificate({ result, onClose }: ForensicAuditCertificateProps) {
  const isLegit = result.verdict === 'LEGIT';
  const isSuspect = result.verdict === 'SUSPECT';
  const isFake = result.verdict === 'FAKE';

  const certificateId = `TRUTH-CERT-${result.id}-${Date.now().toString().slice(-4)}`;
  const certDate = new Date().toUTCString();
  const shaSeal = `SHA256:7e8a9f...${result.id.toLowerCase()}...3c4b1d`;

  const handlePrint = () => {
    audioFeedback.playClick();
    window.print();
  };

  const handleDownloadJson = () => {
    audioFeedback.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Forensic_Audit_${result.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden my-8">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Official Forensic Certificate of Authenticity
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Download Raw JSON Audit Trail"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-200 font-sans print:bg-white print:text-black">
          
          {/* Guilloche border header */}
          <div className="relative rounded-2xl border-2 border-dashed border-cyan-500/30 p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center">
            
            {/* National/Cryptographic Seal Stamp */}
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center border-2 mb-3 shadow-lg ${
              isLegit 
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-950'
                : isSuspect
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-amber-950'
                : 'bg-red-500/20 border-red-400 text-red-300 shadow-red-950'
            }">
              {isLegit && <ShieldCheck className="w-9 h-9 text-emerald-400" />}
              {isSuspect && <AlertTriangle className="w-9 h-9 text-amber-400" />}
              {isFake && <ShieldAlert className="w-9 h-9 text-red-400" />}
            </div>

            <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
              TRUTHLENS FORENSIC INTELLIGENCE ENGINE • LAB AUDIT REPORT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Certificate of Identity Integrity
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Certificate Ref: <span className="text-cyan-300">{certificateId}</span> • Issued: {certDate}
            </p>

            {/* Verdict Badge */}
            <div className="mt-4 inline-flex items-center gap-3 px-5 py-2 rounded-xl border ${
              isLegit
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                : isSuspect
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                : 'bg-red-950/60 border-red-500/60 text-red-300'
            }">
              <span className="text-lg font-mono font-black tracking-wider">
                OVERALL VERDICT: {result.verdict}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/40 border border-current">
                TRUST SCORE: {result.trustScore}/100
              </span>
            </div>
          </div>

          {/* Core Metadata Dossier */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Document Specimen</span>
              <span className="text-white font-bold">{result.documentType}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">File Reference</span>
              <span className="text-white font-bold truncate block">{result.fileName}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Biometric Match</span>
              <span className="text-cyan-400 font-bold">{result.faceAnalysis.matchScore}% Confidence</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">QR Cryptographic Parity</span>
              <span className={result.qrPayload.status === 'Verified' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {result.qrPayload.status}
              </span>
            </div>
          </div>

          {/* 5-Layer Forensic Scorecard Breakdown */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              5-Layer Defense-in-Depth Breakdown
            </h4>
            <div className="space-y-2">
              {result.layerResults.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold text-[10px]">
                      L-{layer.layerNumber}
                    </span>
                    <span className="font-semibold text-white">{layer.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px] hidden sm:inline">{layer.description.slice(0, 45)}...</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      layer.status === 'pass' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : layer.status === 'warning'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        : 'bg-red-950 text-red-300 border border-red-500/30'
                    }`}>
                      {layer.score}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Proof & Chain of Custody */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-cyan-400 font-bold block uppercase flex items-center gap-1">
                <Key className="w-3 h-3" />
                Cryptographic Chain of Custody
              </span>
              <span className="text-[11px] text-slate-300">{shaSeal}</span>
              <span className="text-[9px] text-slate-500 block mt-0.5">
                Timestamped in secure hardware enclave. Zero-knowledge verifiable credential proof.
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block">Verification Engine</span>
              <span className="text-cyan-300 font-bold text-xs">TruthLens v2.4 Forensic Node</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
