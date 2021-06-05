import React from 'react';
import { PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';


const RangeRuleForm = ({
  id = '',
  pax = '',
  min = 0,
  max = 0,
  handleChange = () => {},
  handleSave = ()=> {},
}) => {
  
  return (
    <RuleFormWrapper
      id={id}
      handleSave={handleSave}
    >
      <PaxSelector
          id={id}
          name={'pax'}
          selectedValue={pax}
          handleChange={handleChange}
        />
        <input 
          id={id}
          name={'min'}
          className=" flex w-full mr-1 py-1 px-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="From"
          value={min}
          onChange={(e) => handleChange(id, 'min', Number(e.target.value))}
        />
        <input 
          id={id}
          name={'max'}
          className=" flex w-full mr-1 py-1 px-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="From"
          value={max}
          onChange={(e) => handleChange(id, 'max', Number(e.target.value))}
        />
    </RuleFormWrapper>
  );
};

export default RangeRuleForm;