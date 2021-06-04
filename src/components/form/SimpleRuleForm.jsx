import React from 'react';
import { OperatorSelector, PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';

const SimpleRuleForm = ({
  id='',
  pax = '',
  operator = '',
  number = 0,
  handleSave= () => {},
  handleChange = () => {},
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
      <OperatorSelector
        id={id}
        name={'operator'}
        selectedValue={operator}
        handleChange={handleChange}
      />
      <input 
        id={id}
        name={'number'}
        className=" flex w-full mr-1 lg:w-1/4 py-1 px-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
        type="number" 
        placeholder="Number"
        value={number}
        onChange={handleChange}
      />
    </RuleFormWrapper>
  );
};

export default SimpleRuleForm;