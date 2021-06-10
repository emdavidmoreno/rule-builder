import { useEffect, useState } from "react";
import { usePassengers } from "../../context/PassengerContext"
import { useRules } from "../../context/RuleContext";
import { evaluateRules } from "../../helpers/evaluateRules";

const TravelerOption = ({ id, handleChange, value = 0, label = '' }) => {
  return (
    <div className="custom-number-input h-10 w-5/6 flex flex-row items-center py-6 mx-auto">
      <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold mx-2">{label}
      </label>
      <div className="flex flex-row h-10 w-32 rounded-lg relative bg-transparent mt-1 bg-gray-300">
        <button
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={() => { handleChange(value - 1, id) }}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <span className="w-full text-center align-baseline h-full font-semibold text-md text-gray-700 bg-gray-300 py-2 mx-2">
          {value}
        </span>
        <button
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer outline-none"
          onClick={() => { handleChange(value + 1, id) }}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  )
}

const TravelerSelector = () => {
  const {passengers, setPassengers} = usePassengers();
  const [travelers, setTravelers] = useState([]);
  const {rules} = useRules();

  useEffect(()=>{
    setTravelers(passengers.map((passenger, index) =>({
      label: passenger.label,
      key: passenger.value,
      value: index === 0 ? 1 : 0
    })))
  },[passengers, rules])
  
  const handleChange = (value, index) => {
    if(value < 0) return;
    const updatedPassengers = passengers
      .filter(p => p.isActive)
      .map((passenger, idx) =>({
        ...passenger,
        value: index === idx ? value : passenger.value,
      }))
    
    const isValid = evaluateRules(rules, updatedPassengers)
    if(isValid) {
      setPassengers(updatedPassengers);
    }
  };

  return (
    <div className="w-full mx-auto border border-gray-100 bg-white rounded-xl py-6 px-0 shadow-md overflow-hidden">
      <h1 className="mx-8 pb-6 font-bold text-blue-800 flex-1 uppercase">Passengers</h1>
      {passengers.filter(p => p.isActive).map((item, id) => (
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