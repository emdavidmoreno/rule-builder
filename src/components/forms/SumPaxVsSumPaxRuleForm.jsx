import { OperatorSelector, PaxSelector } from "../controls";
import RuleFormWrapper from "./RuleFormWrapper";

const SumPaxVsSumPaxRuleForm = ({
  id = '',
  leftPaxs = [],
  operator = '',
  rightPaxs = [],
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
        name={'leftPaxs'}
        selectedValue={leftPaxs}
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
        name={'rightPaxs'}
        selectedValue={rightPaxs}
        handleChange={handleChange}
        isMultiple
      />

    </RuleFormWrapper>
  );
};

export default SumPaxVsSumPaxRuleForm;