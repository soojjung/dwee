# 홈 커스터마이즈 플로우

> 위치: `src/app/(fullscreen)/home/customize/`, `src/components/home-customize/`

AppShell·탭바 없는 `(fullscreen)` 라우트 그룹에 속합니다.
진입: HomeHero 우상단 EditStar 아이콘 → `/home/customize`.

---

## 화면 구조

```mermaid
flowchart TD
    Home([HomeScreen])
    Customize[HomeCustomizeScreen\n/home/customize]
    EditPhotos[PhotoEditScreen\n/home/customize/edit-photos]

    Home -->|"EditStar 탭"| Customize
    Customize -->|"슬롯 탭 → 사진 선택"| EditPhotos
    EditPhotos -->|"편집 완료"| Customize
    Customize -->|"뒤로 / 완료"| Home

    classDef ui fill:#FDE8EF,stroke:#E5A8BD,color:#5C3A4A;
    class Home,Customize,EditPhotos ui;
```

---

## HomeCustomizeScreen 상태

```mermaid
flowchart TD
    Mount["마운트\nmediaStore.hydrate()"] --> Show["설정 표시\n(photoCount / textPosition / mainText / subText)"]
    Show --> EditCount{"사진 수 변경\n(1 / 2 / 4)"}
    Show --> EditText["텍스트 입력\nmainText · subText · textOrder 토글"]
    Show --> TapSlot["슬롯 탭"]

    EditCount -->|"같은 count → no-op"| Show
    EditCount -->|"다른 count → setPhotoCount"| Show
    EditText -->|"setMainText / setSubText\n/ swapTexts"| Show
    TapSlot --> EditPhotos([PhotoEditScreen])
    EditPhotos -->|"편집 완료 → blob 저장"| Show

    classDef ui fill:#FDE8EF,stroke:#E5A8BD,color:#5C3A4A;
    classDef logic fill:#E8F0FD,stroke:#A8BDE5,color:#3A4A5C;
    class Mount,Show,EditPhotos ui;
    class EditCount,EditText,TapSlot logic;
```

---

## PhotoEditScreen 상태

```mermaid
stateDiagram-v2
    [*] --> Idle : 진입 (슬롯 선택됨)
    Idle --> Panning : PointerDown + Move
    Idle --> Pinching : 두 손가락 터치
    Panning --> Idle : PointerUp
    Pinching --> Idle : 손가락 뗌
    Idle --> Replacing : "사진 변경" 탭
    Replacing --> Idle : 새 사진 선택 완료
    Idle --> Saving : "편집 완료" 탭
    Saving --> [*] : transform → cropped blob 저장 → 이전 화면 복귀
```

---

## 데이터 흐름

```mermaid
flowchart LR
    Screen[HomeCustomizeScreen\n/ PhotoEditScreen]
    Store[mediaStore]
    Repo[MediaRepository]
    IDB[(IndexedDB\nslot 0–3 + text keys)]
    SB[(Supabase\nhome_photos\nhome_decor_settings)]

    Screen -->|"set* / swap*"| Store
    Store --> Repo
    Repo --> IDB
    Repo -.->|"MVP2.2"| SB

    classDef ui fill:#FDE8EF,stroke:#E5A8BD,color:#5C3A4A;
    classDef logic fill:#E8F0FD,stroke:#A8BDE5,color:#3A4A5C;
    classDef db fill:#F0E8FD,stroke:#BDA8E5,color:#4A3A5C;
    class Screen ui;
    class Store,Repo logic;
    class IDB,SB db;
```

`setPhotoCount` 가드: 같은 count 면 no-op, 다른 count 로 변경해도 기존 슬롯 사진은 보존.

---

## domain/home/decor 상수

| 상수 | 값 |
|------|----|
| `PhotoCount` | `1 \| 2 \| 4` |
| `PhotoSlot` | `0 \| 1 \| 2 \| 3` |
| `TextPosition` | `topLeft \| topRight \| bottomLeft \| bottomRight` |
| `TextOrder` | `mainFirst \| subFirst` |
| `MAIN_TEXT_MAX` | 40자 |
| `SUB_TEXT_MAX` | 20자 |

---

## IndexedDB 마이그레이션 이력

| 버전 | 내용 |
|------|------|
| v1 | 초기 schema |
| v2 | `mediaHomeOverlays` 삭제 (스티커 기능 제거) |
| v3 | `mediaHomeHero` blob → slot 0 이주, `mediaPhotoCount = 1` 설정 |
| v4 | `mediaTextPosition` / `mediaMainText` / `mediaSubText` / `mediaTextOrder` 키 추가 (데이터 이주 없음) |

---

## 관련 파일·문서

- `src/domain/home/decor.ts` — 타입·상수 원천
- `src/store/mediaStore.ts` — hydrate / setPhoto / setMainText / swapTexts
- `src/data/repositories/MediaRepository.ts` — Repository 인터페이스
- `docs/architecture/data-layer.md` — 어댑터 패턴 상세
- `docs/flows/home.md` — HomeHero 에서 customize 진입 맥락
