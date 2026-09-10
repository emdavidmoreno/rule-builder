import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FieldValue } from "@/core/builder"

type FieldSelectProps = {
  id: string
  value: string | string[]
  multiple?: boolean
  fields: FieldValue[]
  onChange: (value: string | string[]) => void
}

export function FieldSelect({
  id,
  value,
  multiple = false,
  fields,
  onChange,
}: FieldSelectProps) {
  const items = fields.map((field) => ({
    label: field.label || field.id,
    value: field.id,
  }))

  if (multiple) {
    const selected = Array.isArray(value) ? value : []
    return (
      <Select
        items={items}
        multiple
        value={selected}
        onValueChange={(next) => onChange(next)}
      >
        <SelectTrigger id={id} className="w-full min-w-0">
          <SelectValue>
            {(current: string[]) =>
              current.length === 0
                ? "Select fields"
                : current
                    .map(
                      (key) =>
                        items.find((item) => item.value === key)?.label ?? key,
                    )
                    .join(", ")
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  const selected = Array.isArray(value) ? value[0] : value
  return (
    <Select
      items={items}
      value={selected}
      onValueChange={(next) => {
        if (next) onChange(next)
      }}
    >
      <SelectTrigger id={id} className="w-full min-w-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
