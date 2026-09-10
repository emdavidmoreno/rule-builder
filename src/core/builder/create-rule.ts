import { DEFAULT_SUM_CAP } from "@/core/builder/constants"
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
): SumCapRule {
  return {
    id: createId(),
    type: SUM_CAP_RULE,
    fieldIds,
    total,
    isEditing: false,
  }
}

export function createRule(type: AddableRuleKind, fields: FieldValue[]): BuilderRule {
  const fieldId = defaultFieldId(fields)

  switch (type) {
    case SIMPLE_RULE:
      return {
        id: createId(),
        type,
        fieldId,
        operator: GREATER_THAN_OR_EQUAL_TO,
        number: 0,
        isEditing: true,
      }
    case RANGE_RULE:
      return {
        id: createId(),
        type,
        fieldId,
        min: 0,
        max: 0,
        isEditing: true,
      }
    case FIELD_VS_FIELD_RULE:
      return {
        id: createId(),
        type,
        leftFieldId: fieldId,
        operator: DOUBLE_EQUAL_TO,
        rightFieldId: fieldId,
        isEditing: true,
      }
    case FIELD_VS_FIELD_MULTIPLY_RULE:
      return {
        id: createId(),
        type,
        leftFieldId: fieldId,
        operator: DOUBLE_EQUAL_TO,
        rightFieldId: fieldId,
        multiplier: 1,
        isEditing: true,
      }
    case SUM_FIELDS_VS_FIELD_MULTIPLY_RULE:
      return {
        id: createId(),
        type,
        fieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        fieldId,
        multiplier: 1,
        isEditing: true,
      }
    case SUM_FIELDS_VS_FIELD_RULE:
      return {
        id: createId(),
        type,
        fieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        fieldId,
        isEditing: true,
      }
    case SUM_FIELDS_VS_NUMBER_RULE:
      return {
        id: createId(),
        type,
        fieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        number: 0,
        isEditing: true,
      }
    case SUM_FIELDS_VS_SUM_FIELDS_RULE:
      return {
        id: createId(),
        type,
        leftFieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        rightFieldIds: [fieldId],
        isEditing: true,
      }
    case SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE:
      return {
        id: createId(),
        type,
        leftFieldIds: [fieldId],
        operator: DOUBLE_EQUAL_TO,
        rightFieldIds: [fieldId],
        multiplier: 1,
        isEditing: true,
      }
  }
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
    ),
    {
      id: createId(),
      type: RANGE_RULE,
      fieldId,
      min: 1,
      max: cap,
      isEditing: false,
    },
  ]
}

export function resetFieldCounts(fields: FieldValue[]): FieldValue[] {
  const firstActiveId = fields.find((field) => field.isActive)?.id
  return fields.map((field) => ({
    ...field,
    value: field.id === firstActiveId ? 1 : 0,
  }))
}

export function fieldLabel(fields: FieldValue[], id: string) {
  return fields.find((field) => field.id === id)?.label || id
}
