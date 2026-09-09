import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

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
import { RULE_COMPACT_FORMAT, RULE_DEFAULT_FORMAT, RULE_EXTENDED_FORMAT } from "@/types/rule-builder"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function RuleJsonViewer() {
  const { format, rulesString, dispatch } = useRuleBuilder()
  const [copied, setCopied] = useState(false)

  async function copyRules() {
    try {
      await navigator.clipboard.writeText(rulesString)
      setCopied(true)
      toast.success("JsonLogic copied to the clipboard.")
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Could not copy the rules JSON.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>JsonLogic output</CardTitle>
        <CardDescription>Copy the compiled passenger rules in the format you need.</CardDescription>
        <CardAction>
          <Button type="button" variant="outline" size="sm" onClick={copyRules}>
            {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
        <ScrollArea className="h-72 rounded-2xl border bg-muted/40">
          <pre className="p-4 text-start font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {rulesString}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
