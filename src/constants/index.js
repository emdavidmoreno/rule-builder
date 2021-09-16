/**
 * Rule constants
 */
export const RANGE_RULE = 'RANGE_RULE';
export const SIMPLE_RULE = 'SIMPLE_RULE';
export const TOTAL_RULE = 'TOTAL_RULE';
export const PAX_VS_PAX_RULE = 'PAX_VS_PAX_RULE';
export const PAX_VS_PAX_MULTIPLY_RULE = 'PAX_VS_PAX_MULTIPLY_RULE';
export const SUM_PAX_VS_PAX_MULTIPLY_RULE = 'SUM_PAX_VS_PAX_MULTIPLY_RULE';
export const SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE = 'SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE';
export const SUM_PAX_VS_PAX_RULE = 'SUM_PAX_VS_PAX_RULE';
export const SUM_PAX_VS_NUMBER_RULE = 'SUM_PAX_VS_NUMBER_RULE';
export const SUM_PAX_VS_SUM_PAX_RULE = 'SUM_PAX_VS_SUM_PAX_RULE';

/**
 * Operator constants
 */
export const GREATER_THAN = '>';
export const GREATER_THAN_OR_EQUAL_TO = '>=';
export const LESS_THAN = '<';
export const LESS_THAN_OR_EQUAL_TO = '<=';
export const DOUBLE_EQUAL_TO = '==';

export const ADDITION = '+';
export const EQUAL_TO = '=';

/**
 * Rules format
 */

export const RULE_DEFAULT_FORMAT = 'default';
export const RULE_COMPACT_FORMAT = 'compact';
export const RULE_EXTENDED_FORMAT = 'extended';

/**
 * Dropdown Actions
 */

 export const DROPDOWN_ACTIONS = [
  {
    label: 'Simple rule',
    action: SIMPLE_RULE,
  },
  {
    label: 'Range rule',
    action: RANGE_RULE,
  },
  {
    label: 'Pax vs Pax rule',
    action: PAX_VS_PAX_RULE,
  },
  {
    label: 'Sum Pax vs pax rule',
    action: SUM_PAX_VS_PAX_RULE,
  },
  {
    label: 'Sum Pax vs Number rule',
    action: SUM_PAX_VS_NUMBER_RULE,
  },
  {
    label: 'Sum Pax vs Sum Pax rule',
    action: SUM_PAX_VS_SUM_PAX_RULE,
  },
  {
    label: 'Pax vs Pax Multiply Number rule',
    action: PAX_VS_PAX_MULTIPLY_RULE,
  },
  {
    label: 'Sum Pax vs Pax Multiply Number rule',
    action: SUM_PAX_VS_PAX_MULTIPLY_RULE,
  },
]



