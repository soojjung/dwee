---
description: 로컬 저장소 추상화 규칙
paths:
  - 'src/data/**'
  - 'src/store/**'
---

# 저장소 규칙

## 1) 의존성 방향

- 화면·컴포넌트는 저장소 직접 import 금지.
- store(Zustand)만 `src/data/index.ts`의 repo 인스턴스 사용.
- `data/adapters/**`는 `data/repositories/**`의 인터페이스를 구현.

## 2) 어댑터 교체 가능성

- 화면/스토어는 항상 Repository 인터페이스에만 의존.
- IndexedDB → Supabase 등 교체 시 `data/index.ts`만 수정.
- 어댑터 추가 시 기존 인터페이스 시그니처 변경 금지 (확장은 별도 인터페이스).

## 3) 키 네임스페이스

- 모든 키는 `dwee:` 프리픽스. `keys.ts`의 `STORAGE_KEYS`에만 정의.
- 인라인 문자열 키 사용 금지.

## 4) 스키마 마이그레이션

- 스키마 변경 시 `CURRENT_SCHEMA_VERSION` 증가 + `migrations[v]` 추가.
- 어댑터 첫 사용 전 `ensureMigrations()` 호출 (store hydrate에서).

## 5) ID·타임스탬프

- 신규 레코드 `id`는 `crypto.randomUUID()` 고정.
- 모든 createdAt은 ISO datetime 문자열.

## 6) 환경 안전성

- 어댑터 모듈 top-level에서 IndexedDB·window 직접 호출 금지.
- 정적 빌드(export) 단계에서 import만 되어도 안전해야 함.
