import type { Locale } from '@/types';

export function detectInitialLocale(): Locale {
  if (typeof navigator === 'undefined') return 'ko';
  return navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}
