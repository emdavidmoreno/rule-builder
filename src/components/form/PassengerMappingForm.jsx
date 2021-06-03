import React, {useEffect, useState } from 'react';
import { usePassengers } from '../../context/PassengerContext';
const initialPassengers = new Array(9).fill(null)
  .map((item, idx) =>({
    label: '',
    value: `age${idx + 1}`,
    isActive: false,
  }));

  initialPassengers[0].isActive = true;
  initialPassengers[0].label = 'Adults';

const PassengerMappingForm = () => {
  const [formFielData, setFormFielData] = useState(initialPassengers);
  const { passengers, setPassengers } = usePassengers();

  useEffect(()=>{
    return ()=> {
      const paxMap = new Map(passengers.map(p => [p.name, p]));
      const newPax = formFielData
        .filter(f => f.isActive)
        .map(field => {
          return paxMap.has(field.value) ? 
          paxMap.get(field.value) : {
            name: field.value, 
            label: field.label,
            min: 0,
            max: 0
          }
        });
      setPassengers(newPax);
    }
  }, [])

  const handleChangeLabel = (value, index) => {
    const updatedformFielData = [...formFielData]
    updatedformFielData[index].label = value;
    setFormFielData(updatedformFielData);
  }

  const handleEnableDisablePax = (index) => {
    const updatedformFielData = [...formFielData]
    updatedformFielData[index].isActive = !updatedformFielData[index].isActive;
    setFormFielData(updatedformFielData);
  }


  
  return (
    <div className="flex flex-col mx-auto w-full lg:w-1/2">
      <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Passengers mapping</label>
      <ul>
        {formFielData.map((field, idx) => (
          <li
            key={idx}
            className="flex w-full py-2 px-2 justify-between"
          > 
            <div className="flex items-center justify-center">
              <label className="flex flex-row items-center">
                <input 
                  type="checkbox" 
                  name="isActive" 
                  id={idx} 
                  checked={field.isActive}
                  onChange={()=> handleEnableDisablePax(idx)}
                />
                {` Passenger${idx + 1}`}
              </label>
            </div>
            <div className="flex flex-col items-start">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
              <input 
                id={idx}
                name={'label'}
                className="py-1 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" 
                type="text" 
                placeholder="Total passengers" 
                value={field.label}
                onChange={(e) => handleChangeLabel(e.target.value, idx)}
                />
            </div>
          

          </li>
        ))}
      </ul>
    </div>
  );
};

export default (PassengerMappingForm);