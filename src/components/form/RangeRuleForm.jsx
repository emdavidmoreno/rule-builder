import React from 'react';
import { FormControls, PaxSelector } from '../controls';


const RangeRuleForm = ({
  id = '',
  pax = '',
  min = 0,
  max = 0,
  handleChange = () => {},
  handleSave = ()=> {},
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
        <input 
          id={id}
          name={'min'}
          className=" flex w-full mr-1 lg:w-1/4 py-1 px-3 rounded-md border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="From"
          value={min}
          onChange={handleChange}
        />
        <input 
          id={id}
          name={'max'}
          className=" flex w-full mr-1 lg:w-1/4 py-1 px-3 rounded-md border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="From"
          value={max}
          onChange={handleChange}
        />
        <FormControls
          handleSave={ () => handleSave(id)}
        />
      </div>
    </div>
  );
};

export default RangeRuleForm;