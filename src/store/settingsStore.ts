'use client';
import { create } from 'zustand';
import { settingsRepo, ensureMigrations } from '@/data';
import type { UserSettings } from '@/types';
import { DEFAULT_USER_SETTINGS } from '@/types/userSettings';
import { detectInitialLocale } from '@/i18n/detectLocale';

interface SettingsState {
  settings: UserSettings;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  update: (patch: Partial<UserSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  settings: DEFAULT_USER_SETTINGS,
  hydrated: false,
  loading: false,
  error: null,

  async hydrate() {
    set({ loading: true, error: null });
    try {
      await ensureMigrations();
      let settings = await settingsRepo.get();
      // 첫 진입(온보딩 미완료)에 한해 디바이스 locale로 보정
      if (!settings.onboardingCompleted) {
        const detected = detectInitialLocale();
        if (detected !== settings.locale) {
          settings = await settingsRepo.update({ locale: detected });
        }
      }
      set({ settings, hydrated: true, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  async update(patch) {
    try {
      const next = await settingsRepo.update(patch);
      set({ settings: next });
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },
}));
