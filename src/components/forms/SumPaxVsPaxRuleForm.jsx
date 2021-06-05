import React from 'react';
import { OperatorSelector, PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';

const SumPaxVsPaxRuleForm = ({
  id = '',
  paxs = [],
  operator = '',
  pax = '',
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

    </RuleFormWrapper>
  );
};

export default SumPaxVsPaxRuleForm;