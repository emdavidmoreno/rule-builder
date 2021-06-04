import React from 'react';
import { ViewControls } from '../controls';

const RuleViewerWrapper = ({
  id= '',
  children,
  handleEdit = () => {},
  handleRemove = () => {}
}) => {
  return (
    <div className="flex justify-between items-center w-full">
    <div className="flex items-center">
     {children}
    </div>
    <div className="flex items-end">
      <ViewControls
        id={id}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
      />
    </div>
  </div>
  );
};

export default RuleViewerWrapper;