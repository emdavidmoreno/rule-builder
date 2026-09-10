import { CounterPlayground } from "@/core/builder/counter-playground"
import type { PlaygroundProps } from "@/core/registry/types"
import { AIRLINE_SAMPLE_CASES } from "@/domains/airline/presets"

export function AirlinePlayground(props: PlaygroundProps) {
  return (
    <CounterPlayground
      title="Live passengers"
      description="Adjust counts to test the generated JsonLogic. Failed rules show their messages below."
      sampleCases={AIRLINE_SAMPLE_CASES}
      {...props}
    />
  )
}
