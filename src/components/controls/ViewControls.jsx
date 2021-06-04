import React from 'react';

const ViewControls = ({
  id = '',
  handleEdit = () => {},
  handleRemove = () => {},
}) => {
  return (
    <div>
      <button 
          class="inline-block p-3 text-center text-blue-500 border bg-white transition border-blue-500 rounded-full shadow ripple hover:shadow-lg hover:border-blue-600 hover:text-bllue-600 focus:outline-none waves-effect mx-1"
          onClick={() => handleEdit(id)}
        >
          <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.873 477.873">
            <defs/>
            <path d="M392.533 238.937c-9.426 0-17.067 7.641-17.067 17.067V426.67c0 9.426-7.641 17.067-17.067 17.067H51.2c-9.426 0-17.067-7.641-17.067-17.067V85.337c0-9.426 7.641-17.067 17.067-17.067H256c9.426 0 17.067-7.641 17.067-17.067S265.426 34.137 256 34.137H51.2C22.923 34.137 0 57.06 0 85.337V426.67c0 28.277 22.923 51.2 51.2 51.2h307.2c28.277 0 51.2-22.923 51.2-51.2V256.003c0-9.425-7.641-17.066-17.067-17.066z"/>
            <path d="M458.742 19.142A65.328 65.328 0 00412.536.004a64.85 64.85 0 00-46.199 19.149L141.534 243.937a17.254 17.254 0 00-4.113 6.673l-34.133 102.4c-2.979 8.943 1.856 18.607 10.799 21.585 1.735.578 3.552.873 5.38.875a17.336 17.336 0 005.393-.87l102.4-34.133c2.515-.84 4.8-2.254 6.673-4.13l224.802-224.802c25.515-25.512 25.518-66.878.007-92.393z"/>
          </svg>
        </button>
        <button 
          class="inline-block p-3 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none waves-effect mx-1"
          onClick={() => handleRemove(id)}
        >
          <svg class="w-4 h-4 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
              clipRule="evenodd">
            </path>
          </svg>
        </button>
    </div>
  );
};

export default ViewControls;