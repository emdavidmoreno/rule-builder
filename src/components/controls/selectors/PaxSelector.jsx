import React from 'react';
import { usePassengers } from '../../../context/PassengerContext';
import BaseSelector from './BaseSelector';

const PaxSelector = ({
  id = '',
  name = '',
  selectedValue = '',
  handleChange = () => {},
}) => {
  const {passengers = []} = usePassengers();

  return(
    <BaseSelector
      id={id}
      name={name}
      value={selectedValue}
      options={passengers}
      onChange={handleChange}
    />
  );
};

export default PaxSelector;