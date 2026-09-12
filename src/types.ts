export type DocumentType = 'Aadhaar' | 'PAN' | 'Passport' | 'Voter ID';

export type VerdictType = 'LEGIT' | 'SUSPECT' | 'FAKE';

export type ReviewStatus = 'unreviewed' | 'reviewed' | 'escalated' | 'closed';

export type LayerStatus = 'pass' | 'warning' | 'fail' | 'unavailable';

export type MultiSpectralMode = 'standard' | 'ela' | 'landmarks' | 'qr' | 'uv' | 'ir' | 'split';

export interface ForensicAnnotation {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  label: string;
  severity: 'low' | 'medium' | 'critical';
  description: string;
  layer: string;
}

export interface LayerResult {
  id: string;
  layerNumber: string;
  name: string;
  category: 'forensics' | 'document' | 'face' | 'cross_ref' | 'fusion';
  score: number; // 0 - 100
  status: LayerStatus;
  impactScore: number; // e.g. -35 or 0 or +15
  description: string;
  subchecks: {
    label: string;
    passed: boolean;
    metric?: string;
  }[];
}

export interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  flagged?: boolean;
}

export interface ScreeningResult {
  id: string;
  documentType: DocumentType;
  expectedDocumentType?: DocumentType;
  detectedDocumentType?: string;
  documentTypeMismatch?: boolean;
  uploadedImageUrl?: string;
  fileName: string;
  fileSize: string;
  uploadTime: string;
  hasSelfie: boolean;
  selfieFileName?: string;
  trustScore: number; // 0 - 100
  verdict: VerdictType;
  verdictSummary: string;
  humanReviewRequired: boolean;
  riskFlags: string[];
  layerResults: LayerResult[];
  extractedFields: ExtractedField[];
  annotations?: ForensicAnnotation[];
  qrPayload: {
    detected: boolean;
    validChecksum: boolean;
    rawDigest?: string;
    matchedFieldsCount: number;
    totalFieldsCount: number;
    status: 'Verified' | 'Mismatch' | 'Unreadable' | 'Not Found';
  };
  faceAnalysis: {
    faceDetectedInDoc: boolean;
    faceDetectedInSelfie: boolean;
    livenessPassed: boolean;
    matchScore: number; // 0 - 100
    syntheticArtifactRisk: number; // 0 - 100
    status: 'High Match' | 'Mismatched' | 'Deepfake Suspect' | 'Selfie Omitted';
  };
  elaHeatmap: {
    tamperDetected: boolean;
    hotspotCount: number;
    varianceIndex: number;
    summary: string;
  };
}

export interface ScreeningCase extends ScreeningResult {
  applicantName: string;
  docNumber: string;
  reviewStatus: ReviewStatus;
  assignedAnalyst?: string;
  analystNotes?: string;
  escalationReason?: string;
}

export interface AnalysisStage {
  step: number;
  id: string;
  name: string;
  detail: string;
  iconName: string;
  color: string;
}

export interface DemoPreset {
  id: 'legit' | 'suspect' | 'tampered';
  label: string;
  documentType: DocumentType;
  expectedVerdict: VerdictType;
  expectedScore: number;
  badgeColor: string;
  description: string;
  resultData: ScreeningResult;
}

export interface EngineSettings {
  autoClearanceThreshold: number; // default: 80
  hardRejectThreshold: number; // default: 40
  elaSensitivityMultiplier: number; // 0.5 - 2.0
  biometricStrictness: 'relaxed' | 'standard' | 'high_security';
  requireQrCryptographicSignature: boolean;
  audioFeedbackEnabled: boolean;
}

export interface BatchJob {
  id: string;
  filename: string;
  applicant: string;
  docType: DocumentType;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  progress: number;
  verdict?: VerdictType;
  score?: number;
  processingTimeMs?: number;
  flagsCount?: number;
}

export interface ThreatFeedEvent {
  id: string;
  timestamp: string;
  location: string;
  documentType: DocumentType;
  score: number;
  verdict: VerdictType;
  flagSummary: string;
  flagSeverity: 'info' | 'warning' | 'critical';
}
