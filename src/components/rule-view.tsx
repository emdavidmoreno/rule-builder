import { PencilIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { passengerLabel } from "@/lib/create-rule"
import {
  LESS_THAN_OR_EQUAL_TO,
  PAX_VS_PAX_MULTIPLY_RULE,
  PAX_VS_PAX_RULE,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_PAX_VS_NUMBER_RULE,
  SUM_PAX_VS_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_PAX_RULE,
  SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_SUM_PAX_RULE,
  type Passenger,
  type Rule,
} from "@/types/rule-builder"

type RuleViewProps = {
  rule: Rule
  passengers: Passenger[]
  onEdit: () => void
  onRemove: () => void
}

function SumLabel({ keys, passengers }: { keys: string[]; passengers: Passenger[] }) {
  return (
    <span>
      Sum[{keys.map((key) => passengerLabel(passengers, key)).join(", ")}]
    </span>
  )
}

function RuleSummary({ rule, passengers }: { rule: Rule; passengers: Passenger[] }) {
  switch (rule.type) {
    case SIMPLE_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{passengerLabel(passengers, rule.pax)}</span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{rule.number}</span>
        </p>
      )
    case RANGE_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{rule.min}</span>
          <span className="text-muted-foreground">{LESS_THAN_OR_EQUAL_TO}</span>
          <span className="font-medium">{passengerLabel(passengers, rule.pax)}</span>
          <span className="text-muted-foreground">{LESS_THAN_OR_EQUAL_TO}</span>
          <span className="font-medium">{rule.max}</span>
        </p>
      )
    case PAX_VS_PAX_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{passengerLabel(passengers, rule.leftPax)}</span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{passengerLabel(passengers, rule.rightPax)}</span>
        </p>
      )
    case SUM_PAX_VS_PAX_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.paxs} passengers={passengers} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{passengerLabel(passengers, rule.pax)}</span>
        </p>
      )
    case SUM_PAX_VS_NUMBER_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.paxs} passengers={passengers} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">{rule.number}</span>
        </p>
      )
    case SUM_PAX_VS_SUM_PAX_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.leftPaxs} passengers={passengers} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span className="font-medium">
            <SumLabel keys={rule.rightPaxs} passengers={passengers} />
          </span>
        </p>
      )
    case PAX_VS_PAX_MULTIPLY_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">{passengerLabel(passengers, rule.leftPax)}</span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span>
            ({passengerLabel(passengers, rule.rightPax)} × {rule.multiplier})
          </span>
        </p>
      )
    case SUM_PAX_VS_PAX_MULTIPLY_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.paxs} passengers={passengers} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span>
            ({passengerLabel(passengers, rule.pax)} × {rule.multiplier})
          </span>
        </p>
      )
    case SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE:
      return (
        <p className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="font-medium">
            <SumLabel keys={rule.leftPaxs} passengers={passengers} />
          </span>
          <span className="text-muted-foreground">{rule.operator}</span>
          <span>
            (<SumLabel keys={rule.rightPaxs} passengers={passengers} /> × {rule.multiplier})
          </span>
        </p>
      )
    default:
      return null
  }
}

export function RuleView({ rule, passengers, onEdit, onRemove }: RuleViewProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        <Badge variant="secondary">{rule.type.replaceAll("_", " ")}</Badge>
        <RuleSummary rule={rule} passengers={passengers} />
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
