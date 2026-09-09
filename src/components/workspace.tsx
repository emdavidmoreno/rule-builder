import { ArrowLeftIcon, ArrowRightIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { PassengerMapping } from "@/components/passenger-mapping"
import { RuleJsonViewer } from "@/components/rule-json-viewer"
import { RulesList } from "@/components/rules-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { TravelerPlayground } from "@/components/traveler-playground"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function Workspace() {
  const { step, selectedTenant, rulesString, dispatch } = useRuleBuilder()

  async function copyRules() {
    try {
      await navigator.clipboard.writeText(rulesString)
      toast.success("Passenger rules copied.")
    } catch {
      toast.error("Could not copy passenger rules.")
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-sm font-medium">Passenger rules playground</h1>
        {selectedTenant && (
          <Badge variant="secondary" className="ms-1">
            {selectedTenant.code}
          </Badge>
        )}
        <div className="ms-auto">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row lg:items-start">
        <Card className="w-full lg:max-w-xl">
          <CardHeader>
            <CardTitle>Build rules</CardTitle>
            <CardDescription>
              Map passenger types, then add JsonLogic constraints for the booking party.
            </CardDescription>
            <ToggleGroup
              value={[String(step)]}
              onValueChange={(next) => {
                if (next[0] === "1") dispatch({ type: "setStep", step: 1 })
                if (next[0] === "2") dispatch({ type: "setStep", step: 2 })
              }}
              variant="outline"
              spacing={2}
            >
              <ToggleGroupItem value="1">1. Mapping</ToggleGroupItem>
              <ToggleGroupItem value="2">2. Rules</ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent>
            <div hidden={step !== 1}>
              <PassengerMapping />
            </div>
            <div hidden={step !== 2}>
              <RulesList />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t">
            <Button
              type="button"
              variant="outline"
              disabled={step === 1}
              onClick={() => dispatch({ type: "setStep", step: 1 })}
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Previous
            </Button>
            {step === 1 ? (
              <Button type="button" onClick={() => dispatch({ type: "setStep", step: 2 })}>
                Next
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            ) : (
              <Button type="button" onClick={copyRules}>
                <CopyIcon data-icon="inline-start" />
                Copy rules
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className={cn("flex w-full flex-1 flex-col gap-4")}>
          <TravelerPlayground />
          <RuleJsonViewer />
        </div>
      </div>
    </SidebarInset>
  )
}
