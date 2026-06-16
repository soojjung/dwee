// Migrates IndexedDB-only data to Supabase the first time a user
// signs in (STEP 2.3). Media (storage uploads) deferred to a
// follow-up STEP — this only covers settings + periods + conditions.
//
// Adapters are imported directly (not through `@/data` proxies) so
// reads stay on IndexedDB while writes hit Supabase, regardless of
// the current repo mode.

import { indexedDBSettingsAdapter } from '@/data/adapters/indexeddb/IndexedDBSettingsAdapter';
import { indexedDBPeriodAdapter } from '@/data/adapters/indexeddb/IndexedDBPeriodAdapter';
import { indexedDBConditionAdapter } from '@/data/adapters/indexeddb/IndexedDBConditionAdapter';
import { supabaseSettingsAdapter } from '@/data/adapters/supabase/SupabaseSettingsAdapter';
import { supabasePeriodAdapter } from '@/data/adapters/supabase/SupabasePeriodAdapter';
import { supabaseConditionAdapter } from '@/data/adapters/supabase/SupabaseConditionAdapter';
import { DEFAULT_USER_SETTINGS } from '@/types/userSettings';

// Wide enough to cover any realistic local history; condition
// adapter has no full `list()`, only `range()`.
const CONDITION_FROM_DATE = '2020-01-01';

export interface MigrationResult {
  settings: boolean;
  periodsAdded: number;
  conditionsAdded: number;
  errors: string[];
}

export async function migrateLocalToRemote(): Promise<MigrationResult> {
  const errors: string[] = [];

  let settings = false;
  try {
    const local = await indexedDBSettingsAdapter.get();
    // Skip if the local store is just defaults — nothing to push,
    // and the profile row already exists via on_auth_user_created.
    if (
      local.locale !== DEFAULT_USER_SETTINGS.locale ||
      local.averageCycleLength !== DEFAULT_USER_SETTINGS.averageCycleLength ||
      local.averagePeriodLength !== DEFAULT_USER_SETTINGS.averagePeriodLength ||
      local.notificationsEnabled !== DEFAULT_USER_SETTINGS.notificationsEnabled ||
      local.onboardingCompleted !== DEFAULT_USER_SETTINGS.onboardingCompleted
    ) {
      await supabaseSettingsAdapter.update(local);
    }
    settings = true;
  } catch (e) {
    errors.push(`settings: ${(e as Error).message}`);
  }

  let periodsAdded = 0;
  try {
    const periods = await indexedDBPeriodAdapter.list();
    for (const p of periods) {
      try {
        await supabasePeriodAdapter.add({ startDate: p.startDate, endDate: p.endDate });
        periodsAdded += 1;
      } catch (e) {
        errors.push(`period ${p.startDate}: ${(e as Error).message}`);
      }
    }
  } catch (e) {
    errors.push(`periods: ${(e as Error).message}`);
  }

  let conditionsAdded = 0;
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    const conditions = await indexedDBConditionAdapter.range(CONDITION_FROM_DATE, todayISO);
    for (const c of conditions) {
      try {
        await supabaseConditionAdapter.upsert({
          date: c.date,
          mood: c.mood,
          energy: c.energy,
          pain: c.pain,
          bloating: c.bloating,
          appetite: c.appetite,
          skin: c.skin,
          memo: c.memo,
        });
        conditionsAdded += 1;
      } catch (e) {
        errors.push(`condition ${c.date}: ${(e as Error).message}`);
      }
    }
  } catch (e) {
    errors.push(`conditions: ${(e as Error).message}`);
  }

  return { settings, periodsAdded, conditionsAdded, errors };
}
