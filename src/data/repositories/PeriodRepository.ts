import type { PeriodLog } from '@/types';

export interface NewPeriodInput {
  startDate: string;
  endDate?: string;
}

export interface PeriodRepository {
  list(): Promise<PeriodLog[]>;
  add(input: NewPeriodInput): Promise<PeriodLog>;
  update(
    id: string,
    patch: Partial<Omit<PeriodLog, 'id' | 'createdAt'>>,
  ): Promise<PeriodLog | null>;
  remove(id: string): Promise<void>;
}
