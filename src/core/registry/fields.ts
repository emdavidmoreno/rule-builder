import type { FieldValue } from "@/core/builder/types"
import type { FieldDef } from "@/core/registry/types"

export function fieldsFromDefs(defs: FieldDef[]): FieldValue[] {
  return defs.map((def) => ({
    id: def.id,
    label: def.label,
    value: typeof def.defaultValue === "number" ? def.defaultValue : 0,
    isActive: true,
  }))
}

export function dataFromFields(fields: FieldValue[]): Record<string, unknown> {
  const data: Record<string, unknown> = {}
  for (const field of fields) {
    data[field.id] = field.value
  }
  return data
}

export function applyDataToFields(
  fields: FieldValue[],
  data: Record<string, unknown>,
): FieldValue[] {
  return fields.map((field) => {
    const next = data[field.id]
    if (typeof next !== "number" || !Number.isFinite(next)) return field
    return { ...field, value: next }
  })
}

export function applyDerivedFields(
  defs: FieldDef[],
  data: Record<string, unknown>,
): Record<string, unknown> {
  const next = { ...data }
  for (const def of defs) {
    if (def.derived) {
      next[def.id] = def.derived(next)
    }
  }
  return next
}
