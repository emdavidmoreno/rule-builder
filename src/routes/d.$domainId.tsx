/* eslint-disable react-refresh/only-export-components */
import { Link, createFileRoute, notFound } from "@tanstack/react-router"

import { AppSidebar } from "@/components/app-sidebar"
import { Workspace } from "@/components/workspace"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getDomain } from "@/core/registry"
import { RuleBuilderProvider } from "@/store/rule-builder-store"

export const Route = createFileRoute("/d/$domainId")({
  component: DomainWorkspace,
  notFoundComponent: DomainNotFound,
  loader: ({ params }) => {
    const domain = getDomain(params.domainId)
    if (!domain || domain.status === "draft") {
      throw notFound()
    }
    return domain
  },
})

function DomainNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-3 p-6">
      <h1 className="text-xl font-medium">Domain not available</h1>
      <p className="text-sm text-muted-foreground">
        This domain is missing or still a draft.
      </p>
      <Link to="/" className="text-sm underline">
        Back to domains
      </Link>
    </main>
  )
}

function DomainWorkspace() {
  const domain = Route.useLoaderData()

  return (
    <RuleBuilderProvider key={domain.id} manifest={domain}>
      <SidebarProvider>
        <AppSidebar />
        <Workspace />
      </SidebarProvider>
    </RuleBuilderProvider>
  )
}
