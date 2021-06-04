import React from 'react';
import { DOUBLE_EQUAL_TO, GREATER_THAN, GREATER_THAN_OR_EQUAL_TO, LESS_THAN, LESS_THAN_OR_EQUAL_TO } from '../../../constants';
import BaseSelector from './BaseSelector';

const OperatorSelector = ({
  id = '',
  name = '',
  selectedValue = '',
  handleChange = () => {},
}) => {
  const options = [
    {
      label: DOUBLE_EQUAL_TO,
      value: DOUBLE_EQUAL_TO,
    },
    {
      label: GREATER_THAN,
      value: GREATER_THAN,
    },
    {
      label: GREATER_THAN_OR_EQUAL_TO,
      value: GREATER_THAN_OR_EQUAL_TO,
    },
    {
      label: LESS_THAN,
      value: LESS_THAN,
    },
    {
      label: LESS_THAN_OR_EQUAL_TO,
      value: LESS_THAN_OR_EQUAL_TO,
    },
  ];
  return (
    <BaseSelector
      id={id}
      name={name}
      options={options}
      value={selectedValue}
      onChange={handleChange}
    />
  );
};

export default OperatorSelector;