import React from 'react';
import { DOUBLE_EQUAL_TO, GREATER_THAN, GREATER_THAN_OR_EQUAL_TO, LESS_THAN, LESS_THAN_OR_EQUAL_TO } from '../../constants';

const OperatorSelector = ({
  id = '',
  name = '',
  selectedValue = '',
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
      <option value="" />
      <option value={DOUBLE_EQUAL_TO}>{DOUBLE_EQUAL_TO}</option>
      <option value={GREATER_THAN}>{GREATER_THAN}</option>
      <option value={GREATER_THAN_OR_EQUAL_TO}>{GREATER_THAN_OR_EQUAL_TO}</option>
      <option value={LESS_THAN}>{LESS_THAN}</option>
      <option value={LESS_THAN_OR_EQUAL_TO}>{LESS_THAN_OR_EQUAL_TO}</option>
    </select>
  );
};

export default OperatorSelector;