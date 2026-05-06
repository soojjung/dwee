import { get, set } from 'idb-keyval';
import type { PeriodLog } from '@/types';
import type { PeriodRepository, NewPeriodInput } from '../../repositories/PeriodRepository';
import { STORAGE_KEYS } from './keys';

const newId = (): string => crypto.randomUUID();
const readAll = async (): Promise<PeriodLog[]> =>
  (await get<PeriodLog[]>(STORAGE_KEYS.periods)) ?? [];
const writeAll = (list: PeriodLog[]) => set(STORAGE_KEYS.periods, list);

export const indexedDBPeriodAdapter: PeriodRepository = {
  list: () => readAll(),

  async add(input: NewPeriodInput) {
    const log: PeriodLog = {
      id: newId(),
      startDate: input.startDate,
      endDate: input.endDate,
      createdAt: new Date().toISOString(),
    };
    await writeAll([...(await readAll()), log]);
    return log;
  },

  async update(id, patch) {
    const all = await readAll();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const next: PeriodLog = { ...all[idx]!, ...patch };
    await writeAll([...all.slice(0, idx), next, ...all.slice(idx + 1)]);
    return next;
  },

  async remove(id) {
    await writeAll((await readAll()).filter((p) => p.id !== id));
  },
};
