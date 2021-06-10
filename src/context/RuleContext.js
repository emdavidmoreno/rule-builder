import { createContext, useContext, useState } from "react";
import { RANGE_RULE, TOTAL_RULE } from "../constants";

const RuleContext = createContext();

export const useRules = () => useContext(RuleContext);

export const RuleProvider = ({children}) => {
  const [rules, setRules] = useState([{
      type: TOTAL_RULE,
      paxs: ['age1'],
      total: 9,
      isEditing: false,
    },{
      type: RANGE_RULE,
      pax: 'age1',
      min: 1,
      max: 9,
      isEditing: false,
    }
  ]);

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
