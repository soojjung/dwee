import type { Locale } from '@/types';

// Primary target market is US (en-US). Korean opt-in only when device explicitly reports ko.
export function detectInitialLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  return navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}
