import {FaCheck} from 'react-icons/fa';

const FormControls = ({
  handleSave = ()=>{}
}) => {
  return (
    <button
        className="flex p-2 text-center text-white rounded-full shadow transition bg-blue-800 hover:shadow-lg hover:bg-blue-600 focus:outline-none ml-4"
        onClick={handleSave}
      >
        <FaCheck
        className="w-4 h-4 text-white fill-current"
        />
    </button>
  );
};

export default FormControls;