import React, { memo } from 'react';
import { PaxSelector, OperatorSelector, NumberSelector } from '../controls';
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
      <NumberSelector
        id={id}
        name={'number'}
        value={number}
        handleChange={handleChange}
      />
    </RuleFormWrapper>
  );
};

export default memo(SimpleRuleForm, (prev, next) =>{
  return (prev.pax === next.pax &&
    prev.operator === next.operator &&
    prev.name === next.number);
});