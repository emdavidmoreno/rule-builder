import { RULE_COMPACT_FORMAT, RULE_DEFAULT_FORMAT, RULE_EXTENDED_FORMAT } from "../../../constants";
import BaseSelector from "./BaseSelector";

const FormatSelector = ({
  id = '',
  name = '',
  selectedValue = '',
  handleChange = () => {},
}) => {
  const options = [
    {
      label: RULE_DEFAULT_FORMAT,
      value: RULE_DEFAULT_FORMAT,
    },
    {
      label: RULE_COMPACT_FORMAT,
      value: RULE_COMPACT_FORMAT,
    },
    {
      label: RULE_EXTENDED_FORMAT,
      value: RULE_EXTENDED_FORMAT,
    },
  ];
  return (
    <BaseSelector
      id={id}
      name={name}
      options={options}
      selectedValue={selectedValue}
      handleChange={handleChange}
    />
  );
};

export default FormatSelector;