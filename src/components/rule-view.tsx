import { PencilIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  fieldLabel,
  FIELD_VS_FIELD_MULTIPLY_RULE,
  FIELD_VS_FIELD_RULE,
  LESS_THAN_OR_EQUAL_TO,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_FIELDS_VS_FIELD_MULTIPLY_RULE,
  SUM_FIELDS_VS_FIELD_RULE,
  SUM_FIELDS_VS_NUMBER_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE,
  SUM_FIELDS_VS_SUM_FIELDS_RULE,
  type BuilderRule,
  type FieldValue,
} from "@/core/builder"

type RuleViewProps = {
  rule: BuilderRule
  fields: FieldValue[]
  onEdit: () => void
  onRemove: () => void
}

function SumLabel({ keys, fields }: { keys: string[]; fields: FieldValue[] }) {
  return (
    <span>
      Sum[{keys.map((id) => fieldLabel(fields, id)).join(", ")}]
    </span>
  )
}

function RuleSummary({ rule, fields }: { rule: BuilderRule; fields: FieldValue[] }) {
  switch (rule.type) {
    case SIMPLE_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{fieldLabel(fields, rule.fieldId)}</span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{rule.number}</span>
        </p>
      )
    case RANGE_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{rule.min}</span>
          <span className="text-muted-foreground">{LESS_THAN_OR_EQUAL_TO}</span>
          <span className="font-medium">{fieldLabel(fields, rule.fieldId)}</span>
          <span className="text-muted-foreground">{LESS_THAN_OR_EQUAL_TO}</span>
          <span className="font-medium">{rule.max}</span>
        </p>
      )
    case FIELD_VS_FIELD_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{fieldLabel(fields, rule.leftFieldId)}</span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{fieldLabel(fields, rule.rightFieldId)}</span>
        </p>
      )
    case SUM_FIELDS_VS_FIELD_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.fieldIds} fields={fields} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{fieldLabel(fields, rule.fieldId)}</span>
        </p>
      )
    case SUM_FIELDS_VS_NUMBER_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.fieldIds} fields={fields} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{rule.number}</span>
        </p>
      )
    case SUM_FIELDS_VS_SUM_FIELDS_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.leftFieldIds} fields={fields} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">
            <SumLabel keys={rule.rightFieldIds} fields={fields} />
          </span>
        </p>
      )
    case FIELD_VS_FIELD_MULTIPLY_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{fieldLabel(fields, rule.leftFieldId)}</span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span>
            ({fieldLabel(fields, rule.rightFieldId)} × {rule.multiplier})
          </span>
        </p>
      )
    case SUM_FIELDS_VS_FIELD_MULTIPLY_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.fieldIds} fields={fields} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span>
            ({fieldLabel(fields, rule.fieldId)} × {rule.multiplier})
          </span>
        </p>
      )
    case SUM_FIELDS_VS_SUM_FIELDS_MULTIPLY_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.leftFieldIds} fields={fields} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span>
            (<SumLabel keys={rule.rightFieldIds} fields={fields} /> × {rule.multiplier})
          </span>
        </p>
      )
    default:
      return null
  }
}

export function RuleView({ rule, fields, onEdit, onRemove }: RuleViewProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        <Badge variant="secondary">{rule.type.replaceAll("_", " ")}</Badge>
        <RuleSummary rule={rule} fields={fields} />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button type="button" size="icon-sm" variant="outline" onClick={onEdit} aria-label="Edit rule">
          <PencilIcon />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="destructive"
          onClick={onRemove}
          aria-label="Delete rule"
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  )
}
