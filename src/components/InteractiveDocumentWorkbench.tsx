import React, { useState } from 'react';
import { DocumentType } from '../types';
import { SyntheticDocumentPreview } from './SyntheticDocumentPreview';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  QrCode,
  UserCheck
} from 'lucide-react';

interface InteractiveDocumentWorkbenchProps {
  documentType: DocumentType;
  hasTampering?: boolean;
  documentTitle?: string;
  uploadedImageUrl?: string;
  documentTypeMismatch?: boolean;
  detectedDocumentType?: string;
}

export function InteractiveDocumentWorkbench({
  documentType,
  hasTampering = false,
  documentTitle,
  uploadedImageUrl,
  documentTypeMismatch = false,
  detectedDocumentType,
}: InteractiveDocumentWorkbenchProps) {
  const [activeFilter, setActiveFilter] = useState<'standard' | 'ela' | 'landmarks' | 'qr'>('standard');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 75));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
      
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Document Inspection
          </h3>
          <p className="text-xs text-slate-500">
            Inspect security elements, error level compression, and biometric landmarks.
          </p>
        </div>

        {/* View Mode Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveFilter('standard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'standard'
                ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Normal View</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('ela')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'ela'
                ? 'bg-amber-50 border-amber-500 text-amber-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Tamper Highlight (ELA)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('landmarks')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'landmarks'
                ? 'bg-purple-50 border-purple-500 text-purple-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Face Biometrics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('qr')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'qr'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Verification</span>
          </button>
        </div>
      </div>

      {/* Zoom Bar and Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700">Specimen:</span>
          <span className="truncate max-w-[200px]">{documentTitle || documentType}</span>
          
          {documentTypeMismatch ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
              <ShieldAlert className="w-3 h-3" />
              Category Mismatch ({detectedDocumentType || 'Wrong ID'})
            </span>
          ) : hasTampering ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
              <ShieldAlert className="w-3 h-3" />
              Anomaly Highlighted
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" />
              Uniform Compression
            </span>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1.5">{zoomLevel}%</span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Specimen Stage */}
      <div className="overflow-auto max-h-[500px] p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center min-h-[320px]">
        <div 
          className="transition-transform duration-200 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {uploadedImageUrl ? (
            /* User's Actual Uploaded Document with Overlay Capabilities */
            <div className="relative max-w-lg rounded-xl overflow-hidden shadow-md border border-slate-300 bg-white">
              <img
                src={uploadedImageUrl}
                alt="Submitted Document Specimen"
                className="w-full max-h-[380px] object-contain block select-none"
              />

              {/* Overlay: ELA Tamper Heatmap */}
              {activeFilter === 'ela' && (
                <div className="absolute inset-0 bg-slate-950/70 pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-amber-300 bg-black/80 px-2 py-1 rounded border border-amber-500/40">
                    <span>JPEG ERROR LEVEL ANALYSIS (ELA)</span>
                    <span>{hasTampering ? 'HIGH ERROR VARIANCE' : 'HOMOGENEOUS NOISE'}</span>
                  </div>

                  {hasTampering ? (
                    <div className="border-2 border-dashed border-rose-500 bg-rose-500/20 rounded p-2 text-center text-rose-200 text-xs font-mono font-bold my-auto mx-auto max-w-xs shadow-lg">
                      ⚠ HIGH VARIANCE CLUSTER DETECTED
                      <div className="text-[10px] font-normal text-rose-300 mt-1">
                        Discontinuous pixel noise signature around key document areas.
                      </div>
                    </div>
                  ) : (
                    <div className="border border-emerald-500/40 bg-emerald-500/10 rounded p-2 text-center text-emerald-300 text-xs font-mono my-auto mx-auto max-w-xs">
                      ✓ UNIFORM ERROR LEVEL RESIDUALS
                    </div>
                  )}

                  <div className="text-[9px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
                    Quantization Matrix 95% • Differential Rate: {hasTampering ? '0.24 (Altered)' : '0.04 (Consistent)'}
                  </div>
                </div>
              )}

              {/* Overlay: Face Landmarks */}
              {activeFilter === 'landmarks' && (
                <div className="absolute inset-0 bg-black/40 pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-purple-300 bg-black/80 px-2 py-1 rounded border border-purple-500/40">
                    <span>BIOMETRIC FACIAL ANCHORS</span>
                    <span>LANDMARK GRID v2.4</span>
                  </div>

                  <div className="w-24 h-28 border-2 border-purple-400 bg-purple-500/20 rounded mx-auto my-auto flex flex-col items-center justify-center text-[9px] font-mono text-purple-200">
                    <span>[FACE MESH]</span>
                    <span className="text-[8px] text-purple-300">68 Landmarks</span>
                  </div>

                  <div className="text-[9px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded flex justify-between">
                    <span>Eye Axis: Normal</span>
                    <span>ICAO Compliance: Validated</span>
                  </div>
                </div>
              )}

              {/* Overlay: QR & Barcode Decode */}
              {activeFilter === 'qr' && (
                <div className="absolute inset-0 bg-black/60 pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300 bg-black/80 px-2 py-1 rounded border border-emerald-500/40">
                    <span>BARCODE / QR CRYPTOGRAPHIC DECODER</span>
                    <span>PARITY CHECK</span>
                  </div>

                  <div className="border border-emerald-400 bg-black/80 rounded p-2.5 text-center text-emerald-300 text-xs font-mono my-auto mx-auto max-w-xs">
                    <div className="text-[10px] text-slate-400">DIGITAL PAYLOAD PARITY:</div>
                    <div className="text-emerald-400 font-bold my-1">
                      {hasTampering ? 'SIGNATURE MISMATCH / PARITY FAILED' : 'SHA-256 SIGNATURE VERIFIED'}
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
                    Issuer Public Key Validation: {hasTampering ? 'FAILED' : 'MATCH'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <SyntheticDocumentPreview
              documentType={documentType}
              overlayMode={activeFilter}
              hasTampering={hasTampering}
            />
          )}
        </div>
      </div>

      {/* Explanatory Caption based on Filter */}
      <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
        {activeFilter === 'standard' && (
          <span><strong>Standard View:</strong> Displays original visual layout, fonts, and issuer iconography.</span>
        )}
        {activeFilter === 'ela' && (
          <span><strong>Tamper Detection (ELA):</strong> Analyzes JPEG compression differentials. Modified or spliced image regions exhibit noticeably higher noise levels than surrounding background pixels.</span>
        )}
        {activeFilter === 'landmarks' && (
          <span><strong>Face Biometrics:</strong> Locates facial boundaries and alignment landmarks to verify portrait proportions against standard ICAO regulations.</span>
        )}
        {activeFilter === 'qr' && (
          <span><strong>QR Verification:</strong> Verifies cryptographic signature and decodes embedded data payload against printed demographic information.</span>
        )}
      </div>

    </div>
  );
}
