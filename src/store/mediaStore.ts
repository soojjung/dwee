'use client';
import { create } from 'zustand';
import { mediaRepo, ensureMigrations } from '@/data';

interface MediaState {
  homeHeroUrl: string | null;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  setHomeHero: (blob: Blob) => Promise<void>;
  clearHomeHero: () => Promise<void>;
}

function swapUrl(prev: string | null, next: string | null): string | null {
  if (prev && prev !== next) URL.revokeObjectURL(prev);
  return next;
}

export const useMediaStore = create<MediaState>()((set, get) => ({
  homeHeroUrl: null,
  hydrated: false,
  loading: false,
  error: null,

  async hydrate() {
    set({ loading: true, error: null });
    try {
      await ensureMigrations();
      const blob = await mediaRepo.getHomeHero();
      const heroUrl = blob ? URL.createObjectURL(blob) : null;
      set({
        homeHeroUrl: swapUrl(get().homeHeroUrl, heroUrl),
        hydrated: true,
        loading: false,
      });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  async setHomeHero(blob) {
    try {
      await mediaRepo.setHomeHero(blob);
      const url = URL.createObjectURL(blob);
      set({ homeHeroUrl: swapUrl(get().homeHeroUrl, url) });
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  async clearHomeHero() {
    try {
      await mediaRepo.clearHomeHero();
      set({ homeHeroUrl: swapUrl(get().homeHeroUrl, null) });
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },
}));
