import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { NumberInput } from "@/components/selectors/number-input"
import { OperatorSelect } from "@/components/selectors/operator-select"
import { FieldSelect } from "@/components/selectors/field-select"
import {
  FIELD_VS_FIELD_MULTIPLY_RULE,
  FIELD_VS_FIELD_RULE,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_FIELDS_VS_FIELD_MULTIPLY_RULE,
  SUM_FIELDS_VS_FIELD_RULE,
  SUM_FIELDS_VS_NUMBER_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_RULE,
  type BuilderRule,
  type ComparisonOperator,
  type FieldValue,
} from "@/core/builder"

type RuleFormProps = {
  rule: BuilderRule
  fields: FieldValue[]
  onPatch: (key: string, value: string | number | string[]) => void
  onSave: () => void
}

function toArray(value: string | string[]) {
  return Array.isArray(value) ? value : [value]
}

export function RuleForm({ rule, fields, onPatch, onSave }: RuleFormProps) {
  if (rule.type === "SUM_CAP_RULE") return null

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
      <FieldGroup className="flex-1 gap-3">
        {rule.type === SIMPLE_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-field`}>Passenger</FieldLabel>
              <FieldSelect
                id={`${rule.id}-field`}
                value={rule.fieldId}
                fields={fields}
                onChange={(value) => onPatch("fieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-number`}>Number</FieldLabel>
              <NumberInput
                id={`${rule.id}-number`}
                value={rule.number}
                onChange={(value) => onPatch("number", value)}
              />
            </Field>
          </>
        )}

        {rule.type === RANGE_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-field`}>Passenger</FieldLabel>
              <FieldSelect
                id={`${rule.id}-field`}
                value={rule.fieldId}
                fields={fields}
                onChange={(value) => onPatch("fieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-min`}>Min</FieldLabel>
              <NumberInput
                id={`${rule.id}-min`}
                value={rule.min}
                onChange={(value) => onPatch("min", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-max`}>Max</FieldLabel>
              <NumberInput
                id={`${rule.id}-max`}
                value={rule.max}
                onChange={(value) => onPatch("max", value)}
              />
            </Field>
          </>
        )}

        {rule.type === FIELD_VS_FIELD_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left</FieldLabel>
              <FieldSelect
                id={`${rule.id}-left`}
                value={rule.leftFieldId}
                fields={fields}
                onChange={(value) => onPatch("leftFieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value: ComparisonOperator) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-right`}>Right</FieldLabel>
              <FieldSelect
                id={`${rule.id}-right`}
                value={rule.rightFieldId}
                fields={fields}
                onChange={(value) => onPatch("rightFieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_FIELDS_VS_FIELD_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-fieldIds`}>Sum of</FieldLabel>
              <FieldSelect
                id={`${rule.id}-fieldIds`}
                multiple
                value={rule.fieldIds}
                fields={fields}
                onChange={(value) => onPatch("fieldIds", toArray(value))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-field`}>Passenger</FieldLabel>
              <FieldSelect
                id={`${rule.id}-field`}
                value={rule.fieldId}
                fields={fields}
                onChange={(value) => onPatch("fieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_FIELDS_VS_NUMBER_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-fieldIds`}>Sum of</FieldLabel>
              <FieldSelect
                id={`${rule.id}-fieldIds`}
                multiple
                value={rule.fieldIds}
                fields={fields}
                onChange={(value) => onPatch("fieldIds", toArray(value))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-number`}>Number</FieldLabel>
              <NumberInput
                id={`${rule.id}-number`}
                value={rule.number}
                onChange={(value) => onPatch("number", value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_FIELDS_VS_SUM_FIELDS_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left sum</FieldLabel>
              <FieldSelect
                id={`${rule.id}-left`}
                multiple
                value={rule.leftFieldIds}
                fields={fields}
                onChange={(value) => onPatch("leftFieldIds", toArray(value))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-right`}>Right sum</FieldLabel>
              <FieldSelect
                id={`${rule.id}-right`}
                multiple
                value={rule.rightFieldIds}
                fields={fields}
                onChange={(value) => onPatch("rightFieldIds", toArray(value))}
              />
            </Field>
          </>
        )}

        {rule.type === FIELD_VS_FIELD_MULTIPLY_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left</FieldLabel>
              <FieldSelect
                id={`${rule.id}-left`}
                value={rule.leftFieldId}
                fields={fields}
                onChange={(value) => onPatch("leftFieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-right`}>Right</FieldLabel>
              <FieldSelect
                id={`${rule.id}-right`}
                value={rule.rightFieldId}
                fields={fields}
                onChange={(value) => onPatch("rightFieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-multiplier`}>Multiplier</FieldLabel>
              <NumberInput
                id={`${rule.id}-multiplier`}
                value={rule.multiplier}
                min={1}
                onChange={(value) => onPatch("multiplier", value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_FIELDS_VS_FIELD_MULTIPLY_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-fieldIds`}>Sum of</FieldLabel>
              <FieldSelect
                id={`${rule.id}-fieldIds`}
                multiple
                value={rule.fieldIds}
                fields={fields}
                onChange={(value) => onPatch("fieldIds", toArray(value))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-field`}>Passenger</FieldLabel>
              <FieldSelect
                id={`${rule.id}-field`}
                value={rule.fieldId}
                fields={fields}
                onChange={(value) => onPatch("fieldId", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-multiplier`}>Multiplier</FieldLabel>
              <NumberInput
                id={`${rule.id}-multiplier`}
                value={rule.multiplier}
                min={1}
                onChange={(value) => onPatch("multiplier", value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left sum</FieldLabel>
              <FieldSelect
                id={`${rule.id}-left`}
                multiple
                value={rule.leftFieldIds}
                fields={fields}
                onChange={(value) => onPatch("leftFieldIds", toArray(value))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-operator`}>Operator</FieldLabel>
              <OperatorSelect
                id={`${rule.id}-operator`}
                value={rule.operator}
                onChange={(value) => onPatch("operator", value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-right`}>Right sum</FieldLabel>
              <FieldSelect
                id={`${rule.id}-right`}
                multiple
                value={rule.rightFieldIds}
                fields={fields}
                onChange={(value) => onPatch("rightFieldIds", toArray(value))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-multiplier`}>Multiplier</FieldLabel>
              <NumberInput
                id={`${rule.id}-multiplier`}
                value={rule.multiplier}
                min={1}
                onChange={(value) => onPatch("multiplier", value)}
              />
            </Field>
          </>
        )}
      </FieldGroup>

      <Button type="button" size="icon" onClick={onSave} aria-label="Save rule">
        <CheckIcon />
      </Button>
    </div>
  )
}
