import React from 'react';
import { NumberSelector, OperatorSelector, PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';

const SumPaxVsMultiplyPaxNumberRuleForm = ({
  id = '',
  paxs = [],
  operator = '',
  pax = '',
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
        name={'paxs'}
        selectedValue={paxs}
        handleChange={handleChange}
        isMultiple
      />
      <OperatorSelector
        id={id}
        name={'operator'}
        selectedValue={operator}
        handleChange={handleChange}
      />
      <PaxSelector
        id={id}
        name={'pax'}
        selectedValue={pax}
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

export default SumPaxVsMultiplyPaxNumberRuleForm;