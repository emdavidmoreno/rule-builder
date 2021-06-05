import { NumberSelector, OperatorSelector, PaxSelector } from '../controls';
import RuleFormWrapper from './RuleFormWrapper';

const SumPaxVsNumberRuleForm = ({
  id = '',
  paxs = [],
  operator = '',
  number = 0,
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
      <NumberSelector
        id={id}
        name={'number'}
        value={number}
        handleChange={handleChange}

      />
    </RuleFormWrapper>
  );
};

export default SumPaxVsNumberRuleForm;