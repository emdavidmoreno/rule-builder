import type { JsonLogicNode } from "@/core/builder/types"

export const RULESET_VERSION = "1.0.0"

export type CompiledRule = {
  id: string
  label: string
  message: string
  logic: JsonLogicNode
  enabled: boolean
}

export type RuleSet = {
  version: string
  domainId: string
  rules: CompiledRule[]
}

export type EvaluationResult = {
  ok: boolean
  failed: { id: string; message: string }[]
}
