'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useT } from '@/i18n/useT';
import { supabase } from '@/data/adapters/supabase/client';
import { useSettingsStore } from '@/store/settingsStore';
import { usePeriodStore } from '@/store/periodStore';
import { useConditionStore } from '@/store/conditionStore';
import { migrateLocalToRemote } from '@/data/migration/anonToRemote';

export function AuthCallbackScreen() {
  const t = useT();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // Supabase JS auto-extracts the session from the URL on import.
      // Wait briefly for it to settle, then read the resulting session.
      let session = (await supabase.auth.getSession()).data.session;
      if (!session) {
        await new Promise((r) => setTimeout(r, 300));
        session = (await supabase.auth.getSession()).data.session;
      }
      if (cancelled) return;

      const user = session?.user ?? null;
      if (!user || user.is_anonymous) {
        router.replace('/login');
        return;
      }

      try {
        const result = await migrateLocalToRemote();
        if (result.errors.length > 0) {
          console.warn('[migrate] partial errors', result.errors);
        }
        await Promise.all([
          useSettingsStore.getState().rehydrate(),
          usePeriodStore.getState().rehydrate(),
          useConditionStore.getState().rehydrate(),
        ]);
      } catch (e) {
        console.warn('[migrate] failed', e);
      }
      if (!cancelled) router.replace('/');
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center bg-auth-bg px-5">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-brand-pink50 border-t-brand-pink200"
          aria-hidden
        />
        <p className="text-sm text-auth-linkMuted">{t.auth.callback.busy}</p>
      </div>
    </main>
  );
}
