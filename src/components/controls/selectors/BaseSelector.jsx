import React from 'react';

const BaseSelector = ({
  id = '',
  name = '',
  selectedValue = '',
  options = [],
  handleChange = () => {},
}) => {
  return (
    <select 
    id={id}
    name={name}
    className=" flex w-full mr-1 lg:w-1/4 py-1 px-3 rounded-md border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
    value={selectedValue}
    onChange={handleChange}
  >
    {options.map(opt => (
       <option value={opt.value}>{opt.label}</option>
    ))}
  </select>
  );
};

export default BaseSelector;