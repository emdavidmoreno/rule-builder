import type { ComponentType } from "react"
import {
  CarIcon,
  HotelIcon,
  MapIcon,
  PlaneIcon,
  ShipIcon,
} from "lucide-react"

const DOMAIN_ICONS: Record<string, ComponentType> = {
  plane: PlaneIcon,
  hotel: HotelIcon,
  ship: ShipIcon,
  car: CarIcon,
  map: MapIcon,
}

export function DomainIcon({ name }: { name?: string }) {
  const Icon = (name && DOMAIN_ICONS[name]) || PlaneIcon
  return <Icon />
}
