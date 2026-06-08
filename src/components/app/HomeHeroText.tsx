'use client';
import { cn } from '@/lib/cn';
import { useMediaStore } from '@/store/mediaStore';
import {
  DEFAULT_TEXT_ORDER,
  DEFAULT_TEXT_POSITION,
  type TextPosition,
} from '@/domain/home/decor';

const POSITION_CLASS: Record<TextPosition, string> = {
  topLeft: 'top-4 left-4 items-start',
  topRight: 'top-4 right-4 items-end',
  bottomLeft: 'bottom-4 left-4 items-start',
  bottomRight: 'bottom-4 right-4 items-end',
};

export function HomeHeroText() {
  const mainText = useMediaStore((s) => s.mainText);
  const subText = useMediaStore((s) => s.subText);
  const position = useMediaStore((s) => s.textPosition) ?? DEFAULT_TEXT_POSITION;
  const textOrder = useMediaStore((s) => s.textOrder) ?? DEFAULT_TEXT_ORDER;

  const mainLine = mainText.trim();
  const subLine = subText.trim();
  if (!mainLine && !subLine) return null;

  const mainSpans = mainLine
    ? splitLines(
        mainLine,
        'm',
        'bg-brand-pink50 px-1.5 py-0.5 text-lg font-semibold leading-tight text-brand-gray900',
      )
    : null;
  const subSpans = subLine
    ? splitLines(
        subLine,
        's',
        'bg-brand-gray900 px-2 py-0.5 text-sm text-brand-pink50',
      )
    : null;

  return (
    <div
      className={cn(
        'pointer-events-none absolute z-10 flex flex-col gap-1',
        POSITION_CLASS[position],
      )}
    >
      {textOrder === 'mainFirst' ? mainSpans : subSpans}
      {textOrder === 'mainFirst' ? subSpans : mainSpans}
    </div>
  );
}

function splitLines(text: string, prefix: string, classes: string) {
  return text.split('\n').map((line, i) => (
    <span key={`${prefix}-${i}`} className={classes}>
      {line || ' '}
    </span>
  ));
}
