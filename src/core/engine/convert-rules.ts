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
  type ComparisonOperator,
  type JsonLogicNode,
} from "@/core/builder/types"

type JsonLogicObject = Record<string, unknown>

function vars(keys: string[]) {
  return keys.map((key) => ({ var: key }))
}

export function sumCapRule(fieldIds: string[] = [], total = 9): JsonLogicObject {
  if (!fieldIds.length || total < 0) return {}
  return { "<=": [{ "+": vars(fieldIds) }, total] }
}

export function rangeRule(
  fieldId = "",
  minval = 0,
  maxval = 9,
): JsonLogicObject {
  if (fieldId === "" || minval < 0 || maxval < 0) return {}
  return {
    and: [
      { ">=": [{ var: fieldId }, minval] },
      { "<=": [{ var: fieldId }, maxval] },
    ],
  }
}

function simpleRule(
  operator: ComparisonOperator = "<=",
  fieldId = "",
  value = 9,
): JsonLogicObject {
  if (fieldId === "") return {}
  return { [operator]: [{ var: fieldId }, value] }
}

function fieldVsField(
  operator: ComparisonOperator = "<=",
  leftFieldId = "",
  rightFieldId = "",
): JsonLogicObject {
  if (leftFieldId === "" || rightFieldId === "") return {}
  return { [operator]: [{ var: leftFieldId }, { var: rightFieldId }] }
}

function fieldVsFieldMultiply(
  operator: ComparisonOperator = "<=",
  leftFieldId = "",
  rightFieldId = "",
  multiplyValue = 1,
): JsonLogicObject {
  if (leftFieldId === "" || rightFieldId === "") return {}
  return {
    [operator]: [{ var: leftFieldId }, { "*": [{ var: rightFieldId }, multiplyValue] }],
  }
}

function sumFieldsVsNumber(
  operator: ComparisonOperator = "<=",
  fieldIds: string[] = [],
  value = 0,
): JsonLogicObject {
  if (!fieldIds.length) return {}
  return { [operator]: [{ "+": vars(fieldIds) }, value] }
}

function sumFieldsVsField(
  operator: ComparisonOperator = "<=",
  fieldId = "",
  fieldIds: string[] = [],
): JsonLogicObject {
  if (!fieldIds.length || fieldId === "") return {}
  return { [operator]: [{ "+": vars(fieldIds) }, { var: fieldId }] }
}

function sumFieldsVsSumFields(
  operator: ComparisonOperator = "<=",
  leftFieldIds: string[] = [],
  rightFieldIds: string[] = [],
): JsonLogicObject {
  if (!leftFieldIds.length || !rightFieldIds.length) return {}
  return {
    [operator]: [{ "+": vars(leftFieldIds) }, { "+": vars(rightFieldIds) }],
  }
}

function sumFieldsVsFieldMultiply(
  operator: ComparisonOperator = "<=",
  fieldIds: string[] = [],
  fieldId = "",
  multiplyValue = 1,
): JsonLogicObject {
  if (!fieldIds.length || fieldId === "") return {}
  return {
    [operator]: [{ "+": vars(fieldIds) }, { "*": [{ var: fieldId }, multiplyValue] }],
  }
}

function sumFieldsVsSumFieldsMultiply(
  operator: ComparisonOperator = "<=",
  leftFieldIds: string[] = [],
  rightFieldIds: string[] = [],
  multiplyValue = 1,
): JsonLogicObject {
  if (!leftFieldIds.length || !rightFieldIds.length) return {}
  return {
    [operator]: [
      { "+": vars(leftFieldIds) },
      { "*": [{ "+": vars(rightFieldIds) }, multiplyValue] },
    ],
  }
}

export function isEmptyRule(node: JsonLogicNode) {
  return (
    node === "" ||
    (typeof node === "object" &&
      node !== null &&
      !Array.isArray(node) &&
      Object.keys(node).length === 0)
  )
}

export function convertRuleToJS(rule: BuilderRule): JsonLogicNode {
  switch (rule.type) {
    case SUM_CAP_RULE:
      return sumCapRule(rule.fieldIds, rule.total)
    case RANGE_RULE:
      return rangeRule(rule.fieldId, rule.min, rule.max)
    case SIMPLE_RULE:
      return simpleRule(rule.operator, rule.fieldId, rule.number)
    case FIELD_VS_FIELD_RULE:
      return fieldVsField(rule.operator, rule.leftFieldId, rule.rightFieldId)
    case SUM_FIELDS_VS_NUMBER_RULE:
      return sumFieldsVsNumber(rule.operator, rule.fieldIds, rule.number)
    case SUM_FIELDS_VS_SUM_FIELDS_RULE:
      return sumFieldsVsSumFields(rule.operator, rule.leftFieldIds, rule.rightFieldIds)
    case SUM_FIELDS_VS_FIELD_RULE:
      return sumFieldsVsField(rule.operator, rule.fieldId, rule.fieldIds)
    case FIELD_VS_FIELD_MULTIPLY_RULE:
      return fieldVsFieldMultiply(
        rule.operator,
        rule.leftFieldId,
        rule.rightFieldId,
        rule.multiplier,
      )
    case SUM_FIELDS_VS_FIELD_MULTIPLY_RULE:
      return sumFieldsVsFieldMultiply(
        rule.operator,
        rule.fieldIds,
        rule.fieldId,
        rule.multiplier,
      )
    case SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE:
      return sumFieldsVsSumFieldsMultiply(
        rule.operator,
        rule.leftFieldIds,
        rule.rightFieldIds,
        rule.multiplier,
      )
    default:
      return {}
  }
}

export function convertRulesToJS(rules: BuilderRule[] = []): JsonLogicNode[] {
  return rules.map(convertRuleToJS).filter((node) => !isEmptyRule(node))
}
