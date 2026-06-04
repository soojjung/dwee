// Blob 은 Storage bucket('media'), 메타데이터(경로)는 DB.
import type { MediaRepository } from '@/data/repositories/MediaRepository';
import { supabase, requireUserId } from './client';

const BUCKET = 'media';
const HERO_FILENAME = 'home_hero/current'; // 확장자는 contentType 기반 결정

async function downloadBlob(path: string): Promise<Blob | null> {
  const { data, error } = await supabase.storage.from(BUCKET).download(path);
  if (error) return null;
  return data;
}

async function uploadBlob(path: string, blob: Blob): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { upsert: true, contentType: blob.type || 'image/jpeg' });
  if (error) throw error;
}

interface HeroRow {
  user_id: string;
  storage_path: string;
}

export const supabaseMediaAdapter: MediaRepository = {
  async getHomeHero() {
    const userId = await requireUserId();
    const { data: row } = await supabase
      .from('home_hero')
      .select('storage_path')
      .eq('user_id', userId)
      .maybeSingle();
    if (!row) return null;
    return downloadBlob((row as HeroRow).storage_path);
  },

  async setHomeHero(blob: Blob) {
    const userId = await requireUserId();
    const ext = blob.type === 'image/png' ? 'png' : 'jpg';
    const path = `${userId}/${HERO_FILENAME}.${ext}`;
    await uploadBlob(path, blob);
    const { error } = await supabase
      .from('home_hero')
      .upsert({ user_id: userId, storage_path: path }, { onConflict: 'user_id' });
    if (error) throw error;
  },

  async clearHomeHero() {
    const userId = await requireUserId();
    const { data: row } = await supabase
      .from('home_hero')
      .select('storage_path')
      .eq('user_id', userId)
      .maybeSingle();
    if (row) await supabase.storage.from(BUCKET).remove([(row as HeroRow).storage_path]);
    await supabase.from('home_hero').delete().eq('user_id', userId);
  },
};
