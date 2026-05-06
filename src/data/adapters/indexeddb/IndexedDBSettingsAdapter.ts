import { get, set } from 'idb-keyval';
import type { UserSettings } from '@/types';
import { DEFAULT_USER_SETTINGS } from '@/types/userSettings';
import type { SettingsRepository } from '../../repositories/SettingsRepository';
import { STORAGE_KEYS } from './keys';

export const indexedDBSettingsAdapter: SettingsRepository = {
  async get() {
    const stored = await get<Partial<UserSettings>>(STORAGE_KEYS.settings);
    return { ...DEFAULT_USER_SETTINGS, ...stored };
  },
  async update(patch) {
    const stored = await get<Partial<UserSettings>>(STORAGE_KEYS.settings);
    const next: UserSettings = { ...DEFAULT_USER_SETTINGS, ...stored, ...patch };
    await set(STORAGE_KEYS.settings, next);
    return next;
  },
};
