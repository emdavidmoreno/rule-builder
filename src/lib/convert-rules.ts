import {
  PAX_VS_PAX_MULTIPLY_RULE,
  PAX_VS_PAX_RULE,
  RANGE_RULE,
  RULE_COMPACT_FORMAT,
  RULE_DEFAULT_FORMAT,
  SIMPLE_RULE,
  SUM_PAX_VS_NUMBER_RULE,
  SUM_PAX_VS_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_PAX_RULE,
  SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_SUM_PAX_RULE,
  TOTAL_RULE,
  type ComparisonOperator,
  type JsonLogicNode,
  type Rule,
  type RuleFormat,
} from "@/types/rule-builder"

type JsonLogicObject = Record<string, unknown>

function vars(keys: string[]) {
  return keys.map((key) => ({ var: key }))
}

export function totalRule(passengers: string[] = [], total = 9): JsonLogicObject {
  if (!passengers.length || total < 0) return {}
  return { "<=": [{ "+": vars(passengers) }, total] }
}

export function rangeRulePassengerValueValue(
  passenger = "",
  minval = 0,
  maxval = 9,
): JsonLogicObject {
  if (passenger === "" || minval < 0 || maxval < 0) return {}
  return {
    and: [
      { ">=": [{ var: passenger }, minval] },
      { "<=": [{ var: passenger }, maxval] },
    ],
  }
}

function simpleRulePassengerValue(
  operator: ComparisonOperator = "<=",
  passenger = "",
  value = 9,
): JsonLogicObject {
  if (passenger === "") return {}
  return { [operator]: [{ var: passenger }, value] }
}

function simpleRulePassengerPassenger(
  operator: ComparisonOperator = "<=",
  passengerLeft = "",
  passengerRight = "",
): JsonLogicObject {
  if (passengerLeft === "" || passengerRight === "") return {}
  return { [operator]: [{ var: passengerLeft }, { var: passengerRight }] }
}

function multiplyRulePassengerPassengerByValue(
  operator: ComparisonOperator = "<=",
  passengerLeft = "",
  passengerRight = "",
  multiplyValue = 1,
): JsonLogicObject {
  if (passengerLeft === "" || passengerRight === "") return {}
  return {
    [operator]: [{ var: passengerLeft }, { "*": [{ var: passengerRight }, multiplyValue] }],
  }
}

function sumRulePassengersValue(
  operator: ComparisonOperator = "<=",
  passengers: string[] = [],
  value = 0,
): JsonLogicObject {
  if (!passengers.length) return {}
  return { [operator]: [{ "+": vars(passengers) }, value] }
}

function sumRulePassengerPassengers(
  operator: ComparisonOperator = "<=",
  passenger = "",
  passengers: string[] = [],
): JsonLogicObject {
  if (!passengers.length || passenger === "") return {}
  return { [operator]: [{ "+": vars(passengers) }, { var: passenger }] }
}

function sumRulePassengersLeftPassengersRight(
  operator: ComparisonOperator = "<=",
  passengersLeft: string[] = [],
  passengersRight: string[] = [],
): JsonLogicObject {
  if (!passengersLeft.length || !passengersRight.length) return {}
  return {
    [operator]: [{ "+": vars(passengersLeft) }, { "+": vars(passengersRight) }],
  }
}

function multiplyRulePassengersPassengerByValue(
  operator: ComparisonOperator = "<=",
  passengers: string[] = [],
  passenger = "",
  multiplyValue = 1,
): JsonLogicObject {
  if (!passengers.length || passenger === "") return {}
  return {
    [operator]: [{ "+": vars(passengers) }, { "*": [{ var: passenger }, multiplyValue] }],
  }
}

function multiplyRulePassengersPassengersByValue(
  operator: ComparisonOperator = "<=",
  passengersLeft: string[] = [],
  passengersRight: string[] = [],
  multiplyValue = 1,
): JsonLogicObject {
  if (!passengersLeft.length || !passengersRight.length) return {}
  return {
    [operator]: [
      { "+": vars(passengersLeft) },
      { "*": [{ "+": vars(passengersRight) }, multiplyValue] },
    ],
  }
}

function isEmptyRule(node: JsonLogicNode) {
  return (
    node === "" ||
    (typeof node === "object" &&
      node !== null &&
      !Array.isArray(node) &&
      Object.keys(node).length === 0)
  )
}

export function convertRuleToJS(rule: Rule): JsonLogicNode {
  switch (rule.type) {
    case TOTAL_RULE:
      return totalRule(rule.paxs, rule.total)
    case RANGE_RULE:
      return rangeRulePassengerValueValue(rule.pax, rule.min, rule.max)
    case SIMPLE_RULE:
      return simpleRulePassengerValue(rule.operator, rule.pax, rule.number)
    case PAX_VS_PAX_RULE:
      return simpleRulePassengerPassenger(rule.operator, rule.leftPax, rule.rightPax)
    case SUM_PAX_VS_NUMBER_RULE:
      return sumRulePassengersValue(rule.operator, rule.paxs, rule.number)
    case SUM_PAX_VS_SUM_PAX_RULE:
      return sumRulePassengersLeftPassengersRight(
        rule.operator,
        rule.leftPaxs,
        rule.rightPaxs,
      )
    case SUM_PAX_VS_PAX_RULE:
      return sumRulePassengerPassengers(rule.operator, rule.pax, rule.paxs)
    case PAX_VS_PAX_MULTIPLY_RULE:
      return multiplyRulePassengerPassengerByValue(
        rule.operator,
        rule.leftPax,
        rule.rightPax,
        rule.multiplier,
      )
    case SUM_PAX_VS_PAX_MULTIPLY_RULE:
      return multiplyRulePassengersPassengerByValue(
        rule.operator,
        rule.paxs,
        rule.pax,
        rule.multiplier,
      )
    case SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE:
      return multiplyRulePassengersPassengersByValue(
        rule.operator,
        rule.leftPaxs,
        rule.rightPaxs,
        rule.multiplier,
      )
    default:
      return {}
  }
}

export function convertRulesToJS(rules: Rule[] = []): JsonLogicNode[] {
  return rules.map(convertRuleToJS).filter((node) => !isEmptyRule(node))
}

export function convertRulesToString(
  rules: Rule[] = [],
  format: RuleFormat = RULE_DEFAULT_FORMAT,
) {
  try {
    const jsonRules = convertRulesToJS(rules)
    if (format === RULE_DEFAULT_FORMAT) {
      const result = jsonRules.map((rule) => JSON.stringify(rule)).join(",\n ")
      return `{\n"and":[\n ${result}\n]}`
    }
    const wrapped = { and: jsonRules }
    if (format === RULE_COMPACT_FORMAT) {
      return JSON.stringify(wrapped)
    }
    return JSON.stringify(wrapped, undefined, 2)
  } catch {
    return ""
  }
}
