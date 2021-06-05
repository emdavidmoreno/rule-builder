import { usePassengers } from '../../context/PassengerContext';
import RuleViewerWrapper from './RuleViewerWrapper';

const SumPaxVsSumPaxRuleView = ({
  id = '',
  leftPaxs = [],
  operator = '',
  rightPaxs = [],
  handleEdit = () => {},
  handleRemove = () => {},

}) => {
  const {passengers} = usePassengers();
  const passengersMap = new Map(passengers.map(p => [p.value, p]))
  const leftPaxLabels = leftPaxs.map(v => passengersMap.get(v).label);
  const rightPaxLabels = rightPaxs.map(v => passengersMap.get(v).label);
  return (
    <RuleViewerWrapper
      id={id}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
    >
      <span className="text-md font-bold mr-1"> Sum[ {leftPaxLabels.join(',')} ]</span>
      <span className="text-xs font-normal mx-1">{operator}</span>
      <span className="text-md font-bold mr-1"> Sum[ {rightPaxLabels.join(',')} ]</span>
    </RuleViewerWrapper>
  );
};

export default SumPaxVsSumPaxRuleView;