import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { RuleBuilderProvider } from "@/store/rule-builder-store"
import App from "./App.tsx"
import "./App.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <RuleBuilderProvider>
        <SidebarProvider>
          <App />
          <Toaster />
        </SidebarProvider>
      </RuleBuilderProvider>
    </TooltipProvider>
  </StrictMode>,
)
