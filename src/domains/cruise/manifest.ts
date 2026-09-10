import type { DomainManifest } from "@/core/registry/types"
import { DraftPlayground } from "@/domains/draft-playground"

export const cruiseManifest: DomainManifest = {
  id: "cruise",
  name: "Cabin occupancy",
  description: "Guest composition rules for a cruise cabin.",
  status: "draft",
  icon: "ship",
  fields: [
    { id: "adults", label: "Adults", type: "counter", min: 0, defaultValue: 1, required: true },
    { id: "children", label: "Children", type: "counter", min: 0, defaultValue: 0, required: false },
    { id: "infants", label: "Infants", type: "counter", min: 0, defaultValue: 0, required: false },
  ],
  ruleTemplates: [],
  presetRules: [],
  sampleCases: [],
  Playground: DraftPlayground,
}
