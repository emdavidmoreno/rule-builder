import React from 'react';
import { FormControls } from '../controls';

const RuleFormWrapper = ({
  id = '',
  children,
  handleSave = ()=> {},
}) => {
  return (
    <div className="flex justify-between items-center w-full py-1">
      <div className="grid grid-cols-4 gap-2 w-full">
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


// 7 877 8027 mercedes Casa