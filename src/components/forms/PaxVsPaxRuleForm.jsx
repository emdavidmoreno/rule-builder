import React from 'react';
import { OperatorSelector, PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';

const PaxVsPaxRuleForm = ({
  id = '',
  leftPax = '',
  operator = '',
  rightPax = 0,
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
        name={'leftPax'}
        selectedValue={leftPax}
        handleChange={handleChange}
      />
      <OperatorSelector
        id={id}
        name={'operator'}
        selectedValue={operator}
        handleChange={handleChange}
      />
      <PaxSelector
        id={id}
        name={'rightPax'}
        selectedValue={rightPax}
        handleChange={handleChange}
      />
    </RuleFormWrapper>
  );
};

export default PaxVsPaxRuleForm;