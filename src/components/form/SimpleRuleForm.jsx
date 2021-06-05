import React from 'react';
import { FormControls, PaxSelector, OperatorSelector } from '../controls';

const SimpleRuleForm = ({
  id='',
  pax = '',
  operator = '',
  number = 0,
  handleSave= () => {},
  handleChange = () => {},
}) => {
  console.log({id, pax, operator, number});
  return (
    <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <PaxSelector
            id={id}
            name={'pax'}
            selectedValue={pax}
            handleChange={handleChange}
          />
          <OperatorSelector
            id={id}
            name={'operator'}
            selectedValue={operator}
            handleChange={handleChange}
          />
          <input 
            id={id}
            name={'number'}
            className=" flex w-full mr-1 lg:w-1/4 py-1 px-3 rounded-md border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
            type="number" 
            placeholder="Number"
            value={number}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-end">
          <FormControls
            handleSave={()=> handleSave(id)}
          />
        </div>
    </div>
  );
};

export default SimpleRuleForm;