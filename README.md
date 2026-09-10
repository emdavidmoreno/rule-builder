# Rule Builder

Visual playground for **occupancy rules** across domains (flight bookings, hotel rooms, and more). Compose constraints in the UI, test them live, and export portable [JsonLogic](https://jsonlogic.com/) plus a versioned RuleSet.

The builder is domain-agnostic. Airline is the first registered domain; hotel is fully wired; cruise, car rental, and tours are draft stubs.

## What it does

1. **Pick a domain** at `/` (flight occupancy, room occupancy, …).
2. **Map categories** — enable optional counters from the domain vocabulary.
3. **Add rules** — cap totals, compare counts, ranges, sums, and multipliers. Each rule has a label and an error message.
4. **Test live** — increment/decrement counts; the playground lists every rule that fails.
5. **Export** — JsonLogic tree, RuleSet JSON, or a runnable snippet with your rules baked in.

Typical airline use: “at least one adult, at most 9 travelers, infants cannot exceed adults.”
Typical hotel use: “at most 4 guests, at most two children per adult, cribs only with infants.”

## Rule types

Every set includes a **total cap** rule: the configured fields must sum to `<=` the cap.

| Type | Meaning |
| --- | --- |
| Simple | One field vs a number (`Adults >= 1`) |
| Range | Inclusive bounds (`1 <= Adults <= 9`) |
| Field vs Field | Two fields (`Infants <= Adults`) |
| Field vs Field × Number | Field vs field times a multiplier (`Children <= Adults * 2`) |
| Sum vs Number | Sum of fields vs a number |
| Sum vs Field | Sum of fields vs one field |
| Sum vs Sum | Two sums compared |
| Sum vs Field × Number | Sum vs one field times a multiplier |
| Sum vs Sum × Number | Sum vs another sum times a multiplier |

Comparison operators: `==`, `>`, `>=`, `<`, `<=`.

## Example RuleSet

```json
{
  "version": "1.0.0",
  "domainId": "airline",
  "rules": [
    {
      "id": "…",
      "label": "Maximum 9",
      "message": "The total cannot exceed 9.",
      "enabled": true,
      "logic": { "<=": [{ "+": [{ "var": "adults" }, { "var": "children" }, { "var": "infants" }] }, 9] }
    }
  ]
}
```

Variables come from the domain manifest (`adults`, `children`, `infants`, …). Evaluation data is a flat object of those keys. The JSON is stock json-logic — no custom operators.

## Stack

- React 19, TypeScript, Vite
- TanStack Router (`/` domain picker, `/d/:domainId` workspace)
- Tailwind CSS 4 and shadcn/ui (Base UI)
- `json-logic-js` for compilation and live evaluation
- React Compiler (Babel preset)

State lives in `RuleBuilderProvider` (`src/store/rule-builder-store.tsx`). Conversion is in `src/core/engine`; evaluation in `src/core/ruleset`. See [ARCHITECTURE.md](./ARCHITECTURE.md) to add a domain.

## Getting started

```bash
npm install
npm run dev
```

The app serves at `http://localhost:5173`.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Project layout

```
src/
├── app/            Domain registration, picker, icons
├── core/           Engine, builder, ruleset, export, registry
├── domains/        airline, hotel, plus draft stubs
├── routes/         / and /d/$domainId
├── components/     Workspace chrome and shadcn/ui
└── store/          Builder state (reducer + context)
```

## Workflow in the UI

1. **Choose a domain** on the home screen.
2. **Mapping** — toggle optional categories from the manifest.
3. **Rules** — set the total cap, then add/edit/remove constraints and their error messages.
4. **Playground** — counts that fail a rule show that rule's message.
5. **Export** — JsonLogic, RuleSet, or a paste-ready snippet.
