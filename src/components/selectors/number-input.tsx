import { Input } from "@/components/ui/input"

type NumberInputProps = {
  id: string
  value: number
  min?: number
  onChange: (value: number) => void
}

export function NumberInput({ id, value, min = 0, onChange }: NumberInputProps) {
  return (
    <Input
      id={id}
      type="number"
      min={min}
      value={Number.isFinite(value) ? String(value) : "0"}
      onChange={(event) => {
        const next = Number(event.currentTarget.value)
        onChange(Number.isFinite(next) ? next : 0)
      }}
    />
  )
}
