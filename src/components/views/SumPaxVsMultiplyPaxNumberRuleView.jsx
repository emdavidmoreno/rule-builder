import React from 'react';
import { usePassengers } from '../../context/PassengerContext';
import RuleViewerWrapper from './RuleViewerWrapper';

const SumPaxVsMultiplyPaxNumberRuleView = ({
  id = '',
  paxs = [],
  operator = '',
  pax = '',
  multiplier = 1,
  handleEdit = () => {},
  handleRemove = () => {},
}) => {
  const {activePassengers} = usePassengers();
  const passengersMap = new Map(activePassengers.map(p => [p.key, p]))
  const paxLabels = paxs.map(v => passengersMap.get(v).label);

  return (
    <RuleViewerWrapper
      id={id}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
    >
      <span className="text-md font-bold mr-1"> Sum[ {paxLabels.join(',')} ]</span>
      <span className="text-xs font-normal mx-1">{operator}</span>
      ( <span className="text-md font-bold mr-1 ml-1"> {(activePassengers.filter(p=> p.key === pax))[0].label || ''}</span>
       x <span className="text-md font-bold mr-1 ml-1">{multiplier}</span> )
      
    </RuleViewerWrapper>
  );
};

export default SumPaxVsMultiplyPaxNumberRuleView;