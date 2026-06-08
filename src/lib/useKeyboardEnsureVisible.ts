'use client';
import { useEffect, type RefObject } from 'react';

export function useKeyboardEnsureVisible(
  ref: RefObject<HTMLElement | null>,
  marginPx: number,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vv = window.visualViewport;
    if (!vv) return;

    let attached = false;

    function adjust() {
      const target = ref.current;
      if (!target || !vv) return;
      const rect = target.getBoundingClientRect();
      const desired = vv.height - marginPx;
      const overflow = rect.bottom - desired;
      if (overflow > 0) {
        window.scrollBy({ top: overflow, behavior: 'smooth' });
      }
    }

    function onFocus() {
      adjust();
      if (!attached) {
        vv?.addEventListener('resize', adjust);
        attached = true;
      }
    }

    function onBlur() {
      if (attached && vv) {
        vv.removeEventListener('resize', adjust);
        attached = false;
      }
    }

    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);
    return () => {
      el.removeEventListener('focus', onFocus);
      el.removeEventListener('blur', onBlur);
      if (attached && vv) vv.removeEventListener('resize', adjust);
    };
  }, [ref, marginPx]);
}
