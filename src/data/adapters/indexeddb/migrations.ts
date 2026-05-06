import { get, set } from 'idb-keyval';
import { STORAGE_KEYS, CURRENT_SCHEMA_VERSION } from './keys';

type Migration = () => Promise<void>;

const migrations: Record<number, Migration> = {
  1: async () => {
    /* 초기 schema, no-op */
  },
};

export async function runMigrations(): Promise<void> {
  const current = (await get<number>(STORAGE_KEYS.schemaVersion)) ?? 0;
  for (let v = current + 1; v <= CURRENT_SCHEMA_VERSION; v++) {
    const m = migrations[v];
    if (m) await m();
  }
  await set(STORAGE_KEYS.schemaVersion, CURRENT_SCHEMA_VERSION);
}
