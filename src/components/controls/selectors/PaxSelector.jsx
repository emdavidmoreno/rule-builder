import React from 'react';
import { usePassengers } from '../../../context/PassengerContext';
import BaseSelector from './BaseSelector';

const PaxSelector = ({
  id = '',
  name = '',
  selectedValue = '',
  isMultiple = false,
  handleChange = () => {},
}) => {
  const {passengers = []} = usePassengers();
  return(
    <BaseSelector
      id={id}
      name={name}
      selectedValue={selectedValue}
      options={passengers}
      handleChange={handleChange}
      isMultiple={isMultiple}
    />
  );
};

export default PaxSelector;