export const ko = {
  app: {
    name: 'dwee',
    tagline: '내 몸의 리듬을 부드럽게 기록해요',
  },
  auth: {
    signInWithApple: 'Apple로 로그인',
    signInWithGoogle: 'Google로 로그인',
    continueWithoutSignIn: '로그인 없이 사용하기',
    comingSoon: '로그인 기능은 곧 준비될 예정이에요',
  },
  placeholder: {
    log: '오늘의 컨디션 기록은 곧 준비될 예정이에요',
    calendar: '캘린더 화면은 곧 준비될 예정이에요',
    insights: '인사이트는 곧 준비될 예정이에요',
    onboarding: '시작 안내는 곧 준비될 예정이에요',
  },
  nav: {
    home: '홈',
    log: '기록',
    calendar: '캘린더',
    insights: '인사이트',
    settings: '설정',
  },
  home: {
    nextPeriodTitle: '다음 생리 예상일',
    insufficientData: '아직 예측하기 어려워요',
    confidenceLow: '데이터가 적어 변동이 클 수 있어요',
    confidenceMedium: '최근 패턴을 참고한 추정이에요',
    confidenceHigh: '최근 패턴이 안정적이에요',
  },
  log: {
    todayMood: '오늘의 기분',
    todayEnergy: '에너지',
    todayPain: '통증 정도',
    todayBloating: '붓기',
    todayAppetite: '식욕',
    todaySkin: '피부',
    memoPlaceholder: '오늘의 메모 (선택)',
    saved: '오늘의 기록을 저장했어요',
  },
  empty: {
    noData: '아직 기록이 없어요',
  },
  settings: {
    title: '설정',
    language: '언어',
    languageKo: '한국어',
    languageEn: 'English',
  },
  condition: {
    mood: {
      great: '아주 좋음',
      good: '좋음',
      neutral: '보통',
      down: '가라앉음',
      low: '많이 힘듦',
    },
    energy: { high: '활기참', medium: '보통', low: '낮음' },
    pain: { none: '없음', mild: '약함', moderate: '중간', severe: '심함' },
    bloating: { none: '없음', mild: '약간', severe: '심함' },
    appetite: { low: '적음', normal: '보통', high: '많음' },
    skin: { clear: '깨끗', oily: '유분', dry: '건조', breakout: '트러블' },
  },
};

export type Dictionary = typeof ko;
