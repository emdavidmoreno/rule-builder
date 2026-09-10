import type { ComponentType } from "react"

import type { AddableRuleKind, BuilderRule, JsonLogicNode } from "@/core/builder/types"

export type FieldType = "counter" | "number" | "boolean" | "enum" | "string" | "date"

export type FieldOption = {
  value: string
  label: string
}

export type FieldDef = {
  id: string
  label: string
  type: FieldType
  min?: number
  max?: number
  options?: FieldOption[]
  defaultValue?: unknown
  helpText?: string
  required?: boolean
  derived?: (data: Record<string, unknown>) => unknown
}

export type FieldGroupDef = {
  id: string
  label: string
  fieldIds: string[]
}

export type RuleTemplate = {
  id: string
  label: string
  kind: AddableRuleKind
  description?: string
}

export type SampleCase = {
  label: string
  data: Record<string, unknown>
}

export type EvaluationResult = {
  ok: boolean
  failed: { id: string; message: string }[]
}

export type PlaygroundProps = {
  fields: FieldDef[]
  data: Record<string, unknown>
  onChange: (data: Record<string, unknown>) => void
  result: EvaluationResult
}

export type DomainManifest = {
  id: string
  name: string
  description: string
  status: "stable" | "draft"
  icon?: string
  fields: FieldDef[]
  groups?: FieldGroupDef[]
  ruleTemplates: RuleTemplate[]
  presetRules: BuilderRule[]
  sampleCases: SampleCase[]
  Playground: ComponentType<PlaygroundProps>
}

export type JsonLogicRule = JsonLogicNode
