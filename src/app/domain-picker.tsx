import { Link } from "@tanstack/react-router"

import { DomainIcon } from "@/app/domain-icons"
import { ThemeToggle } from "@/components/theme-toggle"
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
import { listDomains } from "@/core/registry"

export function DomainPicker() {
  const domains = listDomains()

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">Rule Builder</h1>
          <p className="text-sm text-muted-foreground">
            Choose a domain to compose occupancy rules and test them live.
          </p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => {
          const isDraft = domain.status === "draft"
          return (
            <Card key={domain.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DomainIcon name={domain.icon} />
                  <span>{domain.name}</span>
                  {isDraft ? <Badge variant="outline">Coming soon</Badge> : null}
                </CardTitle>
                <CardDescription>{domain.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {domain.fields.map((field) => field.label).join(", ")}
                </p>
              </CardContent>
              <CardFooter>
                {isDraft ? (
                  <Button type="button" variant="outline" disabled>
                    Coming soon
                  </Button>
                ) : (
                  <Button
                    render={<Link to="/d/$domainId" params={{ domainId: domain.id }} />}
                    nativeButton={false}
                  >
                    Open builder
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
