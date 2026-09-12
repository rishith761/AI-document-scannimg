import React, { useState } from 'react';
import { EngineSettings } from '../types';
import { audioFeedback } from '../utils/audioFeedback';
import { 
  Sliders, 
  X, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Cpu, 
  Fingerprint, 
  QrCode, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface EngineSettingsModalProps {
  settings: EngineSettings;
  onSave: (newSettings: EngineSettings) => void;
  onClose: () => void;
}

export function EngineSettingsModal({ settings, onSave, onClose }: EngineSettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<EngineSettings>({ ...settings });

  const handleApplyPreset = (profile: 'strict' | 'standard' | 'relaxed') => {
    audioFeedback.playClick();
    if (profile === 'strict') {
      setLocalSettings({
        autoClearanceThreshold: 88,
        hardRejectThreshold: 50,
        elaSensitivityMultiplier: 1.5,
        biometricStrictness: 'high_security',
        requireQrCryptographicSignature: true,
        audioFeedbackEnabled: localSettings.audioFeedbackEnabled,
      });
    } else if (profile === 'standard') {
      setLocalSettings({
        autoClearanceThreshold: 80,
        hardRejectThreshold: 40,
        elaSensitivityMultiplier: 1.0,
        biometricStrictness: 'standard',
        requireQrCryptographicSignature: true,
        audioFeedbackEnabled: localSettings.audioFeedbackEnabled,
      });
    } else {
      setLocalSettings({
        autoClearanceThreshold: 70,
        hardRejectThreshold: 30,
        elaSensitivityMultiplier: 0.7,
        biometricStrictness: 'relaxed',
        requireQrCryptographicSignature: false,
        audioFeedbackEnabled: localSettings.audioFeedbackEnabled,
      });
    }
  };

  const handleSave = () => {
    audioFeedback.playSuccess();
    audioFeedback.setMuted(!localSettings.audioFeedbackEnabled);
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden font-mono">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Engine Calibration & Risk Thresholds
            </span>
          </div>
          <button
            onClick={() => {
              audioFeedback.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs text-slate-200">
          
          {/* Quick Preset Profiles */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-bold">
              Rapid Compliance Profiles
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('strict')}
                className="p-2.5 rounded-xl border border-red-500/30 bg-red-950/20 hover:bg-red-950/40 text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-red-300">Border Strict</div>
                <div className="text-[9px] text-slate-400 mt-0.5">88+ Pass • 50 Reject</div>
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('standard')}
                className="p-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/50 text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-cyan-300">FinTech KYC</div>
                <div className="text-[9px] text-slate-400 mt-0.5">80+ Pass • 40 Reject</div>
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('relaxed')}
                className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-left transition-all cursor-pointer"
              >
                <div className="font-bold text-emerald-300">High Throughput</div>
                <div className="text-[9px] text-slate-400 mt-0.5">70+ Pass • 30 Reject</div>
              </button>
            </div>
          </div>

          {/* Threshold Sliders */}
          <div className="space-y-4 bg-slate-950/80 p-4 rounded-2xl border border-white/5">
            
            {/* Auto-Clearance */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-semibold">Auto-Clearance Threshold (Straight-Through):</span>
                <span className="text-emerald-400 font-bold">{localSettings.autoClearanceThreshold}/100</span>
              </div>
              <input
                type="range"
                min={60}
                max={95}
                value={localSettings.autoClearanceThreshold}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, autoClearanceThreshold: Number(e.target.value) })
                }
                className="w-full accent-emerald-400 cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Cases with score ≥ {localSettings.autoClearanceThreshold} are approved instantly without human review.
              </span>
            </div>

            {/* Hard Reject */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-semibold">Hard Reject Threshold (Direct Block):</span>
                <span className="text-red-400 font-bold">{localSettings.hardRejectThreshold}/100</span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                value={localSettings.hardRejectThreshold}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, hardRejectThreshold: Number(e.target.value) })
                }
                className="w-full accent-red-400 cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Cases with score ≤ {localSettings.hardRejectThreshold} are terminated as confirmed forgeries.
              </span>
            </div>

            {/* ELA Sensitivity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-semibold">ELA Pixel Multiplier:</span>
                <span className="text-cyan-400 font-bold">{localSettings.elaSensitivityMultiplier}x</span>
              </div>
              <input
                type="range"
                min={5}
                max={20}
                step={1}
                value={Math.round(localSettings.elaSensitivityMultiplier * 10)}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    elaSensitivityMultiplier: Number(e.target.value) / 10,
                  })
                }
                className="w-full accent-cyan-400 cursor-pointer h-1.5"
              />
            </div>

          </div>

          {/* Biometric & QR Rules */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
              <div>
                <div className="font-bold text-white">Biometric Strictness</div>
                <div className="text-[10px] text-slate-400">Enforces 3D pupil gaze and GAN diffusion penalties</div>
              </div>
              <select
                value={localSettings.biometricStrictness}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    biometricStrictness: e.target.value as any,
                  })
                }
                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="relaxed">Relaxed (Passes 60%+)</option>
                <option value="standard">Standard (Passes 80%+)</option>
                <option value="high_security">High Security (95%+)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
              <div>
                <div className="font-bold text-white">Require Cryptographic QR Signature</div>
                <div className="text-[10px] text-slate-400">Blocks documents missing digital public key parity</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    requireQrCryptographicSignature: !localSettings.requireQrCryptographicSignature,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  localSettings.requireQrCryptographicSignature ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    localSettings.requireQrCryptographicSignature ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Audio Telemetry Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  {localSettings.audioFeedbackEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Interactive Audio Telemetry</span>
                </div>
                <div className="text-[10px] text-slate-400">Synthesizes Web Audio scanning frequencies & alerts</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    audioFeedbackEnabled: !localSettings.audioFeedbackEnabled,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  localSettings.audioFeedbackEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    localSettings.audioFeedbackEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                audioFeedback.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-1.5 cursor-pointer"
              id="save-calibration-btn"
            >
              <Check className="w-4 h-4" />
              <span>Apply Calibration</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
