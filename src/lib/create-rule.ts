import { DEFAULT_TOTAL_PASSENGERS } from "@/constants"
import {
  DOUBLE_EQUAL_TO,
  GREATER_THAN_OR_EQUAL_TO,
  PAX_VS_PAX_MULTIPLY_RULE,
  PAX_VS_PAX_RULE,
  RANGE_RULE,
  SIMPLE_RULE,
  SUM_PAX_VS_NUMBER_RULE,
  SUM_PAX_VS_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_PAX_RULE,
  SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_SUM_PAX_RULE,
  TOTAL_RULE,
  type AddableRuleKind,
  type Passenger,
  type Rule,
  type TotalRule,
} from "@/types/rule-builder"

export function createId() {
  return crypto.randomUUID()
}

export function defaultPassengerKey(passengers: Passenger[]) {
  return passengers.find((passenger) => passenger.isActive)?.key ?? "age1"
}

export function createTotalRule(
  paxs: string[],
  total = DEFAULT_TOTAL_PASSENGERS,
): TotalRule {
  return {
    id: createId(),
    type: TOTAL_RULE,
    paxs,
    total,
    isEditing: false,
  }
}

export function createRule(type: AddableRuleKind, passengers: Passenger[]): Rule {
  const pax = defaultPassengerKey(passengers)

  switch (type) {
    case SIMPLE_RULE:
      return {
        id: createId(),
        type,
        pax,
        operator: GREATER_THAN_OR_EQUAL_TO,
        number: 0,
        isEditing: true,
      }
    case RANGE_RULE:
      return {
        id: createId(),
        type,
        pax,
        min: 0,
        max: 0,
        isEditing: true,
      }
    case PAX_VS_PAX_RULE:
      return {
        id: createId(),
        type,
        leftPax: pax,
        operator: DOUBLE_EQUAL_TO,
        rightPax: pax,
        isEditing: true,
      }
    case PAX_VS_PAX_MULTIPLY_RULE:
      return {
        id: createId(),
        type,
        leftPax: pax,
        operator: DOUBLE_EQUAL_TO,
        rightPax: pax,
        multiplier: 1,
        isEditing: true,
      }
    case SUM_PAX_VS_PAX_MULTIPLY_RULE:
      return {
        id: createId(),
        type,
        paxs: [pax],
        operator: DOUBLE_EQUAL_TO,
        pax,
        multiplier: 1,
        isEditing: true,
      }
    case SUM_PAX_VS_PAX_RULE:
      return {
        id: createId(),
        type,
        paxs: [pax],
        operator: DOUBLE_EQUAL_TO,
        pax,
        isEditing: true,
      }
    case SUM_PAX_VS_NUMBER_RULE:
      return {
        id: createId(),
        type,
        paxs: [pax],
        operator: DOUBLE_EQUAL_TO,
        number: 0,
        isEditing: true,
      }
    case SUM_PAX_VS_SUM_PAX_RULE:
      return {
        id: createId(),
        type,
        leftPaxs: [pax],
        operator: DOUBLE_EQUAL_TO,
        rightPaxs: [pax],
        isEditing: true,
      }
    case SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE:
      return {
        id: createId(),
        type,
        leftPaxs: [pax],
        operator: DOUBLE_EQUAL_TO,
        rightPaxs: [pax],
        multiplier: 1,
        isEditing: true,
      }
  }
}

export function createInitialPassengers(): Passenger[] {
  return Array.from({ length: 9 }, (_, index) => ({
    key: `age${index + 1}`,
    label: index === 0 ? "Adults" : "",
    value: index === 0 ? 1 : 0,
    isActive: index === 0,
  }))
}

export function createInitialRules(passengers: Passenger[]): Rule[] {
  const pax = defaultPassengerKey(passengers)
  return [
    createTotalRule([pax]),
    {
      id: createId(),
      type: RANGE_RULE,
      pax,
      min: 1,
      max: DEFAULT_TOTAL_PASSENGERS,
      isEditing: false,
    },
  ]
}

export function resetPassengerCounts(passengers: Passenger[]): Passenger[] {
  const firstActiveKey = passengers.find((passenger) => passenger.isActive)?.key
  return passengers.map((passenger) => ({
    ...passenger,
    value: passenger.key === firstActiveKey ? 1 : 0,
  }))
}

export function passengerLabel(passengers: Passenger[], key: string) {
  return passengers.find((passenger) => passenger.key === key)?.label || key
}
