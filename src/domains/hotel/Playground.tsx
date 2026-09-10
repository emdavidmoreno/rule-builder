import { CounterPlayground } from "@/core/builder/counter-playground"
import type { PlaygroundProps } from "@/core/registry/types"
import { HOTEL_SAMPLE_CASES } from "@/domains/hotel/presets"

export function HotelPlayground(props: PlaygroundProps) {
  return (
    <CounterPlayground
      title="Room occupancy"
      description="Adjust guests and cribs to test the room rules. Failed rules show their messages below."
      sampleCases={HOTEL_SAMPLE_CASES}
      {...props}
    />
  )
}
