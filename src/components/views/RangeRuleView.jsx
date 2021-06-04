import React from 'react';
import { usePassengers } from '../../context/PassengerContext';
import { ViewControls } from '../controls';


const RangeRuleView = ({
  id = '',
  pax = '',
  min = 0,
  max = 0,
  handleEdit = () => {},
  handleRemove = () => {},
}) => {
  const {passengers} = usePassengers();
  return (
    <li id={id} className="flex justify-between text-sm w-full lg:w-3/4">
      <div className="flex w-full items-center text-lg font-medium">
        <span>{min}</span>
        <span>{'<='}</span>
        <span > {(passengers.filter(p=> p.value === pax))[0].label || ''}</span>
        <span>{'<='}</span>
        <span>{max}</span>

      </div>
      <div className="flex w-full">
        <ViewControls
          id={id}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      </div>
    </li>
  );
};

export default RangeRuleView;