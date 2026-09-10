import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  RULE_COMPACT_FORMAT,
  RULE_DEFAULT_FORMAT,
  RULE_EXTENDED_FORMAT,
} from "@/core/builder"
import { toRuleSetJson, toRunnableSnippet } from "@/core/export"
import { compileRuleSet } from "@/core/ruleset"
import { useRuleBuilder } from "@/store/rule-builder-store"

const JSON_LOGIC_VIEW = "json-logic"
const RULESET_VIEW = "ruleset"
const SNIPPET_VIEW = "snippet"

type ExportView = typeof JSON_LOGIC_VIEW | typeof RULESET_VIEW | typeof SNIPPET_VIEW

export function RuleJsonViewer() {
  const { format, rulesString, rules, manifest, dispatch } = useRuleBuilder()
  const [copied, setCopied] = useState(false)
  const [view, setView] = useState<ExportView>(JSON_LOGIC_VIEW)

  const ruleSet = useMemo(
    () => compileRuleSet(manifest.id, rules),
    [manifest.id, rules],
  )
  const rulesetJson = useMemo(() => toRuleSetJson(ruleSet), [ruleSet])
  const snippet = useMemo(
    () => toRunnableSnippet(ruleSet, manifest.fields),
    [manifest.fields, ruleSet],
  )

  const currentText =
    view === RULESET_VIEW ? rulesetJson : view === SNIPPET_VIEW ? snippet : rulesString

  async function copyRules() {
    try {
      await navigator.clipboard.writeText(currentText)
      setCopied(true)
      toast.success(
        view === SNIPPET_VIEW
          ? "Runnable snippet copied."
          : view === RULESET_VIEW
            ? "RuleSet JSON copied."
            : "JsonLogic copied to the clipboard.",
      )
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Could not copy the export.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export</CardTitle>
        <CardDescription>
          Copy portable JsonLogic, the versioned RuleSet, or a snippet ready to paste into your
          engine.
        </CardDescription>
        <CardAction>
          <Button type="button" variant="outline" size="sm" onClick={copyRules}>
            {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ToggleGroup
          value={[view]}
          onValueChange={(next) => {
            const selected = next[0]
            if (
              selected === JSON_LOGIC_VIEW ||
              selected === RULESET_VIEW ||
              selected === SNIPPET_VIEW
            ) {
              setView(selected)
            }
          }}
          variant="outline"
          spacing={2}
        >
          <ToggleGroupItem value={JSON_LOGIC_VIEW}>JsonLogic</ToggleGroupItem>
          <ToggleGroupItem value={RULESET_VIEW}>RuleSet</ToggleGroupItem>
          <ToggleGroupItem value={SNIPPET_VIEW}>Snippet</ToggleGroupItem>
        </ToggleGroup>
        {view === JSON_LOGIC_VIEW && (
          <ToggleGroup
            value={[format]}
            onValueChange={(next) => {
              const selected = next[0]
              if (
                selected === RULE_DEFAULT_FORMAT ||
                selected === RULE_COMPACT_FORMAT ||
                selected === RULE_EXTENDED_FORMAT
              ) {
                dispatch({ type: "setFormat", format: selected })
              }
            }}
            variant="outline"
            spacing={2}
          >
            <ToggleGroupItem value={RULE_DEFAULT_FORMAT}>Default</ToggleGroupItem>
            <ToggleGroupItem value={RULE_COMPACT_FORMAT}>Compact</ToggleGroupItem>
            <ToggleGroupItem value={RULE_EXTENDED_FORMAT}>Extended</ToggleGroupItem>
          </ToggleGroup>
        )}
        <ScrollArea className="h-72 rounded-2xl border bg-muted/40">
          <pre className="p-4 text-start font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {currentText}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
