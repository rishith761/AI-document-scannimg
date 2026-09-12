import React, { useState } from 'react';
import { ScreeningResult } from '../types';
import { InteractiveDocumentWorkbench } from './InteractiveDocumentWorkbench';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  RotateCcw, 
  Copy, 
  Check, 
  Printer, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  FileText
} from 'lucide-react';

interface ResultsViewProps {
  result: ScreeningResult;
  onReset: () => void;
  onEscalateToReview?: (caseId: any) => void;
}

export function ResultsView({ result, onReset }: ResultsViewProps) {
  const [copiedJson, setCopiedJson] = useState(false);

  const isLegit = result.verdict === 'LEGIT';
  const isSuspect = result.verdict === 'SUSPECT';
  const isFake = result.verdict === 'FAKE';

  const handleCopyJson = () => {
    const payload = {
      screening_id: result.id,
      timestamp: new Date().toISOString(),
      document_type: result.documentType,
      expected_type: result.expectedDocumentType,
      detected_type: result.detectedDocumentType,
      type_mismatch: result.documentTypeMismatch,
      file_name: result.fileName,
      trust_score: result.trustScore,
      verdict: result.verdict,
      verdict_summary: result.verdictSummary,
      risk_flags: result.riskFlags,
      layers: result.layerResults.map(l => ({
        layer: l.layerNumber,
        name: l.name,
        score: l.score,
        status: l.status,
        description: l.description,
      })),
      extracted_fields: result.extractedFields,
      qr_status: result.qrPayload.status,
      face_status: result.faceAnalysis.status,
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* 0. Document Type Mismatch Notification Banner (if applicable) */}
      {result.documentTypeMismatch && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 sm:p-5 shadow-xs flex items-start gap-3.5 text-rose-900">
          <div className="w-8 h-8 rounded-full bg-rose-200/80 flex items-center justify-center shrink-0 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-950 text-sm sm:text-base">
                Critical Alert: Document Category Mismatch
              </span>
              <span className="text-[11px] font-semibold bg-rose-200 text-rose-800 px-2 py-0.5 rounded font-mono">
                FLAGGED
              </span>
            </div>
            <p className="text-rose-800 leading-relaxed">
              You selected <strong>{result.expectedDocumentType || result.documentType}</strong>, but the uploaded document was scanned and identified as an <strong>{result.detectedDocumentType || 'Aadhaar Card'}</strong>.
              Because the layout, template markings, and OCR fields do not match the expected format, this document failed authentication with a low trust score ({result.trustScore}/100).
            </p>
          </div>
        </div>
      )}

      {/* 1. Main Verdict Header Card */}
      <div className={`rounded-xl border p-6 shadow-xs ${
        isLegit
          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
          : isSuspect
          ? 'bg-amber-50/80 border-amber-200 text-amber-950'
          : 'bg-rose-50/80 border-rose-200 text-rose-950'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isLegit
                  ? 'bg-emerald-600 text-white'
                  : isSuspect
                  ? 'bg-amber-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}>
                {isLegit && <ShieldCheck className="w-4 h-4" />}
                {isSuspect && <AlertTriangle className="w-4 h-4" />}
                {isFake && <ShieldAlert className="w-4 h-4" />}
                <span>
                  {isLegit ? 'Original / Authentic Document' : isSuspect ? 'Suspect / Manual Review Required' : 'Counterfeit / Tampered / Mismatch'}
                </span>
              </span>

              <span className="text-xs bg-white/80 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded font-mono font-medium">
                ID: {result.id}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {result.verdictSummary}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600">
              Document: <strong>{result.fileName}</strong> • Detected: <strong>{result.detectedDocumentType || result.documentType}</strong> • Processed in 2.2s
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyJson}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              {copiedJson ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Check Another Document</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Visual Document Inspector Workbench */}
      <InteractiveDocumentWorkbench
        documentType={result.documentType}
        hasTampering={isFake || (isSuspect && result.elaHeatmap?.tamperDetected)}
        documentTitle={result.fileName}
        uploadedImageUrl={result.uploadedImageUrl}
        documentTypeMismatch={result.documentTypeMismatch}
        detectedDocumentType={result.detectedDocumentType}
      />

      {/* 3. Scores, Risk Flags & Detailed Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Overall Trust Score & Risk Flags (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Trust Score Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Overall Trust Score
            </span>

            <div className="my-2 flex items-baseline gap-1">
              <span className={`text-5xl font-extrabold font-mono ${
                isLegit ? 'text-emerald-600' : isSuspect ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {result.trustScore}
              </span>
              <span className="text-base text-slate-400 font-medium">/100</span>
            </div>

            {/* Score Bar */}
            <div className="w-full max-w-xs h-2.5 bg-slate-100 rounded-full overflow-hidden my-3">
              <div 
                className={`h-full rounded-full transition-all ${
                  isLegit ? 'bg-emerald-500' : isSuspect ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${result.trustScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              {isLegit
                ? 'High confidence rating. All forensic indicators align with genuine government standards.'
                : isSuspect
                ? 'Moderate confidence. Borderline inconsistencies found that warrant manual verification.'
                : 'Low confidence rating. Document exhibits severe indicators of mismatch, digital manipulation, or forgery.'}
            </p>
          </div>

          {/* Active Risk Flags Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Active Risk Flags ({result.riskFlags.length})
              </h3>
              <span className="text-xs text-slate-400">
                {result.riskFlags.length === 0 ? 'Clear' : 'Issues Found'}
              </span>
            </div>

            {result.riskFlags.length === 0 ? (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero anomalies flagged. Document conforms to all integrity checks.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {result.riskFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg text-xs bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 5-Layer Breakdown & Extracted Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 5-Layer Checks */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>5-Layer Security Check Breakdown</span>
              </h3>
              <span className="text-xs text-slate-400">Layer Scores</span>
            </div>

            <div className="space-y-4">
              {result.layerResults.map((layer) => {
                const isPass = layer.status === 'pass';
                const isWarning = layer.status === 'warning';

                const barColor = isPass 
                  ? 'bg-emerald-500' 
                  : isWarning 
                  ? 'bg-amber-500' 
                  : 'bg-rose-500';

                return (
                  <div key={layer.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                          {layer.layerNumber}
                        </span>
                        <span className="font-semibold text-slate-900">{layer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold font-mono ${
                          isPass ? 'text-emerald-700' : isWarning ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {layer.score}/100
                        </span>
                        <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded ${
                          isPass 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : isWarning 
                            ? 'bg-amber-50 text-amber-700' 
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {layer.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${barColor}`}
                        style={{ width: `${layer.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-normal">
                      {layer.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extracted OCR Information Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Extracted Document Data (OCR)</span>
              </h3>
              <span className="text-xs text-slate-400">Match Accuracy</span>
            </div>

            {result.extractedFields.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">
                No OCR fields could be extracted from this document image.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                      <th className="pb-2 font-medium">Field</th>
                      <th className="pb-2 font-medium">Extracted Text</th>
                      <th className="pb-2 text-right font-medium">Confidence</th>
                      <th className="pb-2 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.extractedFields.map((field, idx) => (
                      <tr key={idx} className={field.flagged ? 'bg-rose-50/50' : ''}>
                        <td className="py-2.5 font-medium text-slate-600">{field.label}</td>
                        <td className={`py-2.5 font-semibold ${field.flagged ? 'text-rose-700' : 'text-slate-900'}`}>
                          {field.value}
                        </td>
                        <td className="py-2.5 text-right font-mono text-slate-500">{field.confidence}%</td>
                        <td className="py-2.5 text-right">
                          {field.flagged ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                              Mismatch
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
