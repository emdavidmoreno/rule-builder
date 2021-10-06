import React from 'react';
import { NumberSelector, OperatorSelector, PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';

const PaxVsMultiplyPaxNumberRuleForm = ({
  id = '',
  leftPax = '',
  operator = '',
  rightPax = '',
  multiplier = 1,
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
      <NumberSelector
        id={id}
        name={'multiplier'}
        value={multiplier}
        handleChange={handleChange}
      />
    </RuleFormWrapper>
  );
};

export default PaxVsMultiplyPaxNumberRuleForm;