import { indexedDBSettingsAdapter } from './adapters/indexeddb/IndexedDBSettingsAdapter';
import { indexedDBPeriodAdapter } from './adapters/indexeddb/IndexedDBPeriodAdapter';
import { indexedDBConditionAdapter } from './adapters/indexeddb/IndexedDBConditionAdapter';
import { runMigrations } from './adapters/indexeddb/migrations';
import type { SettingsRepository } from './repositories/SettingsRepository';
import type { PeriodRepository } from './repositories/PeriodRepository';
import type { ConditionRepository } from './repositories/ConditionRepository';

export type { SettingsRepository, PeriodRepository, ConditionRepository };
export type { NewPeriodInput } from './repositories/PeriodRepository';
export type { NewConditionInput } from './repositories/ConditionRepository';

export const settingsRepo: SettingsRepository = indexedDBSettingsAdapter;
export const periodRepo: PeriodRepository = indexedDBPeriodAdapter;
export const conditionRepo: ConditionRepository = indexedDBConditionAdapter;

let migrationsRan = false;
export async function ensureMigrations(): Promise<void> {
  if (migrationsRan) return;
  await runMigrations();
  migrationsRan = true;
}
