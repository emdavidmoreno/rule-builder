import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { NumberInput } from "@/components/selectors/number-input"
import { OperatorSelect } from "@/components/selectors/operator-select"
import { PaxSelect } from "@/components/selectors/pax-select"
import {
  PAX_VS_PAX_MULTIPLY_RULE,
  PAX_VS_PAX_RULE,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_PAX_VS_NUMBER_RULE,
  SUM_PAX_VS_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_PAX_RULE,
  SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_SUM_PAX_RULE,
  type ComparisonOperator,
  type Passenger,
  type Rule,
} from "@/types/rule-builder"

type RuleFormProps = {
  rule: Rule
  passengers: Passenger[]
  onPatch: (key: string, value: string | number | string[]) => void
  onSave: () => void
}

function toArray(value: string | string[]) {
  return Array.isArray(value) ? value : [value]
}

export function RuleForm({ rule, passengers, onPatch, onSave }: RuleFormProps) {
  if (rule.type === "TOTAL_RULE") return null

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
      <FieldGroup className="flex-1 gap-3">
        {rule.type === SIMPLE_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-pax`}>Passenger</FieldLabel>
              <PaxSelect
                id={`${rule.id}-pax`}
                value={rule.pax}
                passengers={passengers}
                onChange={(value) => onPatch("pax", Array.isArray(value) ? value[0] : value)}
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
              <FieldLabel htmlFor={`${rule.id}-pax`}>Passenger</FieldLabel>
              <PaxSelect
                id={`${rule.id}-pax`}
                value={rule.pax}
                passengers={passengers}
                onChange={(value) => onPatch("pax", Array.isArray(value) ? value[0] : value)}
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

        {rule.type === PAX_VS_PAX_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left</FieldLabel>
              <PaxSelect
                id={`${rule.id}-left`}
                value={rule.leftPax}
                passengers={passengers}
                onChange={(value) => onPatch("leftPax", Array.isArray(value) ? value[0] : value)}
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
              <PaxSelect
                id={`${rule.id}-right`}
                value={rule.rightPax}
                passengers={passengers}
                onChange={(value) => onPatch("rightPax", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_PAX_VS_PAX_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-paxs`}>Sum of</FieldLabel>
              <PaxSelect
                id={`${rule.id}-paxs`}
                multiple
                value={rule.paxs}
                passengers={passengers}
                onChange={(value) => onPatch("paxs", toArray(value))}
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
              <FieldLabel htmlFor={`${rule.id}-pax`}>Passenger</FieldLabel>
              <PaxSelect
                id={`${rule.id}-pax`}
                value={rule.pax}
                passengers={passengers}
                onChange={(value) => onPatch("pax", Array.isArray(value) ? value[0] : value)}
              />
            </Field>
          </>
        )}

        {rule.type === SUM_PAX_VS_NUMBER_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-paxs`}>Sum of</FieldLabel>
              <PaxSelect
                id={`${rule.id}-paxs`}
                multiple
                value={rule.paxs}
                passengers={passengers}
                onChange={(value) => onPatch("paxs", toArray(value))}
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

        {rule.type === SUM_PAX_VS_SUM_PAX_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left sum</FieldLabel>
              <PaxSelect
                id={`${rule.id}-left`}
                multiple
                value={rule.leftPaxs}
                passengers={passengers}
                onChange={(value) => onPatch("leftPaxs", toArray(value))}
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
              <PaxSelect
                id={`${rule.id}-right`}
                multiple
                value={rule.rightPaxs}
                passengers={passengers}
                onChange={(value) => onPatch("rightPaxs", toArray(value))}
              />
            </Field>
          </>
        )}

        {rule.type === PAX_VS_PAX_MULTIPLY_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left</FieldLabel>
              <PaxSelect
                id={`${rule.id}-left`}
                value={rule.leftPax}
                passengers={passengers}
                onChange={(value) => onPatch("leftPax", Array.isArray(value) ? value[0] : value)}
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
              <PaxSelect
                id={`${rule.id}-right`}
                value={rule.rightPax}
                passengers={passengers}
                onChange={(value) => onPatch("rightPax", Array.isArray(value) ? value[0] : value)}
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

        {rule.type === SUM_PAX_VS_PAX_MULTIPLY_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-paxs`}>Sum of</FieldLabel>
              <PaxSelect
                id={`${rule.id}-paxs`}
                multiple
                value={rule.paxs}
                passengers={passengers}
                onChange={(value) => onPatch("paxs", toArray(value))}
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
              <FieldLabel htmlFor={`${rule.id}-pax`}>Passenger</FieldLabel>
              <PaxSelect
                id={`${rule.id}-pax`}
                value={rule.pax}
                passengers={passengers}
                onChange={(value) => onPatch("pax", Array.isArray(value) ? value[0] : value)}
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

        {rule.type === SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE && (
          <>
            <Field>
              <FieldLabel htmlFor={`${rule.id}-left`}>Left sum</FieldLabel>
              <PaxSelect
                id={`${rule.id}-left`}
                multiple
                value={rule.leftPaxs}
                passengers={passengers}
                onChange={(value) => onPatch("leftPaxs", toArray(value))}
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
              <PaxSelect
                id={`${rule.id}-right`}
                multiple
                value={rule.rightPaxs}
                passengers={passengers}
                onChange={(value) => onPatch("rightPaxs", toArray(value))}
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
