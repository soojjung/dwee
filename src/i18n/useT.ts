'use client';
import { useSettingsStore } from '@/store/settingsStore';
import { dictionaries } from './index';
import type { Dictionary } from './index';

export function useT(): Dictionary {
  const locale = useSettingsStore((s) => s.settings.locale);
  return dictionaries[locale];
}
