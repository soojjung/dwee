import { cn } from '@/lib/cn';
import type { PhotoCount, PhotoSlot } from '@/domain/home/decor';

interface PhotoLayoutProps {
  count: PhotoCount;
  urls: string[];
  selectedSlot?: PhotoSlot | null;
  onSlotClick?: (slot: PhotoSlot) => void;
  slotAriaLabel?: string;
  selectedAriaLabel?: string;
}

export function PhotoLayout({
  count,
  urls,
  selectedSlot = null,
  onSlotClick,
  slotAriaLabel,
  selectedAriaLabel,
}: PhotoLayoutProps) {
  const slots: PhotoSlot[] = count === 1 ? [0] : count === 2 ? [0, 1] : [0, 1, 2, 3];
  const wrapperClass =
    count === 1
      ? 'grid h-full w-full'
      : count === 2
        ? 'grid h-full w-full grid-rows-2'
        : 'grid h-full w-full grid-cols-2 grid-rows-2';

  return (
    <div className={wrapperClass}>
      {slots.map((slot) => (
        <Slot
          key={slot}
          slot={slot}
          url={urls[slot]}
          isSelected={selectedSlot === slot}
          onClick={onSlotClick}
          slotAriaLabel={slotAriaLabel}
          selectedAriaLabel={selectedAriaLabel}
        />
      ))}
    </div>
  );
}

interface SlotProps {
  slot: PhotoSlot;
  url: string | undefined;
  isSelected: boolean;
  onClick?: (slot: PhotoSlot) => void;
  slotAriaLabel?: string;
  selectedAriaLabel?: string;
}

function Slot({ slot, url, isSelected, onClick, slotAriaLabel, selectedAriaLabel }: SlotProps) {
  if (!url) return <div aria-hidden />;
  const ring = isSelected ? 'ring-2 ring-inset ring-brand-pink200' : '';

  if (!onClick) {
    return (
      <div className={cn('relative h-full w-full overflow-hidden', ring)}>
        <img src={url} alt="" aria-hidden className="h-full w-full object-cover" />
      </div>
    );
  }

  const label = isSelected ? selectedAriaLabel : slotAriaLabel;
  return (
    <button
      type="button"
      onClick={() => onClick(slot)}
      aria-label={label}
      aria-pressed={isSelected}
      className={cn(
        'relative block h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink200 focus-visible:ring-offset-0',
        ring,
      )}
    >
      <img src={url} alt="" aria-hidden className="h-full w-full object-cover" />
    </button>
  );
}
