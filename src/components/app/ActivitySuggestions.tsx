'use client';
import { useT } from '@/i18n/useT';
import type { CyclePhase } from '@/domain/cycle/types';

interface ActivitySuggestionsProps {
  phase: CyclePhase;
}

export function ActivitySuggestions({ phase }: ActivitySuggestionsProps) {
  const t = useT();
  const block = t.home.activities[phase];

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-2xl font-semibold text-brand-gray900">{t.home.activitiesTitle}</h3>
      <p className="text-xs text-brand-gray600">{t.home.activitiesDraftNote}</p>
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium text-brand-gray900">{block.category}</p>
        <ul className="ml-5 list-disc text-base leading-relaxed text-brand-gray800">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
