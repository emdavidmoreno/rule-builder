import { createContext, useContext, useState } from "react";
import { TOTAL_RULE } from "../constants";

const RuleContext = createContext();

export const useRules = () => useContext(RuleContext);

export const RuleProvider = ({children}) => {
  const [rules, setRules] = useState([{
    type: TOTAL_RULE,
    paxs: ['age1'],
    total: 0,
    isEditing: false,
  }]);

  return (
    <RuleContext.Provider
      value={{
        rules, 
        setRules,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};
