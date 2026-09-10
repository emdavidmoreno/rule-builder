import { apply, type RulesLogic } from "json-logic-js"

import { applyDerivedFields } from "@/core/registry/fields"
import type { FieldDef } from "@/core/registry/types"
import { compileRuleSet } from "@/core/ruleset/compile"
import type { EvaluationResult } from "@/core/ruleset/types"
import type { BuilderRule } from "@/core/builder/types"

export function evaluateRuleSet(
  domainId: string,
  rules: BuilderRule[],
  data: Record<string, unknown>,
  fieldDefs: FieldDef[] = [],
): EvaluationResult {
  const derived = applyDerivedFields(fieldDefs, data)
  const ruleSet = compileRuleSet(domainId, rules)
  const failed: EvaluationResult["failed"] = []

  for (const rule of ruleSet.rules) {
    if (!rule.enabled) continue
    try {
      const passed = Boolean(apply(rule.logic as RulesLogic, derived))
      if (!passed) {
        failed.push({ id: rule.id, message: rule.message })
      }
    } catch {
      failed.push({ id: rule.id, message: rule.message })
    }
  }

  return { ok: failed.length === 0, failed }
}
