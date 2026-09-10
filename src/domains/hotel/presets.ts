import {
  createId,
  createSumCapRule,
  FIELD_VS_FIELD_MULTIPLY_RULE,
  FIELD_VS_FIELD_RULE,
  LESS_THAN_OR_EQUAL_TO,
  RANGE_RULE,
  withRuleMeta,
  type BuilderRule,
  type FieldValue,
} from "@/core/builder"
import { DROPDOWN_ACTIONS } from "@/core/builder/constants"
import type { FieldDef, RuleTemplate, SampleCase } from "@/core/registry/types"

export const HOTEL_FIELDS: FieldDef[] = [
  {
    id: "adults",
    label: "Adults",
    type: "counter",
    min: 0,
    max: 8,
    defaultValue: 1,
    required: true,
    helpText: "At least one adult must occupy the room.",
  },
  {
    id: "children",
    label: "Children",
    type: "counter",
    min: 0,
    max: 8,
    defaultValue: 0,
    required: false,
  },
  {
    id: "infants",
    label: "Infants",
    type: "counter",
    min: 0,
    max: 4,
    defaultValue: 0,
    required: false,
  },
  {
    id: "cribs",
    label: "Cribs",
    type: "counter",
    min: 0,
    max: 2,
    defaultValue: 0,
    required: false,
    helpText: "Cribs are only available when the room has infants.",
  },
]

export const HOTEL_RULE_TEMPLATES: RuleTemplate[] = DROPDOWN_ACTIONS.map((item) => ({
  id: item.action,
  label: item.label,
  kind: item.action,
}))

export const HOTEL_SAMPLE_CASES: SampleCase[] = [
  { label: "Solo traveler", data: { adults: 1, children: 0, infants: 0, cribs: 0 } },
  { label: "Couple", data: { adults: 2, children: 0, infants: 0, cribs: 0 } },
  { label: "Family + crib", data: { adults: 2, children: 1, infants: 1, cribs: 1 } },
  { label: "Over occupancy", data: { adults: 3, children: 3, infants: 0, cribs: 0 } },
]

export function createHotelPresetRules(fields: FieldValue[]): BuilderRule[] {
  const occupantIds = ["adults", "children", "infants"]
  return [
    createSumCapRule(occupantIds, 4, fields),
    withRuleMeta(
      {
        id: createId(),
        type: RANGE_RULE,
        fieldId: "adults",
        min: 1,
        max: 4,
        isEditing: false,
        enabled: true,
        label: "At least one adult",
        message: "A room must have between 1 and 4 adults.",
      },
      fields,
    ),
    withRuleMeta(
      {
        id: createId(),
        type: FIELD_VS_FIELD_MULTIPLY_RULE,
        leftFieldId: "children",
        operator: LESS_THAN_OR_EQUAL_TO,
        rightFieldId: "adults",
        multiplier: 2,
        isEditing: false,
        enabled: true,
        label: "Children per adult",
        message: "There cannot be more than two children per adult.",
      },
      fields,
    ),
    withRuleMeta(
      {
        id: createId(),
        type: FIELD_VS_FIELD_RULE,
        leftFieldId: "cribs",
        operator: LESS_THAN_OR_EQUAL_TO,
        rightFieldId: "infants",
        isEditing: false,
        enabled: true,
        label: "Cribs need infants",
        message: "Cribs are only available if there is at least one infant per crib.",
      },
      fields,
    ),
  ]
}
