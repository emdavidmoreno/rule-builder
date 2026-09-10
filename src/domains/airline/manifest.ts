import { fieldsFromDefs } from "@/core/registry/fields"
import type { DomainManifest } from "@/core/registry/types"
import { AirlinePlayground } from "@/domains/airline/Playground"
import {
  AIRLINE_FIELDS,
  AIRLINE_RULE_TEMPLATES,
  AIRLINE_SAMPLE_CASES,
  createAirlinePresetRules,
} from "@/domains/airline/presets"

const fields = fieldsFromDefs(AIRLINE_FIELDS)

export const airlineManifest: DomainManifest = {
  id: "airline",
  name: "Flight occupancy",
  description: "Passenger composition rules for a flight booking.",
  status: "stable",
  icon: "plane",
  fields: AIRLINE_FIELDS,
  groups: [
    {
      id: "travelers",
      label: "Travelers",
      fieldIds: ["adults", "children", "infants"],
    },
  ],
  ruleTemplates: AIRLINE_RULE_TEMPLATES,
  presetRules: createAirlinePresetRules(fields),
  sampleCases: AIRLINE_SAMPLE_CASES,
  Playground: AirlinePlayground,
}
