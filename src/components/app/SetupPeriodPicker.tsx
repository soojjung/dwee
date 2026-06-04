'use client';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useT } from '@/i18n/useT';
import { useSettingsStore } from '@/store/settingsStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { fromISO } from '@/lib/date';
import { calendarGrid } from '@/lib/date/calendarGrid';
import type { PeriodLog } from '@/types';

interface SetupPeriodPickerProps {
  today: string;
  periods: PeriodLog[];
  onAdd: (startDate: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onDone: () => void;
}

const WEEKDAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

export function SetupPeriodPicker({
  today,
  periods,
  onAdd,
  onRemove,
  onDone,
}: SetupPeriodPickerProps) {
  const t = useT();
  const locale = useSettingsStore((s) => s.settings.locale);
  const todayDate = fromISO(today);
  const [view, setView] = useState({
    year: todayDate.getFullYear(),
    monthIndex: todayDate.getMonth(),
  });
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const sortedPeriods = useMemo(
    () => [...periods].sort((a, b) => b.startDate.localeCompare(a.startDate)),
    [periods],
  );
  const periodStartSet = useMemo(() => new Set(periods.map((p) => p.startDate)), [periods]);

  const cells = useMemo(() => calendarGrid(view.year, view.monthIndex, 0), [view]);
  const busy = adding || removingId !== null;
  const headerText =
    locale === 'ko'
      ? format(new Date(view.year, view.monthIndex, 1), 'yyyy년 M월', { locale: ko })
      : format(new Date(view.year, view.monthIndex, 1), 'MMMM yyyy');

  function shiftMonth(delta: number) {
    setView(({ year, monthIndex }) => {
      const next = new Date(year, monthIndex + delta, 1);
      return { year: next.getFullYear(), monthIndex: next.getMonth() };
    });
  }

  async function handlePick(date: string) {
    if (date > today || busy) return;
    if (periodStartSet.has(date)) return;
    setAdding(true);
    await onAdd(date);
    setAdding(false);
  }

  async function handleRemove(id: string) {
    if (busy) return;
    setRemovingId(id);
    await onRemove(id);
    setRemovingId(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-sm text-neutral-600">{t.home.startPeriodPrompt}</p>

      <div className="rounded-lg border border-brand-gray300 bg-brand-white p-3">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            aria-label={t.calendar.previousMonth}
            onClick={() => shiftMonth(-1)}
            disabled={busy}
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-gray900 transition-colors hover:bg-brand-gray300 disabled:opacity-50"
          >
            ‹
          </button>
          <span className="text-sm font-semibold text-brand-gray900">{headerText}</span>
          <button
            type="button"
            aria-label={t.calendar.nextMonth}
            onClick={() => shiftMonth(1)}
            disabled={busy}
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-gray900 transition-colors hover:bg-brand-gray300 disabled:opacity-50"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-[10px] text-brand-gray600">
          {WEEKDAY_KEYS.map((k) => (
            <span key={k} className="py-1">
              {t.calendar.weekdays[k]}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((c) => {
            const date = fromISO(c.date);
            const isFuture = c.date > today;
            const isToday = c.date === today;
            const isPicked = periodStartSet.has(c.date);
            const disabled = isFuture || busy || isPicked;
            return (
              <button
                key={c.date}
                type="button"
                onClick={() => handlePick(c.date)}
                disabled={disabled}
                className={cn(
                  'flex h-9 items-center justify-center rounded-full text-sm transition-colors',
                  !c.inCurrentMonth && 'text-brand-gray400',
                  c.inCurrentMonth && !isPicked && 'text-brand-gray900 hover:bg-brand-gray300',
                  isPicked && 'bg-brand-pink100 font-medium text-brand-pink900',
                  isToday && !isPicked && 'ring-1 ring-brand-gray600',
                  isFuture && 'cursor-not-allowed opacity-40 hover:bg-transparent',
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {sortedPeriods.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {sortedPeriods.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-lg bg-brand-pink50 px-4 py-3"
            >
              <span className="text-sm font-medium text-brand-pink900">
                {formatRow(p.startDate, locale)}
              </span>
              <button
                type="button"
                aria-label={t.home.setupRemove}
                disabled={removingId === p.id}
                onClick={() => handleRemove(p.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-brand-pink900 transition-colors hover:bg-brand-pink100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink200 disabled:opacity-50"
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <Button variant="primary" size="md" fullWidth disabled={busy} onClick={onDone}>
        {t.home.setupDone}
      </Button>
    </div>
  );
}

function formatRow(iso: string, locale: 'ko' | 'en'): string {
  const d = fromISO(iso);
  return locale === 'ko' ? format(d, 'yyyy년 M월 d일', { locale: ko }) : format(d, 'MMM d, yyyy');
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill="currentColor">
      <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
    </svg>
  );
}
