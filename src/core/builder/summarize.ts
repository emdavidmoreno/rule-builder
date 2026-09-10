import {
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
  type BuilderRule,
  type FieldValue,
} from "@/core/builder/types"
import { fieldLabel } from "@/core/builder/labels"

function names(fields: FieldValue[], ids: string[]) {
  return ids.map((id) => fieldLabel(fields, id)).join(", ")
}

export function summarizeRule(
  rule: BuilderRule,
  fields: FieldValue[],
): { label: string; message: string } {
  switch (rule.type) {
    case SUM_CAP_RULE:
      return {
        label: `Maximum ${rule.total}`,
        message: `The total cannot exceed ${rule.total}.`,
      }
    case SIMPLE_RULE:
      return {
        label: `${fieldLabel(fields, rule.fieldId)} ${rule.operator} ${rule.number}`,
        message: `${fieldLabel(fields, rule.fieldId)} must be ${rule.operator} ${rule.number}.`,
      }
    case RANGE_RULE:
      return {
        label: `${fieldLabel(fields, rule.fieldId)} between ${rule.min} and ${rule.max}`,
        message: `${fieldLabel(fields, rule.fieldId)} must be between ${rule.min} and ${rule.max}.`,
      }
    case FIELD_VS_FIELD_RULE:
      return {
        label: `${fieldLabel(fields, rule.leftFieldId)} ${rule.operator} ${fieldLabel(fields, rule.rightFieldId)}`,
        message: `${fieldLabel(fields, rule.leftFieldId)} must be ${rule.operator} ${fieldLabel(fields, rule.rightFieldId)}.`,
      }
    case FIELD_VS_FIELD_MULTIPLY_RULE:
      return {
        label: `${fieldLabel(fields, rule.leftFieldId)} ${rule.operator} ${fieldLabel(fields, rule.rightFieldId)} × ${rule.multiplier}`,
        message: `${fieldLabel(fields, rule.leftFieldId)} must be ${rule.operator} ${fieldLabel(fields, rule.rightFieldId)} × ${rule.multiplier}.`,
      }
    case SUM_FIELDS_VS_NUMBER_RULE:
      return {
        label: `Sum(${names(fields, rule.fieldIds)}) ${rule.operator} ${rule.number}`,
        message: `The sum of ${names(fields, rule.fieldIds)} must be ${rule.operator} ${rule.number}.`,
      }
    case SUM_FIELDS_VS_FIELD_RULE:
      return {
        label: `Sum(${names(fields, rule.fieldIds)}) ${rule.operator} ${fieldLabel(fields, rule.fieldId)}`,
        message: `The sum of ${names(fields, rule.fieldIds)} must be ${rule.operator} ${fieldLabel(fields, rule.fieldId)}.`,
      }
    case SUM_FIELDS_VS_SUM_FIELDS_RULE:
      return {
        label: `Sum(${names(fields, rule.leftFieldIds)}) ${rule.operator} Sum(${names(fields, rule.rightFieldIds)})`,
        message: `The sum of ${names(fields, rule.leftFieldIds)} must be ${rule.operator} the sum of ${names(fields, rule.rightFieldIds)}.`,
      }
    case SUM_FIELDS_VS_FIELD_MULTIPLY_RULE:
      return {
        label: `Sum(${names(fields, rule.fieldIds)}) ${rule.operator} ${fieldLabel(fields, rule.fieldId)} × ${rule.multiplier}`,
        message: `The sum of ${names(fields, rule.fieldIds)} must be ${rule.operator} ${fieldLabel(fields, rule.fieldId)} × ${rule.multiplier}.`,
      }
    case SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE:
      return {
        label: `Sum(${names(fields, rule.leftFieldIds)}) ${rule.operator} Sum(${names(fields, rule.rightFieldIds)}) × ${rule.multiplier}`,
        message: `The sum of ${names(fields, rule.leftFieldIds)} must be ${rule.operator} the sum of ${names(fields, rule.rightFieldIds)} × ${rule.multiplier}.`,
      }
  }
}

export function withRuleMeta(rule: BuilderRule, fields: FieldValue[]): BuilderRule {
  const copy = summarizeRule(rule, fields)
  return {
    ...rule,
    enabled: rule.enabled !== false,
    label: rule.label || copy.label,
    message: rule.message || copy.message,
  }
}
