import { createContext, useContext, useEffect, useState } from "react";
import { RULE_DEFAULT_FORMAT } from "../constants";
import { convertRulesToString } from "../helpers/getRuleFromPassenger";
import { useRules } from "./RuleContext";

const RuleFormatContext = createContext();

export const useRuleFormat = () => useContext(RuleFormatContext);

export const RuleFormatProvider = ({children}) => {
  const [format, setFormat] = useState(RULE_DEFAULT_FORMAT);
  const [rulesString, setRulesString] = useState(null);

  const {rules} = useRules();

  useEffect(()=>{
    setRulesString(convertRulesToString(rules, format));
  },[rules, format])

  return (
    <RuleFormatContext.Provider
      value={{
        format,
        setFormat,
        rulesString,
      }}
    >
      {children}
    </RuleFormatContext.Provider>
  )
}