import React from 'react';

const FormControls = ({
  handleSave = ()=>{}
}) => {
  return (
    <button
        className="inline-block p-3 text-center text-white transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none ml-4"
        onClick={handleSave}
      >
        <svg className="w-4 h-4 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z"/>
        </svg>
    </button>
  );
};

export default FormControls;