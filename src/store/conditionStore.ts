'use client';
import { create } from 'zustand';
import { conditionRepo, ensureMigrations } from '@/data';
import type { NewConditionInput } from '@/data';
import type { DailyConditionLog } from '@/types';

interface ConditionState {
  byDate: Record<string, DailyConditionLog>;
  hydratedRange: { from: string; to: string } | null;
  loading: boolean;
  error: string | null;
  hydrateRange: (fromDate: string, toDate: string) => Promise<void>;
  rehydrate: () => Promise<void>;
  upsert: (input: NewConditionInput) => Promise<DailyConditionLog | null>;
  getByDate: (date: string) => DailyConditionLog | null;
}

export const useConditionStore = create<ConditionState>()((set, get) => ({
  byDate: {},
  hydratedRange: null,
  loading: false,
  error: null,

  async hydrateRange(fromDate, toDate) {
    set({ loading: true, error: null });
    try {
      await ensureMigrations();
      const logs = await conditionRepo.range(fromDate, toDate);
      const map: Record<string, DailyConditionLog> = {};
      for (const log of logs) map[log.date] = log;
      set({
        byDate: { ...get().byDate, ...map },
        hydratedRange: { from: fromDate, to: toDate },
        loading: false,
      });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  async rehydrate() {
    const range = get().hydratedRange;
    set({ byDate: {}, hydratedRange: null });
    if (range) await get().hydrateRange(range.from, range.to);
  },

  async upsert(input) {
    try {
      const log = await conditionRepo.upsert(input);
      set({ byDate: { ...get().byDate, [log.date]: log } });
      return log;
    } catch (e) {
      set({ error: (e as Error).message });
      return null;
    }
  },

  getByDate(date) {
    return get().byDate[date] ?? null;
  },
}));
