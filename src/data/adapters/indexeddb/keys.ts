export const STORAGE_KEYS = {
  schemaVersion: 'dwee:schema_version',
  settings: 'dwee:settings',
  periods: 'dwee:periods',
  conditions: 'dwee:conditions',
  mediaHomeHero: 'dwee:media:home_hero',
} as const;

// Keys removed from the active schema. Kept here so migrations can clean up
// orphaned data on user devices. Do not reference outside of migration logic.
export const DEPRECATED_KEYS = {
  mediaHomeOverlays: 'dwee:media:home_overlays',
} as const;

export const CURRENT_SCHEMA_VERSION = 2;
