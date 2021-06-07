import { useEffect, useState } from "react"
import { usePassengers } from "../../context/PassengerContext"

const TravelerOption = ({ id, handleChange, value = 0, label = '' }) => {
  return (
    <div className="custom-number-input h-10 w-5/6 flex flex-row items-center py-6 mx-auto">
      <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold mx-2">{label}
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={() => { handleChange(id, value - 1) }}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          autoComplete="off"
          unselectable="on"
          role="spinbutton"
          min={0}
          step={1}
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
          name={id} value={value}
          onChange={evt => handleChange(id, parseInt(evt.target.value, 10))}
        />
        <button
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={() => { handleChange(id, value + 1) }}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  )
}

const TravelerSelector = () => {
  const {passengers} = usePassengers();
  const [travelers, setTravelers] = useState([]);
  
  useEffect(()=>{
    setTravelers(passengers.map(passenger =>({
      label: passenger.label,
      key: passenger.value,
      value: 0
    })))
  },[passengers])
  
  const handleChange = () => {};

  return (
    <div className="w-full mx-auto border border-gray-100 bg-white rounded-xl py-6 px-0 shadow-md overflow-hidden">
      {travelers.map((item, id) => (
        <TravelerOption
          key={id}
          id={id}
          value={item.value}
          label={item.label}
          handleChange={handleChange}
        />
      ))}
    </div>
  )
}

export default TravelerSelector;