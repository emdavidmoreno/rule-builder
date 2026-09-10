import { createFileRoute } from "@tanstack/react-router"

import { DomainPicker } from "@/app/domain-picker"

export const Route = createFileRoute("/")({
  component: DomainPicker,
})
