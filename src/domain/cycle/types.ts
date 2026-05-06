import type { Confidence } from '@/types';

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'unknown';

export interface CyclePrediction {
  predictedDate: string | null;
  confidence: Confidence;
}

export interface PhaseEstimate {
  phase: CyclePhase;
  confidence: Confidence;
}
