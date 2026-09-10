import {
  createId,
  createSumCapRule,
  RANGE_RULE,
  type BuilderRule,
  type FieldValue,
} from "@/core/builder"
import { DROPDOWN_ACTIONS } from "@/core/builder/constants"
import type { FieldDef, RuleTemplate, SampleCase } from "@/core/registry/types"

export const AIRLINE_FIELDS: FieldDef[] = [
  {
    id: "adults",
    label: "Adults",
    type: "counter",
    min: 0,
    max: 9,
    defaultValue: 1,
    required: true,
    helpText: "At least one adult is required.",
  },
  {
    id: "children",
    label: "Children",
    type: "counter",
    min: 0,
    max: 9,
    defaultValue: 0,
    required: false,
    helpText: "Ages 2–11.",
  },
  {
    id: "infants",
    label: "Infants",
    type: "counter",
    min: 0,
    max: 9,
    defaultValue: 0,
    required: false,
    helpText: "Under 2, must sit with an adult.",
  },
]

export const AIRLINE_RULE_TEMPLATES: RuleTemplate[] = DROPDOWN_ACTIONS.map((item) => ({
  id: item.action,
  label: item.label,
  kind: item.action,
}))

export const AIRLINE_SAMPLE_CASES: SampleCase[] = [
  { label: "Solo adult", data: { adults: 1, children: 0, infants: 0 } },
  { label: "Couple", data: { adults: 2, children: 0, infants: 0 } },
  { label: "Family", data: { adults: 2, children: 2, infants: 1 } },
]

export function createAirlinePresetRules(fields: FieldValue[]): BuilderRule[] {
  const activeIds = fields.filter((field) => field.isActive).map((field) => field.id)
  return [
    createSumCapRule(activeIds, 9),
    {
      id: createId(),
      type: RANGE_RULE,
      fieldId: "adults",
      min: 1,
      max: 9,
      isEditing: false,
    },
  ]
}
