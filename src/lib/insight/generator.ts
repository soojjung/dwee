import type { PeriodLog, DailyConditionLog, UserSettings, Insight } from '@/types';
import { cycleRegularityRule } from './rules/cycleRegularityRule';
import { dataNeededRule } from './rules/dataNeededRule';

export interface InsightContext {
  today: string;
  periods: PeriodLog[];
  conditions: DailyConditionLog[];
  settings: UserSettings;
}

export function generateInsights(ctx: InsightContext): Insight[] {
  const rules = [dataNeededRule, cycleRegularityRule];
  return rules.flatMap((rule) => rule(ctx) ?? []);
}
