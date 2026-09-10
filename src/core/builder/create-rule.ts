import { DEFAULT_SUM_CAP } from "@/core/builder/constants"
import { withRuleMeta } from "@/core/builder/summarize"
import {
  DOUBLE_EQUAL_TO,
  GREATER_THAN_OR_EQUAL_TO,
  FIELD_VS_FIELD_MULTIPLY_RULE,
  FIELD_VS_FIELD_RULE,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_CAP_RULE,
  SUM_FIELDS_VS_FIELD_MULTIPLY_RULE,
  SUM_FIELDS_VS_FIELD_RULE,
  SUM_FIELDS_VS_NUMBER_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_RULE,
  type AddableRuleKind,
  type BuilderRule,
  type FieldValue,
  type SumCapRule,
} from "@/core/builder/types"

export function createId() {
  return crypto.randomUUID()
}

export function defaultFieldId(fields: FieldValue[]) {
  return fields.find((field) => field.isActive)?.id ?? fields[0]?.id ?? ""
}

export function createSumCapRule(
  fieldIds: string[],
  total = DEFAULT_SUM_CAP,
  fields: FieldValue[] = [],
): SumCapRule {
  const rule: SumCapRule = {
    id: createId(),
    type: SUM_CAP_RULE,
    fieldIds,
    total,
    isEditing: false,
    enabled: true,
    label: "",
    message: "",
  }
  return withRuleMeta(rule, fields) as SumCapRule
}

export function createRule(type: AddableRuleKind, fields: FieldValue[]): BuilderRule {
  const fieldId = defaultFieldId(fields)
  const base = {
    id: createId(),
    isEditing: true,
    enabled: true,
    label: "",
    message: "",
  }

  let rule: BuilderRule

  switch (type) {
    case SIMPLE_RULE:
      rule = {
        ...base,
        type,
        fieldId,
        operator: GREATER_THAN_OR_EQUAL_TO,
        number: 0,
      }
      break
    case RANGE_RULE:
      rule = {
        ...base,
        type,
        fieldId,
        min: 0,
        max: 0,
      }
      break
    case FIELD_VS_FIELD_RULE:
      rule = {
        ...base,
        type,
        leftFieldId: fieldId,
        operator: DOUBLE_EQUAL_TO,
        rightFieldId: fieldId,
      }
      break
    case FIELD_VS_FIELD_MULTIPLY_RULE:
      rule = {
        ...base,
        type,
        leftFieldId: fieldId,
        operator: DOUBLE_EQUAL_TO,
        rightFieldId: fieldId,
        multiplier: 1,
      }
      break
    case SUM_FIELDS_VS_FIELD_MULTIPLY_RULE:
      rule = {
        ...base,
        type,
        fieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        fieldId,
        multiplier: 1,
      }
      break
    case SUM_FIELDS_VS_FIELD_RULE:
      rule = {
        ...base,
        type,
        fieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        fieldId,
      }
      break
    case SUM_FIELDS_VS_NUMBER_RULE:
      rule = {
        ...base,
        type,
        fieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        number: 0,
      }
      break
    case SUM_FIELDS_VS_SUM_FIELDS_RULE:
      rule = {
        ...base,
        type,
        leftFieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        rightFieldIds: [fieldId],
      }
      break
    case SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE:
      rule = {
        ...base,
        type,
        leftFieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        rightFieldIds: [fieldId],
        multiplier: 1,
      }
      break
  }

  return withRuleMeta(rule, fields)
}

export function createInitialRules(
  fields: FieldValue[],
  cap = DEFAULT_SUM_CAP,
): BuilderRule[] {
  const fieldId = defaultFieldId(fields)
  return [
    createSumCapRule(
      fields.filter((field) => field.isActive).map((field) => field.id),
      cap,
      fields,
    ),
    withRuleMeta(
      {
        id: createId(),
        type: RANGE_RULE,
        fieldId,
        min: 1,
        max: cap,
        isEditing: false,
        enabled: true,
        label: "",
        message: "",
      },
      fields,
    ),
  ]
}

export function resetFieldCounts(fields: FieldValue[]): FieldValue[] {
  const firstActiveId = fields.find((field) => field.isActive)?.id
  return fields.map((field) => ({
    ...field,
    value: field.id === firstActiveId ? 1 : 0,
  }))
}
