'use client';
import { useT } from '@/i18n/useT';
import { useSettingsStore } from '@/store/settingsStore';
import { PageContainer } from '@/components/ui/PageContainer';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import type { Locale } from '@/types';

export default function SettingsPage() {
  const t = useT();
  const locale = useSettingsStore((s) => s.settings.locale);
  const update = useSettingsStore((s) => s.update);

  const localeChoices = [
    { value: 'ko' as Locale, label: t.settings.languageKo },
    { value: 'en' as Locale, label: t.settings.languageEn },
  ];

  return (
    <PageContainer className="gap-6">
      <h1 className="text-xl font-medium text-neutral-900">{t.settings.title}</h1>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-500">{t.settings.language}</p>
        <ChoiceGroup
          ariaLabel={t.settings.language}
          value={locale}
          onChange={(v) => update({ locale: v })}
          choices={localeChoices}
        />
      </div>
    </PageContainer>
  );
}
