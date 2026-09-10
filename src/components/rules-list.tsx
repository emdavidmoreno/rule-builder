import { ListPlusIcon, PlusIcon } from "lucide-react"

import { RuleForm } from "@/components/rule-form"
import { RuleView } from "@/components/rule-view"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { NumberInput } from "@/components/selectors/number-input"
import { DROPDOWN_ACTIONS } from "@/core/builder"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function RulesList() {
  const { customRules, activeFields, totalCap, dispatch } = useRuleBuilder()

  return (
    <div className="flex flex-col gap-4">
      <Field className="max-w-48">
        <FieldLabel htmlFor="total-cap">Total passengers</FieldLabel>
        <NumberInput
          id="total-cap"
          value={totalCap}
          min={1}
          onChange={(value) => dispatch({ type: "setTotalCap", total: value })}
        />
      </Field>

      <Separator />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Party size is always capped by the hidden total rule.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button />}>
            <PlusIcon data-icon="inline-start" />
            Add rule
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {DROPDOWN_ACTIONS.map((item) => (
                <DropdownMenuItem
                  key={item.action}
                  onClick={() => dispatch({ type: "addRule", kind: item.action })}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {customRules.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListPlusIcon />
            </EmptyMedia>
            <EmptyTitle>No custom rules yet</EmptyTitle>
            <EmptyDescription>
              Add a comparison, range, or sum rule. The total passenger cap is always included.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => dispatch({ type: "addRule", kind: "SIMPLE_RULE" })}>
              <PlusIcon data-icon="inline-start" />
              Add a simple rule
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <ul className="flex flex-col gap-3">
          {customRules.map((rule) => (
            <li key={rule.id} className="rounded-2xl border p-3">
              {rule.isEditing ? (
                <RuleForm
                  rule={rule}
                  fields={activeFields}
                  onPatch={(key, value) =>
                    dispatch({ type: "patchRule", id: rule.id, key, value })
                  }
                  onSave={() => dispatch({ type: "saveRule", id: rule.id })}
                />
              ) : (
                <RuleView
                  rule={rule}
                  fields={activeFields}
                  onEdit={() => dispatch({ type: "editRule", id: rule.id })}
                  onRemove={() => dispatch({ type: "removeRule", id: rule.id })}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
