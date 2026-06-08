'use client';
import { useT } from '@/i18n/useT';
import { cn } from '@/lib/cn';

interface HomeCustomizeFooterProps {
  enabled: boolean;
  onSubmit: () => void;
}

export function HomeCustomizeFooter({ enabled, onSubmit }: HomeCustomizeFooterProps) {
  const t = useT();
  return (
    <footer
      className={cn(
        'mt-10 px-4 pb-8 pt-5 transition-colors',
        enabled ? 'bg-brand-gray900' : 'bg-brand-gray400',
      )}
    >
      <button
        type="button"
        disabled={!enabled}
        onClick={onSubmit}
        className={cn(
          'block w-full text-center text-xl font-semibold transition-colors',
          enabled ? 'text-brand-white' : 'cursor-default text-brand-gray200',
        )}
      >
        {t.home.customize.submit}
      </button>
    </footer>
  );
}
