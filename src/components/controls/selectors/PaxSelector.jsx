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
  const {activePassengers = []} = usePassengers();
  let selectedOption;
  if(isMultiple) {
    const selectedMapped = new Map(selectedValue.map(s => [s, s]));
    selectedOption = activePassengers.filter(opt => selectedMapped.has(opt.key));
  }
  else {
    selectedOption =  activePassengers.find(option => option.key === selectedValue )
  }
  const onSelectChange = (option) => {
    const value = 
      isMultiple ? option.map(o => o.key) : option.key;
    handleChange(value, id, name)
  };
  return(
    <BaseSelector
      id={id}
      name={name}
      selectedValue={selectedOption}
      options={activePassengers}
      handleChange={onSelectChange}
      isMultiple={isMultiple}
    />
  );
};

export default PaxSelector;