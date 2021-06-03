import React, { memo, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';


const MultiStepForm = ({children}) => {
  const {
    current, 
    setCurrent,
    steps,
  } = useNavigation()

  const handleClickNext = (event) => {
    event.preventDefault()
    setCurrent(current + 1);
  }
  const handleClickPrev = (event) => {
    event.preventDefault()
    setCurrent(current - 1);
  }

  return (
    <div className="flex flex-col h-full justify-between w-full lg:max-w-1/2">
      <div className="mx-4 my-2">
        {children}
      </div>
      <div className="flex py-2 bg-white border-t-2 border-gray-100 mt-4 h-16">
        <div className="w-full max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              {current > 1 && (
                <button
                  className="w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border" 
                  onClick={handleClickPrev}
                >
                  Previous
                </button>

              )}
            </div>

            <div className="w-1/2 text-right">
              {current < steps && (
                <button
                  className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium" 
                  onClick={handleClickNext}
                >
                  Next
                </button>
              )}
              {current === steps && (
                <button
                  className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium" 
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        </div>
		  </div>
    </div>
  );
};

export default memo(MultiStepForm);