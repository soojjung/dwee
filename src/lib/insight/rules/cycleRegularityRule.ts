import type { Insight } from '@/types';
import type { InsightContext } from '../generator';
import { averageCycleLength } from '@/domain/cycle/aggregate';

export function cycleRegularityRule(ctx: InsightContext): Insight[] | null {
  const avg = averageCycleLength(ctx.periods);
  if (avg === null) return null;
  return [
    {
      id: 'cycle_regularity',
      kind: 'cycle_regularity',
      title: '최근 주기 패턴',
      body: `최근 평균 주기는 약 ${avg}일로 추정돼요. 참고용으로만 봐주세요.`,
      confidence: ctx.periods.length >= 4 ? 'high' : 'medium',
    },
  ];
}
