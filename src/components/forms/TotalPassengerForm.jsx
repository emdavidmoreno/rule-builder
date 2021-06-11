import React, { useEffect } from 'react';
import { TOTAL_RULE } from '../../constants';
import { usePassengers } from '../../context/PassengerContext';
import { useRules } from '../../context/RuleContext';
import { NumberSelector } from '../controls';

const TotalPassengerForm = () => {

  const {totalPassengers, setTotalPassengers} = usePassengers();
  const {rules, setRules} = useRules();

  useEffect(()=>{
    setRules(rules.map(rule=>{
      return rule.type !== TOTAL_RULE ? rule
        : {
          ...rule,
          total: Number(totalPassengers),
        }
    }));
  },[totalPassengers]);
  
  return (
    <div className="flex flex-col pb-4 w-full border-b mb-3">
      <div className="flex flex-col w-1/3">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
        <NumberSelector
          id={'totalPassengers'}
          name={'totalPassengers'}
          value={totalPassengers}
          handleChange={(value) => setTotalPassengers(value)}
        />
      </div>
    </div>
  );
};

export default TotalPassengerForm;