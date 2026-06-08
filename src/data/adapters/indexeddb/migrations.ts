import { del, get, set } from 'idb-keyval';
import { STORAGE_KEYS, DEPRECATED_KEYS, CURRENT_SCHEMA_VERSION } from './keys';

type Migration = () => Promise<void>;

const migrations: Record<number, Migration> = {
  1: async () => {
    /* 초기 schema, no-op */
  },
  2: async () => {
    // Drop legacy hero-overlay records left over from the removed sticker feature.
    await del(DEPRECATED_KEYS.mediaHomeOverlays);
  },
  3: async () => {
    // Move single home hero into the new slot-based layout (slot 0, count = 1).
    const legacy = await get<Blob>(DEPRECATED_KEYS.mediaHomeHero);
    if (legacy) {
      await set(STORAGE_KEYS.mediaPhoto(0), legacy);
      await set(STORAGE_KEYS.mediaPhotoCount, 1);
      await del(DEPRECATED_KEYS.mediaHomeHero);
    }
  },
  4: async () => {
    /* Adds text-position + main/sub text keys. No data to migrate. */
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
