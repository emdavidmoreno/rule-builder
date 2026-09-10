import type { DomainManifest } from "@/core/registry/types"
import { DraftPlayground } from "@/domains/draft-playground"

export const toursManifest: DomainManifest = {
  id: "tours",
  name: "Activity booking",
  description: "Party composition rules for a tour or activity reservation.",
  status: "draft",
  icon: "map",
  fields: [
    { id: "adults", label: "Adults", type: "counter", min: 0, defaultValue: 1, required: true },
    { id: "children", label: "Children", type: "counter", min: 0, defaultValue: 0, required: false },
    { id: "seniors", label: "Seniors", type: "counter", min: 0, defaultValue: 0, required: false },
  ],
  ruleTemplates: [],
  presetRules: [],
  sampleCases: [],
  Playground: DraftPlayground,
}
