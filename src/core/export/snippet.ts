import type { FieldDef } from "@/core/registry/types"
import type { RuleSet } from "@/core/ruleset/types"

function deriveFunction(fieldDefs: FieldDef[]) {
  const derivedIds = fieldDefs.filter((field) => field.derived).map((field) => field.id)
  if (derivedIds.length === 0) {
    return `function derive(data) {
  return data
}`
  }

  return `function derive(data) {
  const next = { ...data }
  // json-logic-js has no date arithmetic. Compute derived fields here
  // (${derivedIds.join(", ")}) before apply(). Do not add custom operators —
  // that would make the exported JSON unusable in a stock json-logic runtime.
  return next
}`
}

export function toRunnableSnippet(ruleSet: RuleSet, fieldDefs: FieldDef[] = []) {
  return `import jsonLogic from "json-logic-js"

const ruleSet = ${JSON.stringify(ruleSet, null, 2)}

${deriveFunction(fieldDefs)}

export function evaluateOccupancy(data) {
  const input = derive(data)
  const failed = []

  for (const rule of ruleSet.rules) {
    if (!rule.enabled) continue
    if (!jsonLogic.apply(rule.logic, input)) {
      failed.push({ id: rule.id, message: rule.message })
    }
  }

  return { ok: failed.length === 0, failed }
}

// const result = evaluateOccupancy({ adults: 2, children: 1 })
// if (!result.ok) console.error(result.failed)
`
}
