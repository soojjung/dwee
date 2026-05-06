export type Confidence = 'low' | 'medium' | 'high' | 'unknown';

export type InsightKind =
  | 'cycle_regularity'
  | 'cycle_phase'
  | 'pain_pattern'
  | 'mood_trend'
  | 'data_needed';

export interface Insight {
  id: string;
  kind: InsightKind;
  title: string;
  body: string;
  confidence: Confidence;
}
