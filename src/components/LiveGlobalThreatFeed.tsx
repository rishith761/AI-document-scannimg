import React, { useState, useEffect } from 'react';
import { ThreatFeedEvent, ScreeningResult } from '../types';
import { GLOBAL_THREAT_EVENTS, DEMO_PRESETS } from '../data/mockData';
import { audioFeedback } from '../utils/audioFeedback';
import { 
  Radio, 
  Globe, 
  ShieldAlert, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Plus, 
  Zap, 
  ExternalLink 
} from 'lucide-react';

interface LiveGlobalThreatFeedProps {
  onInspectEvent: (result: ScreeningResult) => void;
}

export function LiveGlobalThreatFeed({ onInspectEvent }: LiveGlobalThreatFeedProps) {
  const [events, setEvents] = useState<ThreatFeedEvent[]>(GLOBAL_THREAT_EVENTS);

  // Trigger simulated streaming threat
  const handleSimulateNewThreat = () => {
    audioFeedback.playAlert();
    const cityList = [
      'Tokyo Haneda Int’l e-Gate #12',
      'Zurich Private Banking Ingress',
      'New York JFK Terminal 4 Border Node',
      'Sydney Airport Automated SmartGate',
      'São Paulo Digital Identity API Gateway',
    ];
    const docTypes: ('Passport' | 'Aadhaar' | 'PAN' | 'Voter ID')[] = ['Passport', 'Aadhaar', 'PAN'];
    const selectedCity = cityList[Math.floor(Math.random() * cityList.length)];
    const selectedDoc = docTypes[Math.floor(Math.random() * docTypes.length)];

    const newEvt: ThreatFeedEvent = {
      id: `EVT-${Math.floor(8000 + Math.random() * 1000)}`,
      timestamp: 'Just now',
      location: selectedCity,
      documentType: selectedDoc,
      score: 18 + Math.floor(Math.random() * 15),
      verdict: 'FAKE',
      flagSummary: 'Diffusion GAN Hairline Splice & Microprint Quantization Discontinuity',
      flagSeverity: 'critical',
    };

    setEvents((prev) => [newEvt, ...prev.slice(0, 7)]);
  };

  const handleInspect = (evt: ThreatFeedEvent) => {
    audioFeedback.playClick();
    const presetKey = evt.verdict === 'FAKE' ? 'tampered' : evt.verdict === 'SUSPECT' ? 'suspect' : 'legit';
    const base = DEMO_PRESETS[presetKey].resultData;

    const inspectedResult: ScreeningResult = {
      ...base,
      id: evt.id,
      documentType: evt.documentType,
      fileName: `${evt.documentType.toLowerCase()}_flagged_ingress.jpg`,
      trustScore: evt.score,
      verdict: evt.verdict,
      verdictSummary: `${evt.flagSummary} detected at ${evt.location}.`,
    };

    onInspectEvent(inspectedResult);
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              GLOBAL IDENTITY THREAT RADAR
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">
              Real-time telemetry stream from international border checkpoints and enterprise KYC nodes.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateNewThreat}
          className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          id="btn-simulate-threat"
        >
          <Zap className="w-3.5 h-3.5 text-red-400 animate-bounce" />
          <span>Simulate Live Ingress Anomaly</span>
        </button>
      </div>

      {/* Events Stream List */}
      <div className="space-y-2">
        {events.map((evt) => {
          const isCritical = evt.flagSeverity === 'critical';
          const isWarning = evt.flagSeverity === 'warning';

          return (
            <div
              key={evt.id}
              onClick={() => handleInspect(evt)}
              className="p-3 rounded-xl bg-slate-950/70 border border-white/5 hover:border-cyan-500/40 hover:bg-slate-950 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              {/* Left Details */}
              <div className="flex items-start sm:items-center gap-3">
                <div className={`p-2 rounded-lg shrink-0 border ${
                  isCritical 
                    ? 'bg-red-950/60 border-red-500/40 text-red-400' 
                    : isWarning 
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-400' 
                    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                }`}>
                  {isCritical ? <ShieldAlert className="w-4 h-4" /> : isWarning ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-xs">{evt.id}</span>
                    <span className="text-slate-500 text-[10px]">•</span>
                    <span className="text-cyan-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                      {evt.location}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {evt.documentType}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-1 font-sans">
                    {evt.flagSummary}
                  </p>
                </div>
              </div>

              {/* Right: Score & Inspect Trigger */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <div className="text-right">
                  <div className={`text-xs font-black ${
                    evt.score >= 80 ? 'text-emerald-400' : evt.score >= 50 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {evt.score}/100
                  </div>
                  <div className="text-[10px] text-slate-500">{evt.timestamp}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInspect(evt);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 group-hover:bg-cyan-400 group-hover:text-black border border-slate-700 text-cyan-400 transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
