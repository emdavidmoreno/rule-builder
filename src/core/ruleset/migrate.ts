import { createId } from "@/core/builder/create-rule"
import type { JsonLogicNode } from "@/core/builder/types"
import { RULESET_VERSION, type CompiledRule, type RuleSet } from "@/core/ruleset/types"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isCompiledRule(value: unknown): value is CompiledRule {
  if (!isRecord(value)) return false
  return (
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    typeof value.message === "string" &&
    typeof value.enabled === "boolean" &&
    "logic" in value
  )
}

function isRuleSet(value: unknown): value is RuleSet {
  if (!isRecord(value)) return false
  return (
    typeof value.version === "string" &&
    typeof value.domainId === "string" &&
    Array.isArray(value.rules) &&
    value.rules.every(isCompiledRule)
  )
}

function wrapNode(logic: JsonLogicNode, index: number): CompiledRule {
  return {
    id: createId(),
    label: `Rule ${index + 1}`,
    message: `Rule ${index + 1} failed.`,
    logic,
    enabled: true,
  }
}

export function migrateRuleSet(input: unknown, domainId: string): RuleSet {
  if (isRuleSet(input)) {
    return {
      ...input,
      domainId: input.domainId || domainId,
      version: input.version || RULESET_VERSION,
    }
  }

  if (isRecord(input) && Array.isArray(input.and)) {
    return {
      version: RULESET_VERSION,
      domainId,
      rules: input.and.map((node, index) => wrapNode(node as JsonLogicNode, index)),
    }
  }

  if (Array.isArray(input)) {
    return {
      version: RULESET_VERSION,
      domainId,
      rules: input.map((node, index) => wrapNode(node as JsonLogicNode, index)),
    }
  }

  if (isRecord(input) && "var" in input === false) {
    return {
      version: RULESET_VERSION,
      domainId,
      rules: [wrapNode(input as JsonLogicNode, 0)],
    }
  }

  return { version: RULESET_VERSION, domainId, rules: [] }
}
