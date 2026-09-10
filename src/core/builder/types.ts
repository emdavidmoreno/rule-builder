export const RANGE_RULE = "RANGE_RULE"
export const SIMPLE_RULE = "SIMPLE_RULE"
export const SUM_CAP_RULE = "SUM_CAP_RULE"
export const FIELD_VS_FIELD_RULE = "FIELD_VS_FIELD_RULE"
export const FIELD_VS_FIELD_MULTIPLY_RULE = "FIELD_VS_FIELD_MULTIPLY_RULE"
export const SUM_FIELDS_VS_FIELD_MULTIPLY_RULE = "SUM_FIELDS_VS_FIELD_MULTIPLY_RULE"
export const SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE = "SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE"
export const SUM_FIELDS_VS_FIELD_RULE = "SUM_FIELDS_VS_FIELD_RULE"
export const SUM_FIELDS_VS_NUMBER_RULE = "SUM_FIELDS_VS_NUMBER_RULE"
export const SUM_FIELDS_VS_SUM_FIELDS_RULE = "SUM_FIELDS_VS_SUM_FIELDS_RULE"

export type RuleKind =
  | typeof RANGE_RULE
  | typeof SIMPLE_RULE
  | typeof SUM_CAP_RULE
  | typeof FIELD_VS_FIELD_RULE
  | typeof FIELD_VS_FIELD_MULTIPLY_RULE
  | typeof SUM_FIELDS_VS_FIELD_MULTIPLY_RULE
  | typeof SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE
  | typeof SUM_FIELDS_VS_FIELD_RULE
  | typeof SUM_FIELDS_VS_NUMBER_RULE
  | typeof SUM_FIELDS_VS_SUM_FIELDS_RULE

export const GREATER_THAN = ">"
export const GREATER_THAN_OR_EQUAL_TO = ">="
export const LESS_THAN = "<"
export const LESS_THAN_OR_EQUAL_TO = "<="
export const DOUBLE_EQUAL_TO = "=="

export type ComparisonOperator =
  | typeof GREATER_THAN
  | typeof GREATER_THAN_OR_EQUAL_TO
  | typeof LESS_THAN
  | typeof LESS_THAN_OR_EQUAL_TO
  | typeof DOUBLE_EQUAL_TO

export const RULE_DEFAULT_FORMAT = "default"
export const RULE_COMPACT_FORMAT = "compact"
export const RULE_EXTENDED_FORMAT = "extended"

export type RuleFormat =
  | typeof RULE_DEFAULT_FORMAT
  | typeof RULE_COMPACT_FORMAT
  | typeof RULE_EXTENDED_FORMAT

export type FieldValue = {
  id: string
  label: string
  value: number
  isActive: boolean
}

type RuleBase = {
  id: string
  isEditing: boolean
}

export type SumCapRule = RuleBase & {
  type: typeof SUM_CAP_RULE
  fieldIds: string[]
  total: number
}

export type SimpleRule = RuleBase & {
  type: typeof SIMPLE_RULE
  fieldId: string
  operator: ComparisonOperator
  number: number
}

export type RangeRule = RuleBase & {
  type: typeof RANGE_RULE
  fieldId: string
  min: number
  max: number
}

export type FieldVsFieldRule = RuleBase & {
  type: typeof FIELD_VS_FIELD_RULE
  leftFieldId: string
  operator: ComparisonOperator
  rightFieldId: string
}

export type FieldVsFieldMultiplyRule = RuleBase & {
  type: typeof FIELD_VS_FIELD_MULTIPLY_RULE
  leftFieldId: string
  operator: ComparisonOperator
  rightFieldId: string
  multiplier: number
}

export type SumFieldsVsFieldRule = RuleBase & {
  type: typeof SUM_FIELDS_VS_FIELD_RULE
  fieldIds: string[]
  operator: ComparisonOperator
  fieldId: string
}

export type SumFieldsVsNumberRule = RuleBase & {
  type: typeof SUM_FIELDS_VS_NUMBER_RULE
  fieldIds: string[]
  operator: ComparisonOperator
  number: number
}

export type SumFieldsVsSumFieldsRule = RuleBase & {
  type: typeof SUM_FIELDS_VS_SUM_FIELDS_RULE
  leftFieldIds: string[]
  operator: ComparisonOperator
  rightFieldIds: string[]
}

export type SumFieldsVsFieldMultiplyRule = RuleBase & {
  type: typeof SUM_FIELDS_VS_FIELD_MULTIPLY_RULE
  fieldIds: string[]
  operator: ComparisonOperator
  fieldId: string
  multiplier: number
}

export type SumFieldsVsSumFieldsMultiplyRule = RuleBase & {
  type: typeof SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE
  leftFieldIds: string[]
  operator: ComparisonOperator
  rightFieldIds: string[]
  multiplier: number
}

export type BuilderRule =
  | SumCapRule
  | SimpleRule
  | RangeRule
  | FieldVsFieldRule
  | FieldVsFieldMultiplyRule
  | SumFieldsVsFieldRule
  | SumFieldsVsNumberRule
  | SumFieldsVsSumFieldsRule
  | SumFieldsVsFieldMultiplyRule
  | SumFieldsVsSumFieldsMultiplyRule

export type AddableRuleKind = Exclude<RuleKind, typeof SUM_CAP_RULE>

export type JsonLogicNode =
  | Record<string, unknown>
  | JsonLogicNode[]
  | string
  | number
  | boolean
  | null

export type BuilderStep = 1 | 2
