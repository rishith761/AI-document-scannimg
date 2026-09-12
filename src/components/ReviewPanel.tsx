import React, { useState } from 'react';
import { ScreeningCase, VerdictType, ReviewStatus } from '../types';
import { SyntheticDocumentPreview } from './SyntheticDocumentPreview';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  X, 
  CheckCircle, 
  ArrowUpRight, 
  FolderArchive,
  UserCheck,
  AlertCircle,
  FileText
} from 'lucide-react';

interface ReviewPanelProps {
  cases: ScreeningCase[];
  onUpdateCaseStatus: (caseId: string, newStatus: ReviewStatus, notes?: string) => void;
  initialSelectedCaseId?: string | null;
}

export function ReviewPanel({ cases, onUpdateCaseStatus, initialSelectedCaseId }: ReviewPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | VerdictType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(initialSelectedCaseId || cases[0]?.id || null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const selectedCase = cases.find((c) => c.id === selectedCaseId);

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesFilter = selectedFilter === 'All' || c.verdict === selectedFilter;
    const matchesSearch = 
      c.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.docNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (caseId: string, status: ReviewStatus, label: string) => {
    onUpdateCaseStatus(caseId, status);
    setActionFeedback(`Case ${caseId} updated to "${label}"`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              HUMAN REVIEW QUEUE
            </span>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              Analyst Console
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Suspicious & Edge-Case Interrogation
          </h3>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {(['All', 'SUSPECT', 'FAKE', 'LEGIT'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                id={`filter-${filter.toLowerCase()}`}
              >
                {filter === 'All' ? 'All Cases' : filter}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, ID..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-40 sm:w-48 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {actionFeedback && (
        <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-200 text-xs font-mono flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>{actionFeedback} (Local State Updated)</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid: Cases List (Left) & Side Inspector Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cases List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCases.length === 0 ? (
            <div className="bg-slate-900/40 rounded-2xl p-8 border border-white/5 text-center text-slate-400 text-xs font-mono">
              No cases match the selected filter.
            </div>
          ) : (
            filteredCases.map((c) => {
              const isSelected = selectedCaseId === c.id;
              const isLegit = c.verdict === 'LEGIT';
              const isSuspect = c.verdict === 'SUSPECT';

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-slate-900/95 border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-cyan-500/20'
                      : 'bg-slate-900/40 border-white/5 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                  id={`case-card-${c.id.toLowerCase()}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white font-mono">{c.applicantName}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5">
                          {c.documentType}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        ID: {c.docNumber} • {c.uploadTime}
                      </div>
                    </div>

                    {/* Verdict Pill */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      isLegit 
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' 
                        : isSuspect 
                        ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' 
                        : 'bg-red-950/40 text-red-300 border-red-500/30'
                    }`}>
                      {c.verdict} ({c.trustScore})
                    </span>
                  </div>

                  {/* Risk Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.riskFlags.length === 0 ? (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded">
                        Clear • No Flags
                      </span>
                    ) : (
                      c.riskFlags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono bg-slate-950 px-2 py-0.5 rounded text-amber-300/90 border border-amber-500/20 truncate max-w-[200px]"
                        >
                          {flag}
                        </span>
                      ))
                    )}
                  </div>

                  {/* Status & Review State Footer */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="capitalize">
                      Status: <strong className="text-slate-200">{c.reviewStatus}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      Inspect Case <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Case Side Inspection Panel (7 cols) */}
        <div className="lg:col-span-7">
          {selectedCase ? (
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* Header: Case Overview & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                    <span>CASE DOSSIER #{selectedCase.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">{selectedCase.documentType}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {selectedCase.applicantName}
                  </h4>
                </div>

                {/* Review Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleAction(selectedCase.id, 'reviewed', 'Reviewed & Approved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    id="action-mark-reviewed"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mark Reviewed</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedCase.id, 'escalated', 'Escalated to Fraud Unit')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    id="action-escalate"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    <span>Escalate</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedCase.id, 'closed', 'Case Closed')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                    id="action-close-case"
                  >
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>Close Case</span>
                  </button>
                </div>
              </div>

              {/* Document Synthetic Preview */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Synthetic Document Visual:
                </span>
                <SyntheticDocumentPreview
                  documentType={selectedCase.documentType}
                  hasTampering={selectedCase.verdict === 'FAKE'}
                />
              </div>

              {/* Analyst Notes & Forensic Findings */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase block">
                  Analyst Assessment & History
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {selectedCase.analystNotes || 'No analyst notes logged yet.'}
                </p>
                {selectedCase.escalationReason && (
                  <div className="pt-2 text-xs font-mono text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Trigger: {selectedCase.escalationReason}</span>
                  </div>
                )}
              </div>

              {/* Extracted Fields Summary */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Field Correlation Table:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {selectedCase.extractedFields.slice(0, 4).map((f, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">{f.label}</span>
                      <span className="text-white font-semibold truncate block">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/40 rounded-2xl p-12 border border-white/5 text-center text-slate-400 text-xs font-mono">
              Select a case from the queue on the left to inspect forensic details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
