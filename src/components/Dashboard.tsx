import React, { useState } from 'react';
import { ScreeningCase, ScreeningResult, ReviewStatus, EngineSettings } from '../types';
import { INITIAL_MOCK_CASES, DEMO_PRESETS } from '../data/mockData';
import { UploadWorkspace } from './UploadWorkspace';
import { ResultsView } from './ResultsView';
import { ReviewPanel } from './ReviewPanel';
import { BatchScreeningStudio } from './BatchScreeningStudio';
import { LiveGlobalThreatFeed } from './LiveGlobalThreatFeed';
import { EngineSettingsModal } from './EngineSettingsModal';
import { audioFeedback } from '../utils/audioFeedback';
import { 
  LayoutDashboard, 
  Scan, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  ArrowUpRight, 
  RotateCcw, 
  Layers, 
  Sliders, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Lock,
  Home,
  Layers3,
  Globe,
  Award,
  Zap
} from 'lucide-react';

interface DashboardProps {
  onReturnToLanding: () => void;
  initialPreset?: 'legit' | 'suspect' | 'tampered' | null;
}

export type DashboardTab = 'overview' | 'screenings' | 'batch' | 'threat-radar' | 'review' | 'insights' | 'settings';

export function Dashboard({ onReturnToLanding, initialPreset }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialPreset ? 'screenings' : 'screenings');
  const [screeningsSubMode, setScreeningsSubMode] = useState<'single' | 'batch'>('single');
  const [cases, setCases] = useState<ScreeningCase[]>(INITIAL_MOCK_CASES);
  const [activeResult, setActiveResult] = useState<ScreeningResult | null>(null);
  const [presetForWorkspace, setPresetForWorkspace] = useState<'legit' | 'suspect' | 'tampered' | null>(initialPreset || null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Engine Settings
  const [engineSettings, setEngineSettings] = useState<EngineSettings>({
    autoClearanceThreshold: 80,
    hardRejectThreshold: 40,
    elaSensitivityMultiplier: 1.0,
    biometricStrictness: 'standard',
    requireQrCryptographicSignature: true,
    audioFeedbackEnabled: true,
  });

  const handleTabChange = (tab: DashboardTab) => {
    audioFeedback.playClick();
    setActiveTab(tab);
  };

  // Update case review status in local state
  const handleUpdateCaseStatus = (caseId: string, newStatus: ReviewStatus, notes?: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            reviewStatus: newStatus,
            analystNotes: notes || (newStatus === 'reviewed' ? 'Approved by analyst.' : newStatus === 'escalated' ? 'Escalated to specialized fraud division.' : 'Case formally closed.'),
          };
        }
        return c;
      })
    );
  };

  // Add freshly screened result into cases list
  const handleScreeningComplete = (result: ScreeningResult) => {
    setActiveResult(result);
    // Also push to local cases queue if not already there
    const newCase: ScreeningCase = {
      ...result,
      applicantName: result.documentType === 'Passport' ? 'Alexander D. Chen' : result.documentType === 'PAN' ? 'Rajesh K. Verma' : 'Priya Sharma',
      docNumber: result.documentType === 'Passport' ? 'P892017441' : result.documentType === 'PAN' ? 'BNZPV4910K' : '4920 8812 0019',
      reviewStatus: result.humanReviewRequired ? 'unreviewed' : 'reviewed',
      assignedAnalyst: result.humanReviewRequired ? 'Pending triage' : 'Automated Clearance',
      analystNotes: result.verdictSummary,
    };
    setCases((prev) => [newCase, ...prev.filter((c) => c.id !== result.id)]);
  };

  // Inspect case from batch or threat radar
  const handleDirectInspect = (result: ScreeningResult) => {
    audioFeedback.playClick();
    setActiveResult(result);
    setActiveTab('screenings');
    setScreeningsSubMode('single');
  };

  // Stats calculation
  const totalScans = cases.length + 128;
  const suspectCount = cases.filter(c => c.verdict === 'SUSPECT').length + 14;
  const fakeCount = cases.filter(c => c.verdict === 'FAKE').length + 9;
  const legitCount = totalScans - suspectCount - fakeCount;

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950/80 border-r border-white/10 p-4 flex flex-col justify-between shrink-0 backdrop-blur-xl">
        <div className="space-y-6">
          {/* Brand Header */}
          <div 
            onClick={() => {
              audioFeedback.playClick();
              onReturnToLanding();
            }}
            className="flex items-center gap-3 cursor-pointer group px-2 py-1"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base tracking-tight font-mono text-white">
                Truth<span className="text-cyan-400">Lens</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">ENTERPRISE FORENSICS</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'screenings', label: 'Screenings', icon: Scan, badge: activeResult ? 'Active' : undefined },
              { id: 'batch', label: 'Batch Studio', icon: Layers3, badge: 'Pro' },
              { id: 'threat-radar', label: 'Global Threat Radar', icon: Globe, badge: 'Live' },
              { id: 'review', label: 'Human Review', icon: Users, badge: `${cases.filter(c => c.reviewStatus === 'unreviewed').length}` },
              { id: 'insights', label: 'Forensic Insights', icon: BarChart3 },
              { id: 'settings', label: 'Calibration & Thresholds', icon: Sliders },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as DashboardTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                  id={`sidebar-tab-${item.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      isActive ? 'bg-cyan-400 text-black font-bold' : item.badge === 'Live' ? 'bg-red-500/30 text-red-300 border border-red-500/40' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <button
            onClick={() => {
              audioFeedback.playClick();
              onReturnToLanding();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Return to Landing Page</span>
          </button>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 font-mono text-[10px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                GEMINI AI PIPELINE
              </span>
              <span className="text-emerald-400">READY</span>
            </div>
            <div>Clearance Rule: ≥{engineSettings.autoClearanceThreshold} pts</div>
            <div>Rejection Rule: ≤{engineSettings.hardRejectThreshold} pts</div>
          </div>
        </div>
      </aside>

      {/* 2. Main Console Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Bar */}
        <header className="h-16 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30">
          
          {/* Top Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dossiers, cases, or OCR text..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Top Bar Right: Calibration Trigger, Status, Notifications, Avatar */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Calibration Modal Button */}
            <button
              onClick={() => {
                audioFeedback.playClick();
                setIsSettingsModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all cursor-pointer shadow-sm"
              id="top-calibrate-btn"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Calibrate Engine</span>
            </button>

            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Spectral Engine Online</span>
            </div>

            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  setNotificationsOpen(!notificationsOpen);
                }}
                className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                id="top-notifications-btn"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-slate-900 border border-white/10 p-3 shadow-2xl z-50 font-mono text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-300 font-bold">
                    <span>Forensic Radar Alerts</span>
                    <span className="text-[10px] text-cyan-400">3 Unread</span>
                  </div>
                  <div className="divide-y divide-slate-800/60 py-1 max-h-60 overflow-y-auto">
                    <div className="py-2 space-y-0.5">
                      <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Suspect PAN Card Escalated</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Typographic drift detected on Rajesh Verma dossier.</div>
                    </div>
                    <div className="py-2 space-y-0.5">
                      <div className="text-red-400 font-semibold flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Critical Aadhaar Forgery Tripped</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Photo splice + DOB conflict with QR checksum.</div>
                    </div>
                    <div className="py-2 space-y-0.5">
                      <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Passport Tier-1 Approved</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Straight-through clearance for Alexander Chen.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px]">
                <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-cyan-300 text-xs font-bold font-mono">
                  TL
                </div>
              </div>
              <div className="hidden xl:block text-left font-mono">
                <div className="text-xs font-semibold text-white leading-tight">Forensic Ops</div>
                <div className="text-[10px] text-slate-400">Tier-3 Analyst</div>
              </div>
            </div>

          </div>
        </header>

        {/* Dashboard Main Workspace Area */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Main Title & Context Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                  {activeTab === 'overview' && 'Operational Command Overview'}
                  {activeTab === 'screenings' && 'Forensic Screening Console'}
                  {activeTab === 'batch' && 'Batch Screening Studio'}
                  {activeTab === 'threat-radar' && 'Global Identity Threat Radar'}
                  {activeTab === 'review' && 'Analyst Review Queue'}
                  {activeTab === 'insights' && 'Forensic Intelligence & Analytics'}
                  {activeTab === 'settings' && 'Risk Calibration & Engine Parameters'}
                </h1>
                <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm">
                  Active Session
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                Comprehensive 5-layer document forensic verification: multi-spectral loupe, ELA, facial biometrics, and cryptographic certificates.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  setActiveTab('screenings');
                  setActiveResult(null);
                  setScreeningsSubMode('single');
                }}
                className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                id="btn-new-scan"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>+ Single Screening</span>
              </button>
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  setActiveTab('batch');
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                id="btn-batch-studio"
              >
                <Layers3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Batch Studio</span>
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
                  <div className="text-xs font-mono text-slate-400">TOTAL PROCESSED</div>
                  <div className="text-3xl font-extrabold font-mono text-white mt-1">{totalScans}</div>
                  <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
                    <span>↑ +18% today</span> • <span>99.8% precision</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
                  <div className="text-xs font-mono text-slate-400">CLEARED (LEGIT)</div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">{legitCount}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Automated Tier-1 pass</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
                  <div className="text-xs font-mono text-slate-400">SUSPECT (HUMAN REVIEW)</div>
                  <div className="text-3xl font-extrabold font-mono text-amber-400 mt-1">{suspectCount}</div>
                  <div className="text-[11px] text-amber-300/80 mt-1">Borderline score (60-79)</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
                  <div className="text-xs font-mono text-slate-400">TAMPERED (REJECTED)</div>
                  <div className="text-3xl font-extrabold font-mono text-red-400 mt-1">{fakeCount}</div>
                  <div className="text-[11px] text-red-300/80 mt-1">Splice or checksum failure</div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Quick Launch Presets */}
                <div className="lg:col-span-4 bg-slate-900/60 rounded-2xl p-5 border border-white/10 space-y-4">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                    QUICK LAUNCH SPECIMENS
                  </span>
                  <div className="space-y-2.5">
                    {(['legit', 'suspect', 'tampered'] as const).map((presetKey) => {
                      const p = DEMO_PRESETS[presetKey];
                      return (
                        <div
                          key={presetKey}
                          onClick={() => {
                            audioFeedback.playClick();
                            setPresetForWorkspace(presetKey);
                            setActiveResult(null);
                            setActiveTab('screenings');
                            setScreeningsSubMode('single');
                          }}
                          className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                              {p.label}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{p.documentType} • Expected: {p.expectedVerdict}</div>
                          </div>
                          <span className="text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">Launch →</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Recent Screenings Summary */}
                <div className="lg:col-span-8 bg-slate-900/60 rounded-2xl p-5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      ACTIVE SCREENING DOSSIERS
                    </span>
                    <button
                      onClick={() => handleTabChange('review')}
                      className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      View All in Queue →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800/80">
                    {cases.slice(0, 4).map((c) => (
                      <div key={c.id} className="py-3 flex items-center justify-between text-xs font-mono">
                        <div>
                          <div className="font-bold text-white">{c.applicantName}</div>
                          <div className="text-[10px] text-slate-400">{c.documentType} • {c.uploadTime}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.verdict === 'LEGIT' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                            c.verdict === 'SUSPECT' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                            'bg-red-950 text-red-400 border border-red-500/30'
                          }`}>
                            {c.verdict} ({c.trustScore})
                          </span>
                          <button
                            onClick={() => handleDirectInspect(c)}
                            className="px-2 py-1 rounded bg-slate-900 hover:bg-cyan-400 hover:text-black text-cyan-400 border border-slate-700 text-[11px] cursor-pointer transition-all"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Global Threat Stream Preview in Overview */}
              <div className="pt-2">
                <LiveGlobalThreatFeed onInspectEvent={handleDirectInspect} />
              </div>

            </div>
          )}

          {/* TAB 2: SCREENINGS (Upload Workspace or Active Results View) */}
          {activeTab === 'screenings' && (
            <div className="animate-in fade-in duration-200 space-y-4">
              {/* Screening Mode Sub-Navigation */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-white/5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setScreeningsSubMode('single');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      screeningsSubMode === 'single'
                        ? 'bg-cyan-400 text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Single Document Analysis
                  </button>
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setScreeningsSubMode('batch');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      screeningsSubMode === 'batch'
                        ? 'bg-cyan-400 text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Batch Screening Studio
                  </button>
                </div>

                {activeResult && screeningsSubMode === 'single' && (
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setActiveResult(null);
                    }}
                    className="text-xs font-mono text-cyan-400 hover:underline px-2 cursor-pointer"
                  >
                    ← Upload Another Document
                  </button>
                )}
              </div>

              {screeningsSubMode === 'single' ? (
                activeResult ? (
                  <ResultsView
                    result={activeResult}
                    onReset={() => {
                      audioFeedback.playClick();
                      setActiveResult(null);
                    }}
                    onEscalateToReview={(caseId) => {
                      handleUpdateCaseStatus(caseId, 'escalated', 'Escalated from results inspector.');
                      setActiveTab('review');
                    }}
                  />
                ) : (
                  <UploadWorkspace
                    presetToLoad={presetForWorkspace}
                    onScreeningComplete={handleScreeningComplete}
                  />
                )
              ) : (
                <BatchScreeningStudio onInspectJob={handleDirectInspect} />
              )}
            </div>
          )}

          {/* TAB 3: BATCH STUDIO */}
          {activeTab === 'batch' && (
            <div className="animate-in fade-in duration-200">
              <BatchScreeningStudio onInspectJob={handleDirectInspect} />
            </div>
          )}

          {/* TAB 4: GLOBAL THREAT RADAR */}
          {activeTab === 'threat-radar' && (
            <div className="animate-in fade-in duration-200">
              <LiveGlobalThreatFeed onInspectEvent={handleDirectInspect} />
            </div>
          )}

          {/* TAB 5: HUMAN REVIEW */}
          {activeTab === 'review' && (
            <div className="animate-in fade-in duration-200">
              <ReviewPanel
                cases={cases}
                onUpdateCaseStatus={handleUpdateCaseStatus}
                initialSelectedCaseId={activeResult?.id}
              />
            </div>
          )}

          {/* TAB 6: INSIGHTS & ANALYTICS */}
          {activeTab === 'insights' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Anomaly Distribution */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                    ANOMALY TYPE PREVALENCE
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>JPEG Compression Disparity (ELA)</span>
                        <span>42%</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-[42%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Typographic Kerning Drift</span>
                        <span>28%</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-400 w-[28%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>QR Payload Checksum Conflict</span>
                        <span>19%</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[19%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Facial Deepfake / Diffusion Artifact</span>
                        <span>11%</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 w-[11%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pipeline Performance Metrics */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                    SYSTEM LATENCY PROFILE
                  </span>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Pre-processing & DPI</span>
                      <span className="text-white">45ms</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Pixel ELA & Resaving</span>
                      <span className="text-white">180ms</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">OCR & Document Topology</span>
                      <span className="text-white">140ms</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Biometric 3D Mesh</span>
                      <span className="text-white">110ms</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Cryptographic QR Decrypt</span>
                      <span className="text-white">45ms</span>
                    </div>
                    <div className="flex justify-between text-cyan-300 font-bold pt-1">
                      <span>Total End-to-End</span>
                      <span>520ms</span>
                    </div>
                  </div>
                </div>

                {/* Automation Efficacy */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                    STRAIGHT-THROUGH RATE
                  </span>
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-5xl font-extrabold font-mono text-emerald-400">
                      84.6%
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-2 text-center">
                      Auto-cleared without human analyst intervention
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-white/5 text-[11px] font-mono text-slate-300">
                    Average manual review triage duration: 1.4 minutes
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & CALIBRATION */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">
                      RISK CALIBRATION & ENGINE PARAMETERS
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      Tune automated thresholds, ELA sensitivity, and cryptographic policy for straight-through processing.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSettingsModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold font-mono text-xs hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Open Calibration Panel</span>
                  </button>
                </div>

                {/* Summary of Active Rules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <div className="text-slate-400 text-[11px]">AUTO-CLEARANCE THRESHOLD</div>
                    <div className="text-2xl font-bold text-emerald-400">{engineSettings.autoClearanceThreshold} pts</div>
                    <div className="text-[11px] text-slate-400">Cases scoring ≥{engineSettings.autoClearanceThreshold} pass without human triage.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <div className="text-slate-400 text-[11px]">HARD REJECT THRESHOLD</div>
                    <div className="text-2xl font-bold text-red-400">{engineSettings.hardRejectThreshold} pts</div>
                    <div className="text-[11px] text-slate-400">Cases scoring ≤{engineSettings.hardRejectThreshold} are terminated as confirmed forgeries.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <div className="text-slate-400 text-[11px]">ELA SENSITIVITY MULTIPLIER</div>
                    <div className="text-2xl font-bold text-cyan-400">{engineSettings.elaSensitivityMultiplier}x</div>
                    <div className="text-[11px] text-slate-400">Amplification factor applied to quantization compression artifacts.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <div className="text-slate-400 text-[11px]">BIOMETRIC STRICTNESS</div>
                    <div className="text-2xl font-bold text-violet-400 uppercase">{engineSettings.biometricStrictness}</div>
                    <div className="text-[11px] text-slate-400">Enforces gaze parity and GAN facial synthesis detection.</div>
                  </div>
                </div>

                {/* API Integration Endpoint */}
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 font-mono text-xs">
                  <span className="text-slate-400 block">PRODUCTION FASTAPI ROUTE:</span>
                  <div className="p-2.5 rounded-lg bg-black/80 border border-slate-800 text-cyan-300 select-all">
                    POST /api/v1/screen/document
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>

      </div>

      {/* Engine Calibration Settings Modal */}
      {isSettingsModalOpen && (
        <EngineSettingsModal
          settings={engineSettings}
          onSave={(newSettings) => setEngineSettings(newSettings)}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}

    </div>
  );
}
