import type { Dictionary } from './ko';

export const en: Dictionary = {
  app: {
    name: 'dwee',
    tagline: 'Gently track your body’s rhythm',
  },
  auth: {
    signInWithApple: 'Sign in with Apple',
    signInWithGoogle: 'Sign in with Google',
    continueWithoutSignIn: 'Continue without signing in',
    comingSoon: 'Sign-in is coming soon',
  },
  placeholder: {
    log: 'Daily condition log is coming soon',
    calendar: 'Calendar view is coming soon',
    insights: 'Insights are coming soon',
    onboarding: 'Welcome guide is coming soon',
  },
  nav: {
    home: 'Home',
    log: 'Today',
    calendar: 'Calendar',
    insights: 'Insights',
    settings: 'Settings',
  },
  home: {
    nextPeriodTitle: 'Predicted next period',
    insufficientData: 'Not enough data yet',
    confidenceLow: 'Limited data — predictions may shift',
    confidenceMedium: 'Estimate based on recent patterns',
    confidenceHigh: 'Your recent pattern looks steady',
  },
  log: {
    todayMood: 'Mood today',
    todayEnergy: 'Energy',
    todayPain: 'Pain level',
    todayBloating: 'Bloating',
    todayAppetite: 'Appetite',
    todaySkin: 'Skin',
    memoPlaceholder: 'Optional note for today',
    saved: 'Today’s entry saved',
  },
  empty: {
    noData: 'No entries yet',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    languageKo: '한국어',
    languageEn: 'English',
  },
  condition: {
    mood: { great: 'Great', good: 'Good', neutral: 'Okay', down: 'Down', low: 'Tough' },
    energy: { high: 'High', medium: 'Steady', low: 'Low' },
    pain: { none: 'None', mild: 'Mild', moderate: 'Moderate', severe: 'Severe' },
    bloating: { none: 'None', mild: 'Slight', severe: 'Heavy' },
    appetite: { low: 'Light', normal: 'Steady', high: 'Strong' },
    skin: { clear: 'Clear', oily: 'Oily', dry: 'Dry', breakout: 'Breakout' },
  },
};
