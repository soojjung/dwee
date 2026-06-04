'use client';
import { useEffect, useMemo, useState } from 'react';
import { useT } from '@/i18n/useT';
import { PageContainer } from '@/components/ui/PageContainer';
import { Toast } from '@/components/ui/Toast';
import { usePeriodStore } from '@/store/periodStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useConditionStore } from '@/store/conditionStore';
import { currentPhase } from '@/domain/cycle/phase';
import { predictNextPeriod } from '@/domain/cycle/predictor';
import { generateInsights } from '@/lib/insight/generator';
import { todayISO, daysBetween, addDaysISO } from '@/lib/date';
import { AddPeriodFab } from './AddPeriodFab';
import { SetupPeriodPicker } from './SetupPeriodPicker';
import { InsightCard } from './InsightCard';
import { WeekStrip } from './WeekStrip';
import { HomeHero } from './HomeHero';
import { TodayDateHeading } from './TodayDateHeading';
import { PhaseAdvicePill } from './PhaseAdvicePill';
import { KeywordCards } from './KeywordCards';
import { ActivitySuggestions } from './ActivitySuggestions';

const TOAST_MS = 2400;
const INSIGHT_LOOKBACK_DAYS = 90;

export function HomeScreen() {
  const t = useT();
  const today = todayISO();

  const periods = usePeriodStore((s) => s.periods);
  const periodsHydrated = usePeriodStore((s) => s.hydrated);
  const periodsLoading = usePeriodStore((s) => s.loading);
  const periodsError = usePeriodStore((s) => s.error);
  const hydratePeriods = usePeriodStore((s) => s.hydrate);
  const addPeriod = usePeriodStore((s) => s.add);
  const removePeriod = usePeriodStore((s) => s.remove);

  const settings = useSettingsStore((s) => s.settings);
  const settingsHydrated = useSettingsStore((s) => s.hydrated);
  const updateSettings = useSettingsStore((s) => s.update);

  const conditionMap = useConditionStore((s) => s.byDate);
  const hydrateRange = useConditionStore((s) => s.hydrateRange);

  const [toast, setToast] = useState<string | null>(null);
  // null until first hydration decides; once flipped to false, stays false for the session.
  const [setupMode, setSetupMode] = useState<boolean | null>(null);

  useEffect(() => {
    if (!periodsHydrated) hydratePeriods();
  }, [periodsHydrated, hydratePeriods]);

  useEffect(() => {
    if (!periodsHydrated) return;
    if (setupMode === null) setSetupMode(periods.length === 0);
  }, [periodsHydrated, periods.length, setupMode]);

  useEffect(() => {
    hydrateRange(addDaysISO(today, -INSIGHT_LOOKBACK_DAYS), today);
  }, [hydrateRange, today]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), TOAST_MS);
    return () => clearTimeout(id);
  }, [toast]);

  const conditions = useMemo(() => Object.values(conditionMap), [conditionMap]);

  const phase = useMemo(
    () => currentPhase(today, periods, settings),
    [today, periods, settings],
  );
  const prediction = useMemo(
    () => predictNextPeriod(periods, settings),
    [periods, settings],
  );
  const insights = useMemo(
    () => generateInsights({ today, periods, conditions, settings }),
    [today, periods, conditions, settings],
  );
  const homeInsights = useMemo(
    () => insights.filter((i) => i.kind !== 'cycle_regularity' && i.kind !== 'cycle_phase'),
    [insights],
  );

  const daysUntilNext = prediction.predictedDate
    ? daysBetween(today, prediction.predictedDate)
    : null;

  async function handleStartPeriod(startDate: string) {
    const created = await addPeriod({ startDate });
    if (!created) return;
    if (!settings.onboardingCompleted) {
      await updateSettings({ onboardingCompleted: true });
    }
  }

  if (!settingsHydrated || (periodsLoading && !periodsHydrated) || setupMode === null) {
    return (
      <PageContainer>
        <p className="text-sm text-neutral-500">{t.home.loadingLabel}</p>
      </PageContainer>
    );
  }
  if (periodsError) {
    return (
      <PageContainer>
        <p className="text-sm text-neutral-500">{t.home.errorLabel}</p>
      </PageContainer>
    );
  }

  if (setupMode) {
    return (
      <PageContainer className="gap-6">
        <HomeHero />
        <SetupPeriodPicker
          today={today}
          periods={periods}
          onAdd={handleStartPeriod}
          onRemove={removePeriod}
          onDone={() => setSetupMode(false)}
        />
        <Toast message={toast} />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="gap-6">
      <HomeHero />

      <TodayDateHeading date={today} />

      <WeekStrip
        today={today}
        periods={periods}
        predictedDate={prediction.predictedDate}
        daysUntilNext={daysUntilNext}
        averagePeriodLength={settings.averagePeriodLength}
      />

      <PhaseAdvicePill phase={phase.phase} />

      <section className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold text-brand-gray900">{t.home.keywordsTitle}</h3>
        <KeywordCards phase={phase.phase} />
      </section>

      <ActivitySuggestions phase={phase.phase} />

      {homeInsights.length > 0 ? (
        <section className="flex flex-col gap-3">
          {homeInsights.map((ins) => (
            <InsightCard key={ins.id} insight={ins} />
          ))}
        </section>
      ) : null}

      <Toast message={toast} />

      <AddPeriodFab today={today} onSubmit={handleStartPeriod} />
    </PageContainer>
  );
}
