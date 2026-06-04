'use client';
import { useT } from '@/i18n/useT';

export function HomeQuote() {
  const t = useT();
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col items-start gap-1">
      <span className="bg-brand-pink50 px-1.5 py-0.5 text-lg font-semibold leading-tight text-brand-gray900">
        {t.home.quote.line1}
      </span>
      <span className="bg-brand-pink50 px-1.5 py-0.5 text-lg font-semibold leading-tight text-brand-gray900">
        {t.home.quote.line2}
      </span>
      <span className="mt-1 bg-brand-gray900 px-2 py-0.5 text-sm text-brand-pink50">
        {t.home.quote.author}
      </span>
    </div>
  );
}
