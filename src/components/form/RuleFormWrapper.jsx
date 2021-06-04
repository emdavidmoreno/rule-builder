import React from 'react';
import { FormControls } from '../controls';

const RuleFormWrapper = ({
  id = '',
  children,
  handleSave = ()=> {},
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        {children}
      </div>
      <div className="flex items-end">
        <FormControls
          handleSave={()=> handleSave(id)}
        />
      </div>
    </div>
  );
};

export default RuleFormWrapper;