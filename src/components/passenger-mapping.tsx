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
  const { fields, dispatch } = useRuleBuilder()

  return (
    <FieldSet>
      <FieldLegend>Passenger mapping</FieldLegend>
      <FieldDescription>
        Enable passenger types and name them. Age 1 stays required as the adult slot.
      </FieldDescription>
      <FieldGroup className="gap-3">
        {fields.map((field, index) => {
          const disabled = index === 0
          return (
            <Field
              key={field.id}
              orientation="horizontal"
              data-disabled={disabled || undefined}
            >
              <Checkbox
                id={`${field.id}-active`}
                checked={field.isActive}
                disabled={disabled}
                onCheckedChange={(checked) =>
                  dispatch({
                    type: "toggleField",
                    id: field.id,
                    isActive: Boolean(checked),
                  })
                }
              />
              <FieldLabel htmlFor={`${field.id}-active`} className="min-w-28">
                Passenger {index + 1}
              </FieldLabel>
              <Input
                id={`${field.id}-label`}
                placeholder="Label"
                value={field.label}
                disabled={!field.isActive}
                onChange={(event) =>
                  dispatch({
                    type: "setFieldLabel",
                    id: field.id,
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
