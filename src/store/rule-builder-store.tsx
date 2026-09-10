/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useMemo, useReducer, type ReactNode } from "react"

import {
  createRule,
  DEFAULT_SUM_CAP,
  resetFieldCounts,
  RULE_DEFAULT_FORMAT,
  SUM_CAP_RULE,
  withRuleMeta,
  type AddableRuleKind,
  type BuilderRule,
  type BuilderStep,
  type FieldValue,
  type RuleFormat,
} from "@/core/builder"
import { convertRulesToString } from "@/core/export"
import { applyDataToFields, dataFromFields, fieldsFromDefs } from "@/core/registry/fields"
import type { DomainManifest } from "@/core/registry/types"

type BuilderState = {
  manifest: DomainManifest
  fields: FieldValue[]
  totalCap: number
  rules: BuilderRule[]
  format: RuleFormat
  step: BuilderStep
}

type BuilderAction =
  | { type: "toggleField"; id: string; isActive: boolean }
  | { type: "setTotalCap"; total: number }
  | { type: "setFieldValue"; id: string; value: number }
  | { type: "setFieldsFromData"; data: Record<string, unknown> }
  | { type: "addRule"; kind: AddableRuleKind }
  | { type: "patchRule"; id: string; key: string; value: string | number | string[] | boolean }
  | { type: "saveRule"; id: string }
  | { type: "editRule"; id: string }
  | { type: "removeRule"; id: string }
  | { type: "setFormat"; format: RuleFormat }
  | { type: "setStep"; step: BuilderStep }

type BuilderStore = BuilderState & {
  activeFields: FieldValue[]
  customRules: BuilderRule[]
  rulesString: string
  playgroundData: Record<string, unknown>
  dispatch: (action: BuilderAction) => void
}

const RuleBuilderContext = createContext<BuilderStore | null>(null)

function activeIds(fields: FieldValue[]) {
  return fields.filter((field) => field.isActive).map((field) => field.id)
}

function syncSumCapRule(
  rules: BuilderRule[],
  activeFieldIds: string[],
  total: number,
  fields: FieldValue[],
): BuilderRule[] {
  return rules.map((rule) => {
    if (rule.type !== SUM_CAP_RULE) return rule
    const fieldIds = rule.fieldIds.filter((id) => activeFieldIds.includes(id))
    return withRuleMeta(
      {
        ...rule,
        fieldIds: fieldIds.length > 0 ? fieldIds : activeFieldIds,
        total,
        label: "",
        message: "",
      },
      fields,
    )
  })
}

function createInitialState(manifest: DomainManifest): BuilderState {
  const fields = fieldsFromDefs(manifest.fields)
  const rules = manifest.presetRules.map((rule) => withRuleMeta({ ...rule }, fields))
  const capRule = rules.find((rule) => rule.type === SUM_CAP_RULE)
  return {
    manifest,
    fields,
    totalCap: capRule && capRule.type === SUM_CAP_RULE ? capRule.total : DEFAULT_SUM_CAP,
    rules,
    format: RULE_DEFAULT_FORMAT,
    step: 1,
  }
}

function reducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "toggleField": {
      const def = state.manifest.fields.find((field) => field.id === action.id)
      if (def?.required && !action.isActive) return state
      const fields = state.fields.map((field) => {
        if (field.id !== action.id) return field
        return {
          ...field,
          isActive: action.isActive,
          value: action.isActive ? field.value : 0,
        }
      })
      return {
        ...state,
        fields,
        rules: syncSumCapRule(state.rules, activeIds(fields), state.totalCap, fields),
      }
    }
    case "setTotalCap": {
      return {
        ...state,
        totalCap: action.total,
        rules: syncSumCapRule(state.rules, activeIds(state.fields), action.total, state.fields),
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
    case "setFieldsFromData": {
      return {
        ...state,
        fields: applyDataToFields(state.fields, action.data),
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
          rule.id === action.id
            ? withRuleMeta({ ...rule, isEditing: false }, state.fields)
            : rule,
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
  }
}

export function RuleBuilderProvider({
  manifest,
  children,
}: {
  manifest: DomainManifest
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, manifest, createInitialState)

  const value = useMemo<BuilderStore>(() => {
    const activeFields = state.fields.filter((field) => field.isActive)
    return {
      ...state,
      activeFields,
      customRules: state.rules.filter((rule) => rule.type !== SUM_CAP_RULE),
      rulesString: convertRulesToString(state.rules, state.format),
      playgroundData: dataFromFields(state.fields),
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
