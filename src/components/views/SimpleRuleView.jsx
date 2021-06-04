import React from 'react';
import ViewControls from '../controls/ViewControls';

const SimpleRuleView = ({
  id = '',
  pax = '',
  operator = '',
  number = 0,
  handleEdit = () => {},
  handleRemove = () => {},

}) => {
  return (
    <li id={id} className="flex justify-between text-sm w-full lg:w-3/4">
      <div className="flex w-full items-center text-lg font-medium">
        <span > {pax}</span>
        <span>{operator}</span>
        <span>{number}</span>
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

export default SimpleRuleView;