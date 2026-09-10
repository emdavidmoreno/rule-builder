import { Link } from "@tanstack/react-router"

import { DomainIcon } from "@/app/domain-icons"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { listDomains } from "@/core/registry"
import { useRuleBuilder } from "@/store/rule-builder-store"

export function AppSidebar() {
  const { manifest } = useRuleBuilder()
  const domains = listDomains()

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-3 p-3">
        <Link to="/" className="flex flex-col gap-0.5 px-1">
          <span className="text-sm font-medium">Rule Builder</span>
          <span className="text-xs text-muted-foreground">Choose a domain</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Domains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {domains.map((domain) => {
                const isDraft = domain.status === "draft"
                const isActive = manifest.id === domain.id
                return (
                  <SidebarMenuItem key={domain.id}>
                    {isDraft ? (
                      <SidebarMenuButton disabled>
                        <DomainIcon name={domain.icon} />
                        <span className="truncate">{domain.name}</span>
                        <Badge variant="outline" className="ms-auto">
                          Soon
                        </Badge>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        isActive={isActive}
                        render={
                          <Link
                            to="/d/$domainId"
                            params={{ domainId: domain.id }}
                          />
                        }
                      >
                        <DomainIcon name={domain.icon} />
                        <span className="truncate">{domain.name}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="px-2 text-xs text-muted-foreground">{manifest.description}</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
