import type { FieldValue } from "@/core/builder/types"

export function fieldLabel(fields: FieldValue[], id: string) {
  return fields.find((field) => field.id === id)?.label || id
}
