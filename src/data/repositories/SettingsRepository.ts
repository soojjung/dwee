import type { UserSettings } from '@/types';

export interface SettingsRepository {
  get(): Promise<UserSettings>;
  update(patch: Partial<UserSettings>): Promise<UserSettings>;
}
