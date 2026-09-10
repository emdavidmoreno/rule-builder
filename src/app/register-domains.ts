import { registerDomain } from "@/core/registry"
import { airlineManifest } from "@/domains/airline/manifest"
import { carRentalManifest } from "@/domains/car-rental/manifest"
import { cruiseManifest } from "@/domains/cruise/manifest"
import { hotelManifest } from "@/domains/hotel/manifest"
import { toursManifest } from "@/domains/tours/manifest"

registerDomain(airlineManifest)
registerDomain(hotelManifest)
registerDomain(cruiseManifest)
registerDomain(carRentalManifest)
registerDomain(toursManifest)
