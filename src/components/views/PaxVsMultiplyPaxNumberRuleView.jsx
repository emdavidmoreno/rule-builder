import React from 'react';
import { usePassengers } from '../../context/PassengerContext';
import RuleViewerWrapper from './RuleViewerWrapper';

const PaxVsMultiplyPaxNumberRuleView = ({
  id = '',
  leftPax = '',
  operator = '',
  rightPax = '',
  number = 1,
  handleEdit = () => {},
  handleRemove = () => {},
}) => {
  const {activePassengers} = usePassengers();

  return (
    <RuleViewerWrapper
      id={id}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
    >
      <span className="text-md font-bold mr-1"> {(activePassengers.filter(p=> p.key === leftPax))[0].label || ''}</span>
      <span className="text-xs font-normal mx-1">{operator}</span>
      ( <span className="text-md font-bold mr-1 ml-1"> {(activePassengers.filter(p=> p.key === rightPax))[0].label || ''}</span>
       x <span className="text-md font-bold mr-1 ml-1">{number}</span> )
      
    </RuleViewerWrapper>
  );
};

export default PaxVsMultiplyPaxNumberRuleView;