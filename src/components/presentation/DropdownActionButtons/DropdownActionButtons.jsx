import React from 'react';

const DropdownActionButtons = ({
  isOpen,
  toggleIsOpen, 
  buttonLabel = '', 
  actions = []
}) => {
  return (
    <div>
      <button
        className="outline-none focus:outline-none border px-3 py-1 bg-gray-100 rounded-md flex items-center min-w-32"
        onClick={()=>{toggleIsOpen(!isOpen)}}
      >
        <span className="pr-1 font-semibold flex-1">{buttonLabel}</span>
        <span>
          <svg
            className={`fill-current h-full w-4 transform transition duration-150 ease-in-out ${isOpen && '-rotate-180'} flex justify-center`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
          className={`bg-white rounded-sm shadow-sm overflow-hidden transform ${isOpen === true ? 'flex flex-col': 'hidden'} absolute transition duration-150 ease-in-out origin-top w-full max-w-xs z-10 p-0`}
        >
          {actions.map((item, idx) =>(
            <li 
              key={idx}
              className="flex text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white border w-full px-4 m-0"
            >
              <button 
                className="block w-full py-2 fill-current"
                onClick={item.action}
              >
                {item.label}
              </button>
            </li>
          ))}
          
        </ul>
    </div>
  );
};

export default DropdownActionButtons;