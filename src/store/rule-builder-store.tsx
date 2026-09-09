/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

import { DEFAULT_TOTAL_PASSENGERS } from "@/constants"
import { convertRulesToString } from "@/lib/convert-rules"
import {
  createInitialPassengers,
  createInitialRules,
  createRule,
  resetPassengerCounts,
} from "@/lib/create-rule"
import { DEMO_TENANTS, loadTenants } from "@/data/tenants"
import {
  RULE_DEFAULT_FORMAT,
  TOTAL_RULE,
  type AddableRuleKind,
  type BuilderStep,
  type Passenger,
  type Rule,
  type RuleFormat,
  type Tenant,
} from "@/types/rule-builder"

type TenantsStatus = "loading" | "ready" | "error"

type BuilderState = {
  passengers: Passenger[]
  totalPassengers: number
  rules: Rule[]
  format: RuleFormat
  step: BuilderStep
  selectedTenant: Tenant | null
  tenants: Tenant[]
  tenantsStatus: TenantsStatus
}

type BuilderAction =
  | { type: "setPassengerLabel"; key: string; label: string }
  | { type: "togglePassenger"; key: string; isActive: boolean }
  | { type: "setTotalPassengers"; total: number }
  | { type: "setPassengerValue"; key: string; value: number }
  | { type: "addRule"; kind: AddableRuleKind }
  | { type: "patchRule"; id: string; key: string; value: string | number | string[] }
  | { type: "saveRule"; id: string }
  | { type: "editRule"; id: string }
  | { type: "removeRule"; id: string }
  | { type: "setFormat"; format: RuleFormat }
  | { type: "setStep"; step: BuilderStep }
  | { type: "selectTenant"; tenant: Tenant }
  | { type: "tenantsLoaded"; tenants: Tenant[] }
  | { type: "tenantsFailed" }

type BuilderStore = BuilderState & {
  activePassengers: Passenger[]
  customRules: Rule[]
  rulesString: string
  dispatch: (action: BuilderAction) => void
}

const RuleBuilderContext = createContext<BuilderStore | null>(null)

function activeKeys(passengers: Passenger[]) {
  return passengers.filter((passenger) => passenger.isActive).map((passenger) => passenger.key)
}

function syncTotalRule(rules: Rule[], paxs: string[], total: number): Rule[] {
  return rules.map((rule) =>
    rule.type === TOTAL_RULE ? { ...rule, paxs, total } : rule,
  )
}

function createInitialState(): BuilderState {
  const passengers = createInitialPassengers()
  return {
    passengers,
    totalPassengers: DEFAULT_TOTAL_PASSENGERS,
    rules: createInitialRules(passengers),
    format: RULE_DEFAULT_FORMAT,
    step: 1,
    selectedTenant: null,
    tenants: [],
    tenantsStatus: "loading",
  }
}

function reducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "setPassengerLabel": {
      const passengers = state.passengers.map((passenger) =>
        passenger.key === action.key ? { ...passenger, label: action.label } : passenger,
      )
      return { ...state, passengers }
    }
    case "togglePassenger": {
      const passengers = state.passengers.map((passenger) => {
        if (passenger.key !== action.key) return passenger
        return {
          ...passenger,
          isActive: action.isActive,
          label: action.isActive ? passenger.label : "",
          value: action.isActive ? passenger.value : 0,
        }
      })
      return {
        ...state,
        passengers,
        rules: syncTotalRule(state.rules, activeKeys(passengers), state.totalPassengers),
      }
    }
    case "setTotalPassengers": {
      return {
        ...state,
        totalPassengers: action.total,
        rules: syncTotalRule(state.rules, activeKeys(state.passengers), action.total),
      }
    }
    case "setPassengerValue": {
      return {
        ...state,
        passengers: state.passengers.map((passenger) =>
          passenger.key === action.key ? { ...passenger, value: action.value } : passenger,
        ),
      }
    }
    case "addRule": {
      return {
        ...state,
        rules: [...state.rules, createRule(action.kind, state.passengers)],
        passengers: resetPassengerCounts(state.passengers),
      }
    }
    case "patchRule": {
      return {
        ...state,
        rules: state.rules.map((rule) =>
          rule.id === action.id ? ({ ...rule, [action.key]: action.value } as Rule) : rule,
        ),
      }
    }
    case "saveRule": {
      return {
        ...state,
        rules: state.rules.map((rule) =>
          rule.id === action.id ? { ...rule, isEditing: false } : rule,
        ),
        passengers: resetPassengerCounts(state.passengers),
      }
    }
    case "editRule": {
      return {
        ...state,
        rules: state.rules.map((rule) =>
          rule.id === action.id ? { ...rule, isEditing: true } : rule,
        ),
      }
    }
    case "removeRule": {
      return {
        ...state,
        rules: state.rules.filter((rule) => rule.id !== action.id),
        passengers: resetPassengerCounts(state.passengers),
      }
    }
    case "setFormat":
      return { ...state, format: action.format }
    case "setStep":
      return { ...state, step: action.step }
    case "selectTenant":
      return { ...state, selectedTenant: action.tenant }
    case "tenantsLoaded":
      return { ...state, tenants: action.tenants, tenantsStatus: "ready" }
    case "tenantsFailed":
      return { ...state, tenants: DEMO_TENANTS, tenantsStatus: "error" }
  }
}

export function RuleBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  useEffect(() => {
    let cancelled = false

    loadTenants()
      .then((tenants) => {
        if (!cancelled) dispatch({ type: "tenantsLoaded", tenants })
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "tenantsFailed" })
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<BuilderStore>(() => {
    const activePassengers = state.passengers.filter((passenger) => passenger.isActive)
    return {
      ...state,
      activePassengers,
      customRules: state.rules.filter((rule) => rule.type !== TOTAL_RULE),
      rulesString: convertRulesToString(state.rules, state.format),
      dispatch,
    }
  }, [state])

  return <RuleBuilderContext.Provider value={value}>{children}</RuleBuilderContext.Provider>
}

export function useRuleBuilder() {
  const store = use(RuleBuilderContext)
  if (!store) {
    throw new Error("useRuleBuilder must be used within RuleBuilderProvider")
  }
  return store
}
