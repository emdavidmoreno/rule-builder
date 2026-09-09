import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function PassengerMapping() {
  const { passengers, dispatch } = useRuleBuilder()

  return (
    <FieldSet>
      <FieldLegend>Passenger mapping</FieldLegend>
      <FieldDescription>
        Enable passenger types and name them. Age 1 stays required as the adult slot.
      </FieldDescription>
      <FieldGroup className="gap-3">
        {passengers.map((passenger, index) => {
          const disabled = index === 0
          return (
            <Field
              key={passenger.key}
              orientation="horizontal"
              data-disabled={disabled || undefined}
            >
              <Checkbox
                id={`${passenger.key}-active`}
                checked={passenger.isActive}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: "togglePassenger",
                    key: passenger.key,
                    isActive: Boolean(checked),
                  })
                }
              />
              <FieldLabel htmlFor={`${passenger.key}-active`} className="min-w-28">
                Passenger {index + 1}
              </FieldLabel>
              <Input
                id={`${passenger.key}-label`}
                placeholder="Label"
                value={passenger.label}
                disabled={!passenger.isActive}
                onChange={(event) =>
                  dispatch({
                    type: "setPassengerLabel",
                    key: passenger.key,
                    label: event.currentTarget.value,
                  })
                }
              />
            </Field>
          )
        })}
      </FieldGroup>
    </FieldSet>
  )
}
