export interface MediaRepository {
  getHomeHero(): Promise<Blob | null>;
  setHomeHero(blob: Blob): Promise<void>;
  clearHomeHero(): Promise<void>;
}
