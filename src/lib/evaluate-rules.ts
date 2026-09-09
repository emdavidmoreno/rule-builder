import { apply, type RulesLogic } from "json-logic-js"

import { convertRulesToJS } from "@/lib/convert-rules"
import type { Passenger, Rule } from "@/types/rule-builder"

export function evaluateRules(rules: Rule[] = [], travelers: Passenger[] = []) {
  const data: Record<string, number> = {}
  for (const traveler of travelers) {
    data[traveler.key] = traveler.value
  }

  try {
    return Boolean(
      apply(
        {
          and: convertRulesToJS(rules),
        } as RulesLogic,
        data,
      ),
    )
  } catch {
    return false
  }
}
