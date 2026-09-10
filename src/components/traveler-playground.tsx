import { MinusIcon, PlusIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { evaluateRules } from "@/core/engine"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function TravelerPlayground() {
  const { activeFields, fields, rules, dispatch } = useRuleBuilder()

  function canSetValue(id: string, value: number) {
    if (value < 0) return false
    const nextFields = fields
      .filter((field) => field.isActive)
      .map((field) => (field.id === id ? { ...field, value } : field))
    return evaluateRules(rules, nextFields)
  }

  function setValue(id: string, value: number) {
    if (!canSetValue(id, value)) return
    dispatch({ type: "setFieldValue", id, value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live passengers</CardTitle>
        <CardDescription>
          Adjust counts to test the generated JsonLogic. Invalid changes are blocked.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Alert>
          <AlertTitle>Playground</AlertTitle>
          <AlertDescription>
            Increment and decrement only commit when every rule still evaluates to true.
          </AlertDescription>
        </Alert>
        <FieldGroup className="gap-3">
          {activeFields.map((field) => {
            const decrementDisabled = !canSetValue(field.id, field.value - 1)
            const incrementDisabled = !canSetValue(field.id, field.value + 1)
            return (
              <Field key={field.id} orientation="horizontal">
                <FieldLabel htmlFor={`${field.id}-count`} className="min-w-28">
                  {field.label || field.id}
                </FieldLabel>
                <InputGroup className="max-w-40">
                  <InputGroupInput
                    id={`${field.id}-count`}
                    readOnly
                    value={String(field.value)}
                    aria-label={`${field.label || field.id} count`}
                  />
                  <InputGroupAddon align="inline-start">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={`Decrease ${field.label || field.id}`}
                      disabled={decrementDisabled}
                      onClick={() => setValue(field.id, field.value - 1)}
                    >
                      <MinusIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={`Increase ${field.label || field.id}`}
                      disabled={incrementDisabled}
                      onClick={() => setValue(field.id, field.value + 1)}
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
