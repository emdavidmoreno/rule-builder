import { MinusIcon, PlusIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import type { PlaygroundProps } from "@/core/registry/types"
import { AIRLINE_SAMPLE_CASES } from "@/domains/airline/presets"

function counterValue(data: Record<string, unknown>, id: string) {
  const value = data[id]
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

export function AirlinePlayground({ fields, data, onChange, result }: PlaygroundProps) {
  function setValue(id: string, value: number) {
    const def = fields.find((field) => field.id === id)
    const min = def?.min ?? 0
    const max = def?.max
    if (value < min) return
    if (max !== undefined && value > max) return
    onChange({ ...data, [id]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live passengers</CardTitle>
        <CardDescription>
          Adjust counts to test the generated JsonLogic. Failed rules show their messages below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {result.ok ? (
          <Alert>
            <AlertTitle>All rules passed</AlertTitle>
            <AlertDescription>
              Current counts satisfy every enabled rule.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <AlertTitle>Rules failed</AlertTitle>
            <AlertDescription>
              <ul className="flex flex-col gap-1">
                {result.failed.map((item) => (
                  <li key={item.id}>{item.message}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        {AIRLINE_SAMPLE_CASES.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {AIRLINE_SAMPLE_CASES.map((sample) => (
              <Button
                key={sample.label}
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChange(sample.data)}
              >
                {sample.label}
              </Button>
            ))}
          </div>
        )}
        <FieldGroup className="gap-3">
          {fields.map((field) => {
            const value = counterValue(data, field.id)
            const min = field.min ?? 0
            const max = field.max
            const decrementDisabled = value - 1 < min
            const incrementDisabled = max !== undefined && value + 1 > max
            return (
              <Field key={field.id} orientation="horizontal">
                <FieldLabel htmlFor={`${field.id}-count`} className="min-w-28">
                  {field.label}
                </FieldLabel>
                <InputGroup className="max-w-40">
                  <InputGroupInput
                    id={`${field.id}-count`}
                    readOnly
                    value={String(value)}
                    aria-label={`${field.label} count`}
                  />
                  <InputGroupAddon align="inline-start">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={`Decrease ${field.label}`}
                      disabled={decrementDisabled}
                      onClick={() => setValue(field.id, value - 1)}
                    >
                      <MinusIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={`Increase ${field.label}`}
                      disabled={incrementDisabled}
                      onClick={() => setValue(field.id, value + 1)}
                    >
                      <PlusIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )
          })}
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
