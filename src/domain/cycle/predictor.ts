import type { PeriodLog, UserSettings } from '@/types';
import type { CyclePrediction } from './types';
import { addDaysISO } from '@/lib/date';
import { averageCycleLength } from './aggregate';

export function predictNextPeriod(periods: PeriodLog[], settings: UserSettings): CyclePrediction {
  if (periods.length === 0) {
    return { predictedDate: null, confidence: 'unknown' };
  }
  const sorted = [...periods].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const last = sorted[sorted.length - 1]!.startDate;
  const observedAvg = averageCycleLength(periods);
  const cycle = observedAvg ?? settings.averageCycleLength;
  const confidence: CyclePrediction['confidence'] =
    periods.length >= 4 && observedAvg !== null
      ? 'high'
      : periods.length >= 2 && observedAvg !== null
        ? 'medium'
        : 'low';
  return { predictedDate: addDaysISO(last, cycle), confidence };
}
