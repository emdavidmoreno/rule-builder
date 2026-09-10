import { apply, type RulesLogic } from "json-logic-js"

import { convertRulesToJS } from "@/core/engine/convert-rules"
import type { BuilderRule, FieldValue } from "@/core/builder/types"

export function fieldsToData(fields: FieldValue[] = []): Record<string, number> {
  const data: Record<string, number> = {}
  for (const field of fields) {
    data[field.id] = field.value
  }
  return data
}

export function evaluateRules(rules: BuilderRule[] = [], fields: FieldValue[] = []) {
  try {
    return Boolean(
      apply(
        {
          and: convertRulesToJS(rules),
        } as RulesLogic,
        fieldsToData(fields),
      ),
    )
  } catch {
    return false
  }
}
