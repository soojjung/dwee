export type Locale = 'ko' | 'en';

export interface UserSettings {
  averageCycleLength: number;
  averagePeriodLength: number;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
  locale: Locale;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  averageCycleLength: 28,
  averagePeriodLength: 5,
  notificationsEnabled: false,
  onboardingCompleted: false,
  locale: 'en',
};
