'use client';
import { useState } from 'react';
import { useT } from '@/i18n/useT';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface AddPeriodFabProps {
  today: string;
  onSubmit: (startDate: string) => Promise<void>;
}

export function AddPeriodFab({ today, onSubmit }: AddPeriodFabProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(today);
  const [submitting, setSubmitting] = useState(false);

  const disabled = submitting || !date || date > today;

  function openDialog() {
    setDate(today);
    setOpen(true);
  }

  function closeDialog() {
    if (submitting) return;
    setOpen(false);
  }

  async function handleSave() {
    setSubmitting(true);
    await onSubmit(date);
    setSubmitting(false);
    setOpen(false);
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 mx-auto flex w-full max-w-md justify-end px-5">
        <button
          type="button"
          aria-label={t.home.startPeriodButton}
          onClick={openDialog}
          className={cn(
            'pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full',
            'bg-brand-gray900 text-brand-white shadow-[0_4px_12px_0_rgba(0,0,0,0.18)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-button focus-visible:ring-offset-2',
          )}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 4v12M4 10h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 px-5 pb-8 sm:items-center sm:pb-0"
          onClick={closeDialog}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-brand-white p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-base font-medium text-brand-gray900">
              {t.home.startPeriodPrompt}
            </p>
            <input
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              className="mt-4 h-11 w-full rounded-lg border border-brand-gray300 bg-brand-white px-3 text-base text-brand-gray900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-button focus-visible:ring-offset-1"
            />
            <div className="mt-5 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                disabled={disabled}
                onClick={handleSave}
              >
                {t.home.startPeriodSave}
              </Button>
              <Button
                variant="ghost"
                size="md"
                fullWidth
                disabled={submitting}
                onClick={closeDialog}
              >
                {t.home.cancel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
