import React from 'react';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa'

const ViewControls = ({
  id = '',
  handleEdit = () => {},
  handleRemove = () => {},
}) => {
  return (
    <div>
      <button 
          className="inline-block p-2 text-center text-blue-500 border bg-white transition border-blue-500 rounded-full shadow ripple hover:shadow-lg hover:border-blue-600 hover:text-bllue-600 focus:outline-none waves-effect mx-1"
          onClick={() => handleEdit(id)}
        >
          <FaEdit 
            className="w-4 h-4 fill-current"
          />
        </button>
        <button 
          className="inline-block p-2 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none waves-effect mx-1"
          onClick={() => handleRemove(id)}
        >
          <FaRegTrashAlt
            className="w-4 h-4 text-white fill-current"
          />
        </button>
    </div>
  );
};

export default ViewControls;