export const RANGE_RULE = "RANGE_RULE"
export const SIMPLE_RULE = "SIMPLE_RULE"
export const TOTAL_RULE = "TOTAL_RULE"
export const PAX_VS_PAX_RULE = "PAX_VS_PAX_RULE"
export const PAX_VS_PAX_MULTIPLY_RULE = "PAX_VS_PAX_MULTIPLY_RULE"
export const SUM_PAX_VS_PAX_MULTIPLY_RULE = "SUM_PAX_VS_PAX_MULTIPLY_RULE"
export const SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE = "SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE"
export const SUM_PAX_VS_PAX_RULE = "SUM_PAX_VS_PAX_RULE"
export const SUM_PAX_VS_NUMBER_RULE = "SUM_PAX_VS_NUMBER_RULE"
export const SUM_PAX_VS_SUM_PAX_RULE = "SUM_PAX_VS_SUM_PAX_RULE"

export type RuleKind =
  | typeof RANGE_RULE
  | typeof SIMPLE_RULE
  | typeof TOTAL_RULE
  | typeof PAX_VS_PAX_RULE
  | typeof PAX_VS_PAX_MULTIPLY_RULE
  | typeof SUM_PAX_VS_PAX_MULTIPLY_RULE
  | typeof SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE
  | typeof SUM_PAX_VS_PAX_RULE
  | typeof SUM_PAX_VS_NUMBER_RULE
  | typeof SUM_PAX_VS_SUM_PAX_RULE

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

export type Passenger = {
  key: string
  label: string
  value: number
  isActive: boolean
}

export type Tenant = {
  code: string
  name: string
  hasFc: boolean
}

type RuleBase = {
  id: string
  isEditing: boolean
}

export type TotalRule = RuleBase & {
  type: typeof TOTAL_RULE
  paxs: string[]
  total: number
}

export type SimpleRule = RuleBase & {
  type: typeof SIMPLE_RULE
  pax: string
  operator: ComparisonOperator
  number: number
}

export type RangeRule = RuleBase & {
  type: typeof RANGE_RULE
  pax: string
  min: number
  max: number
}

export type PaxVsPaxRule = RuleBase & {
  type: typeof PAX_VS_PAX_RULE
  leftPax: string
  operator: ComparisonOperator
  rightPax: string
}

export type PaxVsPaxMultiplyRule = RuleBase & {
  type: typeof PAX_VS_PAX_MULTIPLY_RULE
  leftPax: string
  operator: ComparisonOperator
  rightPax: string
  multiplier: number
}

export type SumPaxVsPaxRule = RuleBase & {
  type: typeof SUM_PAX_VS_PAX_RULE
  paxs: string[]
  operator: ComparisonOperator
  pax: string
}

export type SumPaxVsNumberRule = RuleBase & {
  type: typeof SUM_PAX_VS_NUMBER_RULE
  paxs: string[]
  operator: ComparisonOperator
  number: number
}

export type SumPaxVsSumPaxRule = RuleBase & {
  type: typeof SUM_PAX_VS_SUM_PAX_RULE
  leftPaxs: string[]
  operator: ComparisonOperator
  rightPaxs: string[]
}

export type SumPaxVsPaxMultiplyRule = RuleBase & {
  type: typeof SUM_PAX_VS_PAX_MULTIPLY_RULE
  paxs: string[]
  operator: ComparisonOperator
  pax: string
  multiplier: number
}

export type SumPaxVsSumPaxMultiplyRule = RuleBase & {
  type: typeof SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE
  leftPaxs: string[]
  operator: ComparisonOperator
  rightPaxs: string[]
  multiplier: number
}

export type Rule =
  | TotalRule
  | SimpleRule
  | RangeRule
  | PaxVsPaxRule
  | PaxVsPaxMultiplyRule
  | SumPaxVsPaxRule
  | SumPaxVsNumberRule
  | SumPaxVsSumPaxRule
  | SumPaxVsPaxMultiplyRule
  | SumPaxVsSumPaxMultiplyRule

export type AddableRuleKind = Exclude<RuleKind, typeof TOTAL_RULE>

export type JsonLogicNode = Record<string, unknown> | JsonLogicNode[] | string | number | boolean | null

export type BuilderStep = 1 | 2
