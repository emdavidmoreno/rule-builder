# Rule Builder

Visual playground for airline **passenger occupancy rules**. Map passenger types, compose constraints in the UI, and compile them to [JsonLogic](https://jsonlogic.com/) you can copy into a booking engine.

The generated rules always combine under an `and` node. A live playground evaluates that payload with `json-logic-js` and blocks traveler counts that would violate it.

## What it does

1. **Select a tenant** from the sidebar (demo airlines, or a remote catalog).
2. **Map passenger types** — enable slots (`age1`…`age9`) and label them (Adults, Children, Infants, …). Age 1 stays required as the adult slot.
3. **Add rules** — cap party size, compare counts, ranges, sums, and multipliers.
4. **Test live** — increment/decrement counts; invalid changes never commit.
5. **Copy JsonLogic** — default, compact, or pretty-printed JSON.

Typical use: “at least one adult, at most 9 passengers, infants cannot exceed adults.”

## Rule types

Every set includes a hidden **total rule**: the sum of active passenger types must be `<=` the configured party size.

| Type | Meaning |
| --- | --- |
| Simple | One passenger type vs a number (`Adults >= 1`) |
| Range | Inclusive bounds (`1 <= Adults <= 9`) |
| Pax vs Pax | Two passenger types (`Infants <= Adults`) |
| Pax vs Pax × Number | Type vs type times a multiplier (`Children <= Adults * 2`) |
| Sum Pax vs Number | Sum of types vs a number |
| Sum Pax vs Pax | Sum of types vs one type |
| Sum Pax vs Sum Pax | Two sums compared |
| Sum Pax vs Pax × Number | Sum vs one type times a multiplier |
| Sum Pax vs Sum Pax × Number | Sum vs another sum times a multiplier |

Comparison operators: `==`, `>`, `>=`, `<`, `<=`.

## Example output

```json
{
  "and": [
    { "<=": [{ "+": [{ "var": "age1" }, { "var": "age2" }] }, 9] },
    { "and": [{ ">=": [{ "var": "age1" }, 1] }, { "<=": [{ "var": "age1" }, 9] }] }
  ]
}
```

Variables are passenger keys (`age1`, `age2`, …). Evaluation data is `{ age1: count, age2: count, ... }`.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS 4 and shadcn/ui (Base UI)
- `json-logic-js` for compilation and live evaluation
- React Compiler (Babel preset)

State lives in `RuleBuilderProvider` (`src/store/rule-builder-store.tsx`). Conversion is in `src/lib/convert-rules.ts`; evaluation in `src/lib/evaluate-rules.ts`.

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

## Tenants

Without extra config, the sidebar uses the built-in demo list in `src/data/tenants.ts`.

To load a remote catalog, set:

```bash
VITE_TENANTS_URL=https://example.com/tenants
VITE_TENANTS_API_KEY=optional-key
```

Expected payload: a JSON array of `{ "code": string, "name": string, "hasFc": boolean }`. Invalid or empty responses fall back to the demo tenants. `VITE_TENANTS_API_KEY` is sent as `x-api-key` when present.

Vite only exposes variables prefixed with `VITE_`. Put them in `.env.local` (gitignored via `*.local`).

## Project layout

```
src/
├── components/     UI: mapping, rules, playground, JsonLogic viewer
├── data/           Tenant catalog (demo + optional remote fetch)
├── lib/            Rule factories, JsonLogic conversion, evaluation
├── store/          Builder state (reducer + context)
└── types/          Rule, passenger, tenant, and JsonLogic types
```

## Workflow in the UI

1. **Mapping** — toggle passenger slots and assign labels.
2. **Rules** — set total party size, then add/edit/remove constraints.
3. **Live passengers** — counts that fail JsonLogic stay disabled.
4. **JsonLogic output** — switch format and copy to the clipboard.
