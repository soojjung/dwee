'use client';
import Link from 'next/link';
import { useT } from '@/i18n/useT';
import { cn } from '@/lib/cn';
import type { PhotoCount, PhotoSlot } from '@/domain/home/decor';

interface PhotoSlotPickerProps {
  count: PhotoCount;
  urls: (string | null)[];
  onSlotPick: (slot: PhotoSlot) => void;
}

export function PhotoSlotPicker({ count, urls, onSlotPick }: PhotoSlotPickerProps) {
  const t = useT();
  const slots: PhotoSlot[] = count === 1 ? [0] : count === 2 ? [0, 1] : [0, 1, 2, 3];
  const wrapperClass = cn(
    'grid h-full w-full',
    count === 2 && 'grid-rows-2 gap-px bg-brand-gray400',
    count === 4 && 'grid-cols-2 grid-rows-2 gap-px bg-brand-gray400',
  );
  const allFilled = slots.every((s) => urls[s]);

  return (
    <div className="mt-6 space-y-6">
      <div className="flex aspect-[358/190] w-full items-center justify-center overflow-hidden rounded-2xl bg-brand-gray300">
        <div className="aspect-square h-full">
          <div className={wrapperClass}>
            {slots.map((slot) => (
              <SlotCell
                key={slot}
                slot={slot}
                url={urls[slot] ?? null}
                onClick={onSlotPick}
                ariaLabel={t.home.customize.photo.addSlotAriaLabel}
              />
            ))}
          </div>
        </div>
      </div>
      {allFilled ? (
        <Link
          href="/home/customize/edit-photos"
          className="flex items-center justify-center gap-2 rounded-2xl bg-brand-gray300 py-4 text-sm font-medium text-brand-gray900 transition-colors hover:bg-brand-gray400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gray900 focus-visible:ring-offset-2"
        >
          <CropIcon />
          {t.home.customize.photo.editButton}
        </Link>
      ) : null}
    </div>
  );
}

interface SlotCellProps {
  slot: PhotoSlot;
  url: string | null;
  onClick: (slot: PhotoSlot) => void;
  ariaLabel: string;
}

function SlotCell({ slot, url, onClick, ariaLabel }: SlotCellProps) {
  if (url) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-brand-gray300">
        <img src={url} alt="" aria-hidden className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onClick(slot)}
      aria-label={ariaLabel}
      className="relative block h-full w-full overflow-hidden bg-brand-gray300 transition-colors hover:bg-brand-gray400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gray900"
    >
      <span className="absolute inset-0 flex items-center justify-center text-brand-gray600">
        <PlusIcon />
      </span>
    </button>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CropIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 1v11a1 1 0 001 1h11M1 4h11a1 1 0 011 1v11" />
    </svg>
  );
}
