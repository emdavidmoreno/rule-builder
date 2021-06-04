import React from 'react';

const TotalPassengerForm = ({value, handleChange}) => {
  
  return (
    <div className="flex flex-col pb-4 w-full border-b mb-3">
      <div className="flex flex-col w-1/3">
        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
        <input 
          name={'totalPassengers'}
          className="py-1 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="Total passengers" 
          value={value}
          onChange={handleChange}
          />

      </div>
    </div>
  );
};

export default TotalPassengerForm;