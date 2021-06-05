import { usePassengers } from "../../context/PassengerContext";
import RuleViewerWrapper from "./RuleViewerWrapper";

const SumPaxVsNumberRuleView = ({
  id = '',
  paxs = [],
  operator = '',
  number = 0,
  handleEdit = () => {},
  handleRemove = () => {},

}) => {
  const {passengers} = usePassengers();
  const passengersMap = new Map(passengers.map(p => [p.value, p]))
  const paxLabels = paxs.map(v => passengersMap.get(v).label);
  return (
    <RuleViewerWrapper
      id={id}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
    >
      <span className="text-md font-bold mr-1"> Sum[ {paxLabels.join(',')} ]</span>
      <span className="text-xs font-normal mx-1">{operator}</span>
      <span className="text-md font-bold mr-1">{number}</span>
    </RuleViewerWrapper>
  );
};

export default SumPaxVsNumberRuleView;