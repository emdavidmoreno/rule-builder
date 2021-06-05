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
  const getOptionValue = (option) => option.value;
  const onSelectChange = (option) => {
    const value = 
      isMultiple ? option.map(o => o.value) : option.value;
    handleChange(id, name, value)
  };
  let value;
  if(isMultiple) {
    const selectedMapped = new Map(selectedValue.map(s => [s, s]));
    value = options.filter(opt => selectedMapped.has(opt.value));
  }
  else {
    value =  options.find(option => option.value === selectedValue)
  }
  
  return (
    <div className="relative w-full h-auto">
      <Select
        id={id}
        name={name}
        value={value}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onChange={onSelectChange}
        isMulti={isMultiple}
      />
    </div>
  );
};

export default BaseSelector;