import React, { useCallback, useEffect } from 'react';
import { TOTAL_RULE } from '../../constants';
import { usePassengers } from '../../context/PassengerContext';
import { useRules } from '../../context/RuleContext';

const TotalPassengerForm = () => {

  const {totalPassengers, setTotalPassengers} = usePassengers();
  const {rules, setRules} = useRules();

  const handleUpdateTotalRule =useCallback(() => {
    setRules(rules.map(rule=>{
      return rule.type !== TOTAL_RULE ? rule
        : {
          ...rule,
          total: Number(totalPassengers),
        }
    }));
  },[totalPassengers])

  useEffect(()=>{
    handleUpdateTotalRule()
  },[totalPassengers]);
  
  return (
    <div className="flex flex-col pb-4 w-full border-b mb-3">
      <div className="flex flex-col w-1/3">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
        <input 
          name={'totalPassengers'}
          className="py-1 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="Total passengers" 
          value={totalPassengers}
          onChange={({target}) => setTotalPassengers(target.value)}
          />

      </div>
    </div>
  );
};

export default TotalPassengerForm;