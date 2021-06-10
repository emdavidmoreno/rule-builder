import React from 'react';
import { LESS_THAN_OR_EQUAL_TO } from '../../constants';
import { usePassengers } from '../../context/PassengerContext';
import RuleViewerWrapper from './RuleViewerWrapper';


const RangeRuleView = ({
  id = '',
  pax = '',
  min = 0,
  max = 0,
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
       <span className="text-md font-bold mr-1">{min}</span>
        <span className="text-xs font-normal mx-1">{LESS_THAN_OR_EQUAL_TO}</span>
        <span className="text-md font-bold mr-1"> {(activePassengers.filter(p=> p.key === pax))[0].label || ''}</span>
        <span className="text-xs font-normal mx-1">{LESS_THAN_OR_EQUAL_TO}</span>
        <span className="text-md font-bold mr-1">{max}</span>
    </RuleViewerWrapper>
  );
};

export default RangeRuleView;