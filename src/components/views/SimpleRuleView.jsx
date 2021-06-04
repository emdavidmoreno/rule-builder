import React from 'react';
import { usePassengers } from '../../context/PassengerContext';
import RuleViewerWrapper from './RuleViewerWrapper';

const SimpleRuleView = ({
  id = '',
  pax = '',
  operator = '',
  number = 0,
  handleEdit = () => {},
  handleRemove = () => {},

}) => {
  const {passengers} = usePassengers();
  return (
    <RuleViewerWrapper
      id={id}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
    >
      <span className="text-md font-bold mr-1"> {(passengers.filter(p=> p.value === pax))[0].label || ''}</span>
      <span className="text-xs font-normal mx-1">{operator}</span>
      <span className="text-md font-bold mr-1">{number}</span>
    </RuleViewerWrapper>
  );
};

export default SimpleRuleView;