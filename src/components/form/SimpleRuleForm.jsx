import React from 'react';
import PaxSelector from '../controls/PaxSelector';
import FormControls from '../controls/FormControls';
import OperatorSelector from '../controls/OperatorSelector';

const SimpleRuleForm = ({
  id='',
  pax = '',
  operator = '',
  number = 0,
  handleSave= () => {},
  handleChange = () => {},
}) => {

  return (
    <div className="grid grid-cols-1 mt-5 mx-4 w-3/4">
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
            className=" flex w-full mr-1 lg:w-1/4 py-1 px-3 rounded-md border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
            type="number" 
            placeholder="Number"
            value={number}
            onChange={handleChange}
          />
          <FormControls
            handleSave={()=> handleSave(id)}
          />
        </div>
    </div>
  );
};

export default SimpleRuleForm;