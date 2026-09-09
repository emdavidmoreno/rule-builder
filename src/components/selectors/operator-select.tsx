import { COMPARISON_OPERATORS } from "@/constants"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ComparisonOperator } from "@/types/rule-builder"

const items = COMPARISON_OPERATORS.map((operator) => ({
  label: operator,
  value: operator,
}))

type OperatorSelectProps = {
  id: string
  value: ComparisonOperator
  onChange: (value: ComparisonOperator) => void
}

export function OperatorSelect({ id, value, onChange }: OperatorSelectProps) {
  return (
    <Select
      items={items}
      value={value}
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
