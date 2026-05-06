import type { DailyConditionLog } from '@/types';

export type NewConditionInput = Omit<DailyConditionLog, 'id' | 'createdAt'>;

export interface ConditionRepository {
  getByDate(date: string): Promise<DailyConditionLog | null>;
  upsert(input: NewConditionInput): Promise<DailyConditionLog>;
  range(fromDate: string, toDate: string): Promise<DailyConditionLog[]>;
}
