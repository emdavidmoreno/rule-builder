import React from 'react';

const PassengerForm = ({
  id = '0',
  name = '',
  min = 0,
  max = 0,
  handleChange = () => {},
  handleRemove= () => {}
}) => {
  
  return (
    <div className="grid grid-cols-1 mt-5 mx-4">
      <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Input 1</label>
      <div className="flex items-center">
        <input 
          id={id}
          name={'name'}
          className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="text" placeholder="age1"
          value={name}
          onChange={handleChange}
          />
        <input 
          id={id}
          name={'min'}
          className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="From"
          value={min}
          onChange={handleChange}
        />
        <input 
          id={id}
          name={'max'}
          className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          type="number" placeholder="From"
          value={max}
          onChange={handleChange}
        />
        <button
            className="inline-block p-3 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none ml-4"
            onClick={() => handleRemove(id)}
          >
          <svg className="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PassengerForm;