import Select from 'react-select';

const BaseSelector = ({
  id = '',
  name = '',
  selectedValue = '',
  options = [],
  isMultiple = false,
  handleChange = () => {},
}) => {
  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option;
  
  return (
    <div className="relative w-full h-auto">
      <Select
        id={id}
        name={name}
        value={selectedValue}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onChange={handleChange}
        isMulti={isMultiple}
      />
    </div>
  );
};

export default BaseSelector;