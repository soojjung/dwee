import type { Insight } from '@/types';
import type { InsightContext } from '../generator';

export function dataNeededRule(ctx: InsightContext): Insight[] | null {
  if (ctx.periods.length >= 2) return null;
  return [
    {
      id: 'data_needed',
      kind: 'data_needed',
      title: '아직 기록이 적어요',
      body: '두 번 이상 생리 시작일을 기록하면 패턴 추정을 시작해요.',
      confidence: 'unknown',
    },
  ];
}
