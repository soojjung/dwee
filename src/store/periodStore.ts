'use client';
import { create } from 'zustand';
import { periodRepo, ensureMigrations } from '@/data';
import type { NewPeriodInput } from '@/data';
import type { PeriodLog } from '@/types';
import { averageCycleLength } from '@/domain/cycle/aggregate';

interface PeriodState {
  periods: PeriodLog[];
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  add: (input: NewPeriodInput) => Promise<PeriodLog | null>;
  update: (id: string, patch: Partial<Omit<PeriodLog, 'id' | 'createdAt'>>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const usePeriodStore = create<PeriodState>()((set, get) => ({
  periods: [],
  hydrated: false,
  loading: false,
  error: null,

  async hydrate() {
    set({ loading: true, error: null });
    try {
      await ensureMigrations();
      const periods = await periodRepo.list();
      set({ periods, hydrated: true, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  async add(input) {
    try {
      const log = await periodRepo.add(input);
      set({ periods: [...get().periods, log] });
      return log;
    } catch (e) {
      set({ error: (e as Error).message });
      return null;
    }
  },

  async update(id, patch) {
    try {
      const next = await periodRepo.update(id, patch);
      if (!next) return;
      set({ periods: get().periods.map((p) => (p.id === id ? next : p)) });
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  async remove(id) {
    try {
      await periodRepo.remove(id);
      set({ periods: get().periods.filter((p) => p.id !== id) });
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },
}));

export const selectAverageCycleLength = (s: PeriodState): number | null =>
  averageCycleLength(s.periods);
