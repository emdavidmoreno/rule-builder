import type { DomainManifest } from "@/core/registry/types"
import { DraftPlayground } from "@/domains/draft-playground"

export const carRentalManifest: DomainManifest = {
  id: "car-rental",
  name: "Car occupancy",
  description: "Driver and passenger limits for a rental car.",
  status: "draft",
  icon: "car",
  fields: [
    { id: "drivers", label: "Drivers", type: "counter", min: 0, defaultValue: 1, required: true },
    {
      id: "additional_drivers",
      label: "Additional drivers",
      type: "counter",
      min: 0,
      defaultValue: 0,
      required: false,
    },
    {
      id: "passengers",
      label: "Passengers",
      type: "counter",
      min: 0,
      defaultValue: 0,
      required: false,
    },
  ],
  ruleTemplates: [],
  presetRules: [],
  sampleCases: [],
  Playground: DraftPlayground,
}
