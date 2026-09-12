import React, { useState } from 'react';
import { BatchJob, VerdictType, ScreeningResult } from '../types';
import { INITIAL_BATCH_JOBS, DEMO_PRESETS } from '../data/mockData';
import { audioFeedback } from '../utils/audioFeedback';
import { 
  Layers, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Download, 
  Search, 
  Filter, 
  ArrowRight, 
  Cpu, 
  FileText, 
  TrendingUp, 
  Zap, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface BatchScreeningStudioProps {
  onInspectDocument?: (result: ScreeningResult) => void;
  onInspectJob?: (result: ScreeningResult) => void;
}

export function BatchScreeningStudio({ onInspectDocument, onInspectJob }: BatchScreeningStudioProps) {
  const triggerInspect = onInspectJob || onInspectDocument;
  const [jobs, setJobs] = useState<BatchJob[]>(INITIAL_BATCH_JOBS);
  const [isBatchRunning, setIsBatchRunning] = useState<boolean>(false);
  const [filterVerdict, setFilterVerdict] = useState<'ALL' | 'LEGIT' | 'SUSPECT' | 'FAKE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const completedJobs = jobs.filter((j) => j.status === 'completed');
  const legitCount = jobs.filter((j) => j.verdict === 'LEGIT').length;
  const suspectCount = jobs.filter((j) => j.verdict === 'SUSPECT').length;
  const fakeCount = jobs.filter((j) => j.verdict === 'FAKE').length;
  const avgLatency = Math.round(
    jobs.reduce((acc, curr) => acc + (curr.processingTimeMs || 480), 0) / (jobs.length || 1)
  );
  const stpRate = Math.round((legitCount / (jobs.length || 1)) * 100);

  // Run full concurrent batch pipeline
  const handleRunBatch = () => {
    setIsBatchRunning(true);
    audioFeedback.playScanStart();

    // Reset jobs to analyzing
    setJobs((prev) =>
      prev.map((j) => ({
        ...j,
        status: 'analyzing',
        progress: 10,
      }))
    );

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setJobs((prev) =>
        prev.map((j, idx) => {
          const newProgress = Math.min(100, j.progress + 20 + (idx % 3) * 5);
          const isDone = newProgress >= 100;
          return {
            ...j,
            progress: newProgress,
            status: isDone ? 'completed' : 'analyzing',
          };
        })
      );

      if (step >= 5) {
        clearInterval(interval);
        setIsBatchRunning(false);
        audioFeedback.playSuccess();
      }
    }, 400);
  };

  const handleExportCsv = () => {
    audioFeedback.playClick();
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Job ID,Applicant,Document Type,Verdict,Score,Processing (ms),Flags']
        .concat(
          jobs.map(
            (j) =>
              `${j.id},"${j.applicant}",${j.docType},${j.verdict || 'N/A'},${j.score || 0},${
                j.processingTimeMs || 0
              },${j.flagsCount || 0}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TruthLens_Batch_Triage_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleRowInspect = (job: BatchJob) => {
    audioFeedback.playClick();
    const presetKey = job.verdict === 'FAKE' ? 'tampered' : job.verdict === 'SUSPECT' ? 'suspect' : 'legit';
    const baseResult = DEMO_PRESETS[presetKey].resultData;

    const customResult: ScreeningResult = {
      ...baseResult,
      id: job.id,
      documentType: job.docType,
      fileName: job.filename,
      trustScore: job.score || baseResult.trustScore,
      verdict: job.verdict || baseResult.verdict,
    };

    if (triggerInspect) {
      triggerInspect(customResult);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterVerdict !== 'ALL' && job.verdict !== filterVerdict) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        job.applicant.toLowerCase().includes(q) ||
        job.filename.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.docType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Controls & KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">BATCH VOLUME</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-black text-white">{jobs.length}</span>
            <span className="text-xs text-slate-400 font-mono">Dossiers</span>
          </div>
          <div className="mt-2 text-[11px] text-cyan-300 font-mono flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>Concurrent Engine Ready</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">STP APPROVAL RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">{stpRate}%</span>
            <span className="text-xs text-slate-400 font-mono">Straight-Thru</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-300 font-mono">
            {legitCount} of {jobs.length} Auto-Cleared
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">ANOMALY DETECTIONS</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-black text-red-400">
              {fakeCount + suspectCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">Flagged</span>
          </div>
          <div className="mt-2 text-[11px] text-red-300 font-mono">
            {fakeCount} Forgeries • {suspectCount} Suspect
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">AVG PIPELINE SPEED</span>
            <Cpu className="w-4 h-4 text-violet-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-black text-violet-300">{avgLatency}ms</span>
            <span className="text-xs text-slate-400 font-mono">per file</span>
          </div>
          <div className="mt-2 text-[11px] text-violet-300 font-mono">
            5 Forensic Layers Active
          </div>
        </div>
      </div>

      {/* Action Bar: Run Batch, Filter & Export */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Trigger & Export Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunBatch}
            disabled={isBatchRunning}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
              isBatchRunning
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]'
            }`}
            id="btn-run-concurrent-batch"
          >
            {isBatchRunning ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Processing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                <span>Run Concurrent Batch Triage</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            id="btn-export-batch-csv"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Right: Search & Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicant or file..."
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 w-48 sm:w-56 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-mono">
            {(['ALL', 'LEGIT', 'SUSPECT', 'FAKE'] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setFilterVerdict(v);
                  audioFeedback.playClick();
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filterVerdict === v
                    ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Batch Jobs Table */}
      <div className="bg-slate-900/70 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Batch ID</th>
                <th className="py-3 px-4">Applicant & File</th>
                <th className="py-3 px-4">Doc Type</th>
                <th className="py-3 px-4">Trust Score</th>
                <th className="py-3 px-4">Verdict</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredJobs.map((job) => {
                const isLegit = job.verdict === 'LEGIT';
                const isSuspect = job.verdict === 'SUSPECT';
                const isFake = job.verdict === 'FAKE';

                return (
                  <tr
                    key={job.id}
                    className="hover:bg-cyan-500/5 transition-colors cursor-pointer group"
                    onClick={() => handleRowInspect(job)}
                  >
                    <td className="py-3.5 px-4 font-bold text-cyan-400">
                      {job.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-semibold">{job.applicant}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{job.filename}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {job.docType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${
                          (job.score || 0) >= 80 ? 'text-emerald-400' : (job.score || 0) >= 50 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {job.score}/100
                        </span>
                        <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5 hidden sm:block">
                          <div
                            className={`h-full ${
                              (job.score || 0) >= 80 ? 'bg-emerald-400' : (job.score || 0) >= 50 ? 'bg-amber-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${job.score || 0}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isLegit
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                          : isSuspect
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                          : 'bg-red-950/60 text-red-300 border-red-500/40'
                      }`}>
                        {isLegit && <ShieldCheck className="w-3 h-3" />}
                        {isSuspect && <AlertTriangle className="w-3 h-3" />}
                        {isFake && <ShieldAlert className="w-3 h-3" />}
                        {job.verdict}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {job.processingTimeMs}ms
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowInspect(job);
                        }}
                        className="p-1.5 rounded-lg bg-slate-950 group-hover:bg-cyan-400 group-hover:text-black border border-slate-700 text-cyan-400 transition-all cursor-pointer"
                        title="Open in Multi-Spectral Workbench"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
