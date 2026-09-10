import { fieldsFromDefs } from "@/core/registry/fields"
import type { DomainManifest } from "@/core/registry/types"
import { HotelPlayground } from "@/domains/hotel/Playground"
import {
  HOTEL_FIELDS,
  HOTEL_RULE_TEMPLATES,
  HOTEL_SAMPLE_CASES,
  createHotelPresetRules,
} from "@/domains/hotel/presets"

const fields = fieldsFromDefs(HOTEL_FIELDS)

export const hotelManifest: DomainManifest = {
  id: "hotel",
  name: "Room occupancy",
  description: "Guest and crib limits for a hotel room.",
  status: "stable",
  icon: "hotel",
  fields: HOTEL_FIELDS,
  groups: [
    {
      id: "guests",
      label: "Guests",
      fieldIds: ["adults", "children", "infants"],
    },
    {
      id: "equipment",
      label: "Equipment",
      fieldIds: ["cribs"],
    },
  ],
  ruleTemplates: HOTEL_RULE_TEMPLATES,
  presetRules: createHotelPresetRules(fields),
  sampleCases: HOTEL_SAMPLE_CASES,
  Playground: HotelPlayground,
}
