import React, { useEffect, useRef } from 'react';
import { TOTAL_RULE } from '../../constants';
import { usePassengers } from '../../context/PassengerContext';
import { useRules } from '../../context/RuleContext';
import { NumberSelector } from '../controls';

const TotalPassengerForm = () => {

  const {totalPassengers, setTotalPassengers} = usePassengers();
  const {rules, setRules} = useRules();
  const rulesUpdated = useRef(true);

  useEffect(()=>{
    if(!rulesUpdated.current){
      setRules(r => rules.map(rule=>{
        return rule.type !== TOTAL_RULE ? rule
          : {
            ...rule,
            total: Number(totalPassengers),
          }
      }));
      rulesUpdated.current = true;
    }
  },[totalPassengers, setRules, rules]);

  const handleChangePassenger = value => {
    rulesUpdated.current = false;
    setTotalPassengers(value);
  }
  
  return (
    <div className="flex flex-col pb-4 w-full border-b mb-3">
      <div className="flex flex-col w-1/3">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
        <NumberSelector
          id={'totalPassengers'}
          name={'totalPassengers'}
          value={totalPassengers}
          handleChange={handleChangePassenger}
        />
      </div>
    </div>
  );
};

export default TotalPassengerForm;