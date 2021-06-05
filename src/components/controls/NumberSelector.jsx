import React from 'react';

const NumberSelector = ({
  id = '',
  name = '',
  value = 0,
  handleChange = () => {},
}) => {
  return (
  <input 
    id={id}
    name={name}
    className="flex w-full mr-1 py-1 px-3 max-h-10 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
    type="number" 
    placeholder="Number"
    value={value}
    onChange={(e) => handleChange(Number(e.target.value), id, name)}
  />
  );
};

export default NumberSelector;