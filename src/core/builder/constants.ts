import {
  DOUBLE_EQUAL_TO,
  FIELD_VS_FIELD_MULTIPLY_RULE,
  FIELD_VS_FIELD_RULE,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN,
  LESS_THAN_OR_EQUAL_TO,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_FIELDS_VS_FIELD_MULTIPLY_RULE,
  SUM_FIELDS_VS_FIELD_RULE,
  SUM_FIELDS_VS_NUMBER_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_RULE,
  type AddableRuleKind,
  type ComparisonOperator,
} from "@/core/builder/types"

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
  { label: "Field vs Field rule", action: FIELD_VS_FIELD_RULE },
  { label: "Sum vs Field rule", action: SUM_FIELDS_VS_FIELD_RULE },
  { label: "Sum vs Number rule", action: SUM_FIELDS_VS_NUMBER_RULE },
  { label: "Sum vs Sum rule", action: SUM_FIELDS_VS_SUM_FIELDS_RULE },
  { label: "Field vs Field × Number rule", action: FIELD_VS_FIELD_MULTIPLY_RULE },
  { label: "Sum vs Field × Number rule", action: SUM_FIELDS_VS_FIELD_MULTIPLY_RULE },
  { label: "Sum vs Sum × Number rule", action: SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE },
]

export const DEFAULT_SUM_CAP = 9
