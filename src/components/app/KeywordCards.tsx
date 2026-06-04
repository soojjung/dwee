'use client';
import { useT } from '@/i18n/useT';
import { cn } from '@/lib/cn';
import type { CyclePhase } from '@/domain/cycle/types';

type KeywordTone = 'pink50' | 'dark' | 'gray' | 'pink100';

const TONES: ReadonlyArray<KeywordTone> = ['pink50', 'dark', 'gray', 'pink100'];

interface KeywordCardsProps {
  phase: CyclePhase;
}

export function KeywordCards({ phase }: KeywordCardsProps) {
  const t = useT();
  const items = t.home.keywords[phase];

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {items.map((item, i) => (
        <KeywordCard
          key={item.main}
          tone={TONES[i] ?? 'pink50'}
          subtitle={item.subtitle}
          main={item.main}
          emoji={item.emoji}
        />
      ))}
    </div>
  );
}

interface KeywordCardProps {
  tone: KeywordTone;
  subtitle: string;
  main: string;
  emoji: string;
}

function KeywordCard({ tone, subtitle, main, emoji }: KeywordCardProps) {
  const dark = tone === 'dark' || tone === 'gray';
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 rounded-2xl px-4 py-[23px]',
        toneClasses(tone),
      )}
    >
      <span className={cn('text-xs leading-snug', dark ? 'text-brand-white' : 'text-brand-gray900')}>
        {subtitle}
      </span>
      <span
        className={cn(
          'flex items-center gap-1 text-lg font-semibold',
          dark ? 'text-brand-white' : 'text-brand-gray900',
        )}
      >
        <span>{main}</span>
        <span aria-hidden>{emoji}</span>
      </span>
    </div>
  );
}

function toneClasses(tone: KeywordTone): string {
  switch (tone) {
    case 'pink50':
      return 'bg-brand-pink50 shadow-[inset_0_0_30px_0_rgba(255,255,255,0.7)]';
    case 'dark':
      return 'bg-brand-gray900 shadow-[inset_0_0_30px_0_rgba(240,238,239,0.7)]';
    case 'gray':
      return 'bg-brand-gray600 shadow-[inset_0_0_30px_0_rgba(240,238,239,0.8)]';
    case 'pink100':
      return 'bg-brand-pink100 shadow-[inset_0_0_30px_0_#fde2ef]';
  }
}
