import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function FieldMapping() {
  const { fields, manifest, dispatch } = useRuleBuilder()

  return (
    <FieldSet>
      <FieldLegend>Field mapping</FieldLegend>
      <FieldDescription>
        Enable the categories this rule set uses. Required fields stay on.
      </FieldDescription>
      <FieldGroup className="gap-3">
        {fields.map((field) => {
          const def = manifest.fields.find((item) => item.id === field.id)
          const disabled = def?.required === true
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
                {field.label}
              </FieldLabel>
              {def?.helpText ? (
                <FieldDescription>{def.helpText}</FieldDescription>
              ) : null}
            </Field>
          )
        })}
      </FieldGroup>
    </FieldSet>
  )
}
