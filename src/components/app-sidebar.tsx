import { useState, useTransition } from "react"
import { PlaneIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function AppSidebar() {
  const { tenants, tenantsStatus, selectedTenant, dispatch } = useRuleBuilder()
  const [query, setQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  const filtered = tenants.filter((tenant) => {
    const haystack = `${tenant.name} ${tenant.code}`.toLowerCase()
    return haystack.includes(query.trim().toLowerCase())
  })

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-0.5 px-1">
          <span className="text-sm font-medium">Rule Builder</span>
          <span className="text-xs text-muted-foreground">Passenger rules playground</span>
        </div>
        <SidebarInput
          placeholder="Search tenant"
          value={query}
          onChange={(event) => {
            const next = event.currentTarget.value
            startTransition(() => setQuery(next))
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tenants</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={cn(isPending && "opacity-70")}>
              {tenantsStatus === "loading" &&
                Array.from({ length: 6 }, (_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              {tenantsStatus !== "loading" &&
                filtered.map((tenant) => (
                  <SidebarMenuItem key={tenant.code}>
                    <SidebarMenuButton
                      isActive={selectedTenant?.code === tenant.code}
                      onClick={() => dispatch({ type: "selectTenant", tenant })}
                    >
                      <PlaneIcon />
                      <span className="truncate">{tenant.name}</span>
                      {!tenant.hasFc && (
                        <Badge variant="outline" className="ms-auto">
                          {tenant.code}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {selectedTenant ? (
          <p className="px-2 text-xs text-muted-foreground">
            Selected {selectedTenant.name} ({selectedTenant.code})
          </p>
        ) : (
          <p className="px-2 text-xs text-muted-foreground">Select a tenant for context.</p>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
