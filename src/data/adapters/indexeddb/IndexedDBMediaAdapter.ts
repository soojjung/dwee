import { get, set, del } from 'idb-keyval';
import type { MediaRepository } from '../../repositories/MediaRepository';
import { STORAGE_KEYS } from './keys';

export const indexedDBMediaAdapter: MediaRepository = {
  async getHomeHero() {
    return (await get<Blob>(STORAGE_KEYS.mediaHomeHero)) ?? null;
  },
  async setHomeHero(blob: Blob) {
    await set(STORAGE_KEYS.mediaHomeHero, blob);
  },
  async clearHomeHero() {
    await del(STORAGE_KEYS.mediaHomeHero);
  },
};
