import {
  DOUBLE_EQUAL_TO,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN,
  LESS_THAN_OR_EQUAL_TO,
  PAX_VS_PAX_MULTIPLY_RULE,
  PAX_VS_PAX_RULE,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_PAX_VS_NUMBER_RULE,
  SUM_PAX_VS_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_PAX_RULE,
  SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_SUM_PAX_RULE,
  type AddableRuleKind,
  type ComparisonOperator,
} from "@/types/rule-builder"

export const COMPARISON_OPERATORS: ComparisonOperator[] = [
  DOUBLE_EQUAL_TO,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN,
  LESS_THAN_OR_EQUAL_TO,
]

export const DROPDOWN_ACTIONS: { label: string; action: AddableRuleKind }[] = [
  { label: "Simple rule", action: SIMPLE_RULE },
  { label: "Range rule", action: RANGE_RULE },
  { label: "Pax vs Pax rule", action: PAX_VS_PAX_RULE },
  { label: "Sum Pax vs Pax rule", action: SUM_PAX_VS_PAX_RULE },
  { label: "Sum Pax vs Number rule", action: SUM_PAX_VS_NUMBER_RULE },
  { label: "Sum Pax vs Sum Pax rule", action: SUM_PAX_VS_SUM_PAX_RULE },
  { label: "Pax vs Pax × Number rule", action: PAX_VS_PAX_MULTIPLY_RULE },
  { label: "Sum Pax vs Pax × Number rule", action: SUM_PAX_VS_PAX_MULTIPLY_RULE },
  { label: "Sum Pax vs Sum Pax × Number rule", action: SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE },
]

export const PASSENGER_SLOT_COUNT = 9
export const DEFAULT_TOTAL_PASSENGERS = 9
