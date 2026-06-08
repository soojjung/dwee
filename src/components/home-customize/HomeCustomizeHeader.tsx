import Link from 'next/link';
import { useT } from '@/i18n/useT';

export function HomeCustomizeHeader() {
  const t = useT();
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 bg-brand-gray50 px-4 py-3">
      <Link
        href="/"
        aria-label={t.home.customize.back}
        className="-ml-1 flex h-10 w-10 items-center justify-center text-brand-gray900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gray900 focus-visible:ring-offset-2"
      >
        <BackIcon />
      </Link>
      <h1 className="text-xl font-semibold text-brand-gray900">{t.home.customize.title}</h1>
    </header>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
    </svg>
  );
}
