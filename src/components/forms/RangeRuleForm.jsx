import React from 'react';
import { NumberSelector, PaxSelector } from '../controls';
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
        <NumberSelector
          id={id}
          name={'min'}
          value={min}
          handleChange={handleChange}
        />
        <NumberSelector
          id={id}
          name={'max'}
          value={max}
          handleChange={handleChange}
        />
    </RuleFormWrapper>
  );
};

export default RangeRuleForm;