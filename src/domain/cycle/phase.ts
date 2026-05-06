import type { PeriodLog, UserSettings } from '@/types';
import type { PhaseEstimate } from './types';
import { daysBetween } from '@/lib/date';
import { averageCycleLength, averagePeriodLength } from './aggregate';

export function currentPhase(
  today: string,
  periods: PeriodLog[],
  settings: UserSettings,
): PhaseEstimate {
  if (periods.length === 0) return { phase: 'unknown', confidence: 'unknown' };
  const sorted = [...periods].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const last = sorted[sorted.length - 1]!;
  const dayInCycle = daysBetween(last.startDate, today);
  if (dayInCycle < 0) return { phase: 'unknown', confidence: 'low' };

  const cycle = averageCycleLength(periods) ?? settings.averageCycleLength;
  const periodLen = averagePeriodLength(periods) ?? settings.averagePeriodLength;
  const ovulationDay = cycle - 14;

  const phase: PhaseEstimate['phase'] =
    dayInCycle < periodLen
      ? 'menstrual'
      : dayInCycle < ovulationDay - 2
        ? 'follicular'
        : dayInCycle <= ovulationDay + 1
          ? 'ovulation'
          : dayInCycle < cycle
            ? 'luteal'
            : 'unknown';

  return { phase, confidence: periods.length >= 3 ? 'medium' : 'low' };
}
