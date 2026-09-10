import type { RuleSet } from "@/core/ruleset/types"

export function toRuleSetJson(ruleSet: RuleSet, pretty = true) {
  return pretty ? JSON.stringify(ruleSet, null, 2) : JSON.stringify(ruleSet)
}
