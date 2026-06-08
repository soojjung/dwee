---
name: dwee doc locations and sync rules
description: Where docs live, which files must stay in sync with CLAUDE.md rule changes
type: project
---

## Key doc locations

- `docs/flows/home.md` — home screen state machine + data flow. Must be updated when HomeScreen.tsx flow changes.
- `docs/flows/customize.md` — fullscreen customize flow (HomeCustomize + PhotoEdit). New as of PR #8.
- `docs/architecture/data-layer.md` — dependency direction + repository inventory. Must be updated when any new Repository interface is added.
- `docs/product/mvp1-spec.md` — original product spec with persona, KPI, condition enums.
- `.claude/rules/health-copy.md` — copy tone rules (diet/medical copy restrictions).
- `.claude/rules/screens.md` — route group registry. Must be updated when a new `(group)` layout is added under `src/app/`.
- `supabase/README.md` — Supabase migration + adapter guide. Adapter code lives at `src/data/adapters/supabase/` (already moved from `supabase/adapters/`).

## Active repositories (as of schema v4)

Period / Condition / Settings / Media. Each has both IndexedDB and Supabase adapter implementations. `data/index.ts` currently wires IndexedDB; Supabase wiring is MVP2.2.

## Route groups (fullscreen added)

Three route groups now exist: `(auth)`, `(app)`, `(fullscreen)`. The `(fullscreen)` group hosts immersive editing screens with no AppShell or BottomTabNav. Currently: `/home/customize`, `/home/customize/edit-photos`.

## Sync rule: CLAUDE.md "명시적 제외" changes must propagate to three places

When the exclusion list in CLAUDE.md changes:
1. `README.md` §"명시적 제외" — user-facing
2. `.claude/rules/health-copy.md` §"다이어트 유도 금지" — dev enforcement rule
3. Any existing flow docs that reference the changed content area

**Why:** These three files each serve a different audience (user, dev rule engine, flow designer) but must say the same thing. Divergence was found when `식단` was removed from CLAUDE.md exclusion but README still listed it verbatim.

**How to apply:** On any PR touching CLAUDE.md §"명시적 제외", grep README.md and health-copy.md for the same keywords and reconcile.

## Removed component: SetupPeriodPicker

`SetupPeriodPicker.tsx` was deleted in `feat/home-figma-pass`. The old `setupMode` inline calendar picker flow no longer exists. All first-record entry now goes through `AddPeriodFab`. If any doc references `setupMode` or `SetupPeriodPicker`, delete the reference.
