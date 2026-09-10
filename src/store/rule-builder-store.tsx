/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

import {
  createInitialRules,
  createRule,
  DEFAULT_SUM_CAP,
  resetFieldCounts,
  RULE_DEFAULT_FORMAT,
  SUM_CAP_RULE,
  type AddableRuleKind,
  type BuilderRule,
  type BuilderStep,
  type FieldValue,
  type RuleFormat,
} from "@/core/builder"
import { convertRulesToString } from "@/core/export"
import { DEMO_TENANTS, loadTenants, type Tenant } from "@/data/tenants"

type TenantsStatus = "loading" | "ready" | "error"

type BuilderState = {
  fields: FieldValue[]
  totalCap: number
  rules: BuilderRule[]
  format: RuleFormat
  step: BuilderStep
  selectedTenant: Tenant | null
  tenants: Tenant[]
  tenantsStatus: TenantsStatus
}

type BuilderAction =
  | { type: "setFieldLabel"; id: string; label: string }
  | { type: "toggleField"; id: string; isActive: boolean }
  | { type: "setTotalCap"; total: number }
  | { type: "setFieldValue"; id: string; value: number }
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
  activeFields: FieldValue[]
  customRules: BuilderRule[]
  rulesString: string
  dispatch: (action: BuilderAction) => void
}

const RuleBuilderContext = createContext<BuilderStore | null>(null)

function activeIds(fields: FieldValue[]) {
  return fields.filter((field) => field.isActive).map((field) => field.id)
}

function syncSumCapRule(rules: BuilderRule[], fieldIds: string[], total: number): BuilderRule[] {
  return rules.map((rule) =>
    rule.type === SUM_CAP_RULE ? { ...rule, fieldIds, total } : rule,
  )
}

function createInitialFields(): FieldValue[] {
  return Array.from({ length: 9 }, (_, index) => ({
    id: `age${index + 1}`,
    label: index === 0 ? "Adults" : "",
    value: index === 0 ? 1 : 0,
    isActive: index === 0,
  }))
}

function createInitialState(): BuilderState {
  const fields = createInitialFields()
  return {
    fields,
    totalCap: DEFAULT_SUM_CAP,
    rules: createInitialRules(fields),
    format: RULE_DEFAULT_FORMAT,
    step: 1,
    selectedTenant: null,
    tenants: [],
    tenantsStatus: "loading",
  }
}

function reducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "setFieldLabel": {
      const fields = state.fields.map((field) =>
        field.id === action.id ? { ...field, label: action.label } : field,
      )
      return { ...state, fields }
    }
    case "toggleField": {
      const fields = state.fields.map((field) => {
        if (field.id !== action.id) return field
        return {
          ...field,
          isActive: action.isActive,
          label: action.isActive ? field.label : "",
          value: action.isActive ? field.value : 0,
        }
      })
      return {
        ...state,
        fields,
        rules: syncSumCapRule(state.rules, activeIds(fields), state.totalCap),
      }
    }
    case "setTotalCap": {
      return {
        ...state,
        totalCap: action.total,
        rules: syncSumCapRule(state.rules, activeIds(state.fields), action.total),
      }
    }
    case "setFieldValue": {
      return {
        ...state,
        fields: state.fields.map((field) =>
          field.id === action.id ? { ...field, value: action.value } : field,
        ),
      }
    }
    case "addRule": {
      return {
        ...state,
        rules: [...state.rules, createRule(action.kind, state.fields)],
        fields: resetFieldCounts(state.fields),
      }
    }
    case "patchRule": {
      return {
        ...state,
        rules: state.rules.map((rule) =>
          rule.id === action.id ? ({ ...rule, [action.key]: action.value } as BuilderRule) : rule,
        ),
      }
    }
    case "saveRule": {
      return {
        ...state,
        rules: state.rules.map((rule) =>
          rule.id === action.id ? { ...rule, isEditing: false } : rule,
        ),
        fields: resetFieldCounts(state.fields),
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
        fields: resetFieldCounts(state.fields),
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
    const activeFields = state.fields.filter((field) => field.isActive)
    return {
      ...state,
      activeFields,
      customRules: state.rules.filter((rule) => rule.type !== SUM_CAP_RULE),
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
