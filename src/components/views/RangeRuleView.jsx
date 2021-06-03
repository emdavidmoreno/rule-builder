import React from 'react';

const RangeRuleView = ({
  id = '',
  pax = '',
  min = 0,
  max = 0,
}) => {
  return (
    <li id={id} className="flex justify-between text-sm">
      <span>{min}</span>
       <span>{'<='}</span>
      <div className="span"> {pax}</div>
      <span>{'<='}</span>
      <span>{max}</span>
    </li>
  );
};

export default RangeRuleView;