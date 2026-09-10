import { registerDomain } from "@/core/registry"
import { airlineManifest } from "@/domains/airline/manifest"
import { hotelManifest } from "@/domains/hotel/manifest"

registerDomain(airlineManifest)
registerDomain(hotelManifest)
