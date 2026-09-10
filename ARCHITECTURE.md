# Architecture

This app is a visual rule builder on top of stock `json-logic-js`. The engine is domain-agnostic. Airline, hotel, and future occupancy products are **registered domains**, not forks of the builder.

```
src/
  core/                 # no domain imports, no aviation vocabulary
    engine/             # template → json-logic
    builder/            # rule types, factories, counter playground
    ruleset/            # RuleSet, per-rule evaluation, migrate()
    export/             # JsonLogic string, RuleSet JSON, runnable snippet
    registry/           # FieldDef, DomainManifest, register/get/list
  domains/              # one folder per product vocabulary
  app/                  # register-domains.ts, picker, icons
  routes/               # / and /d/$domainId
```

`core/` must not import `domains/`. The only wiring file is `src/app/register-domains.ts`.

## How to add a domain

1. Create `src/domains/<id>/manifest.ts` (and `Playground.tsx` / `presets.ts` if the domain is `stable`).
2. Register it in `src/app/register-domains.ts` with `registerDomain(...)`.
3. Do not change `core/`.

Draft domains (`status: "draft"`) show up in the picker as coming soon and cannot open `/d/:id`.

## Manifest contract

Each domain exports a `DomainManifest`:

- `fields` — json-logic variable names and UI labels
- `ruleTemplates` — kinds the builder can add
- `presetRules` — starting `BuilderRule[]`
- `sampleCases` — playground shortcuts
- `Playground` — visual simulator; receives `fields`, `data`, `onChange`, and `EvaluationResult`

### Dates

`json-logic-js` has no date type. Do **not** `add_operation`. Put a `derived` function on a `FieldDef` (for example `age` from `birthDate`). The evaluator injects derived values **before** `apply()`. Exported JSON stays portable; the snippet includes a `derive()` hook listing those field ids.

## Hotel example

```ts
// src/domains/hotel/manifest.ts
import { fieldsFromDefs } from "@/core/registry/fields"
import type { DomainManifest } from "@/core/registry/types"
import { HotelPlayground } from "@/domains/hotel/Playground"
import {
  HOTEL_FIELDS,            // adults, children, infants, cribs
  HOTEL_RULE_TEMPLATES,
  HOTEL_SAMPLE_CASES,
  createHotelPresetRules,  // max 4 guests, children <= adults * 2, cribs <= infants
} from "@/domains/hotel/presets"

const fields = fieldsFromDefs(HOTEL_FIELDS)

export const hotelManifest: DomainManifest = {
  id: "hotel",
  name: "Room occupancy",
  description: "Guest and crib limits for a hotel room.",
  status: "stable",
  icon: "hotel",
  fields: HOTEL_FIELDS,
  groups: [
    { id: "guests", label: "Guests", fieldIds: ["adults", "children", "infants"] },
    { id: "equipment", label: "Equipment", fieldIds: ["cribs"] },
  ],
  ruleTemplates: HOTEL_RULE_TEMPLATES,
  presetRules: createHotelPresetRules(fields),
  sampleCases: HOTEL_SAMPLE_CASES,
  Playground: HotelPlayground,
}
```

Then in `src/app/register-domains.ts`:

```ts
import { hotelManifest } from "@/domains/hotel/manifest"
registerDomain(hotelManifest)
```

## Evaluation and export

Builder templates (`SIMPLE_RULE`, `RANGE_RULE`, …) are what the UI edits. They compile to a `RuleSet`:

```ts
{
  version: "1.0.0",
  domainId: "hotel",
  rules: [{ id, label, message, logic, enabled }]
}
```

`evaluateRuleSet` runs each enabled rule with `jsonLogic.apply` and returns every failure message. The export panel copies:

1. **JsonLogic** — `{ and: [ ... ] }` for engines that still want a single tree
2. **RuleSet** — the versioned list
3. **Snippet** — ESM that already contains the user's rules and `evaluateOccupancy(data)`

Old `{ and: [...] }` payloads can be passed through `migrateRuleSet(input, domainId)`.
