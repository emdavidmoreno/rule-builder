import React from 'react';

const TotalPassengerForm = ({value, handleChange}) => {
  
  return (
    <div className="flex flex-col mx-auto w-full lg:w-1/2">
      <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
      <input 
        name={'totalPassengers'}
        className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
        type="number" placeholder="Total passengers" 
        value={value}
        onChange={handleChange}
        />
    </div>
  );
};

export default TotalPassengerForm;