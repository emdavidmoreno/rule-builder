import { convertRulesToJS } from "@/core/engine/convert-rules"
import {
  RULE_COMPACT_FORMAT,
  RULE_DEFAULT_FORMAT,
  type BuilderRule,
  type RuleFormat,
} from "@/core/builder/types"

export function convertRulesToString(
  rules: BuilderRule[] = [],
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
