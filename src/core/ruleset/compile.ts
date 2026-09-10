import { convertRuleToJS, isEmptyRule } from "@/core/engine/convert-rules"
import { RULESET_VERSION, type CompiledRule, type RuleSet } from "@/core/ruleset/types"
import type { BuilderRule } from "@/core/builder/types"

export function compileBuilderRule(rule: BuilderRule): CompiledRule {
  return {
    id: rule.id,
    label: rule.label,
    message: rule.message,
    logic: convertRuleToJS(rule),
    enabled: rule.enabled,
  }
}

export function compileRuleSet(domainId: string, rules: BuilderRule[]): RuleSet {
  return {
    version: RULESET_VERSION,
    domainId,
    rules: rules.map(compileBuilderRule).filter((rule) => !isEmptyRule(rule.logic)),
  }
}
