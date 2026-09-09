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
import { evaluateRules } from "@/lib/evaluate-rules"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function TravelerPlayground() {
  const { activePassengers, passengers, rules, dispatch } = useRuleBuilder()

  function canSetValue(key: string, value: number) {
    if (value < 0) return false
    const nextTravelers = passengers
      .filter((passenger) => passenger.isActive)
      .map((passenger) =>
        passenger.key === key ? { ...passenger, value } : passenger,
      )
    return evaluateRules(rules, nextTravelers)
  }

  function setValue(key: string, value: number) {
    if (!canSetValue(key, value)) return
    dispatch({ type: "setPassengerValue", key, value })
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
          {activePassengers.map((passenger) => {
            const decrementDisabled = !canSetValue(passenger.key, passenger.value - 1)
            const incrementDisabled = !canSetValue(passenger.key, passenger.value + 1)
            return (
              <Field key={passenger.key} orientation="horizontal">
                <FieldLabel htmlFor={`${passenger.key}-count`} className="min-w-28">
                  {passenger.label || passenger.key}
                </FieldLabel>
                <InputGroup className="max-w-40">
                  <InputGroupInput
                    id={`${passenger.key}-count`}
                    readOnly
                    value={String(passenger.value)}
                    aria-label={`${passenger.label || passenger.key} count`}
                  />
                  <InputGroupAddon align="inline-start">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={`Decrease ${passenger.label || passenger.key}`}
                      disabled={decrementDisabled}
                      onClick={() => setValue(passenger.key, passenger.value - 1)}
                    >
                      <MinusIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={`Increase ${passenger.label || passenger.key}`}
                      disabled={incrementDisabled}
                      onClick={() => setValue(passenger.key, passenger.value + 1)}
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
