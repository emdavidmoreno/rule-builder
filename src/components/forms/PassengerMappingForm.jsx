import React, {useEffect, useRef } from 'react';
import { TOTAL_RULE } from '../../constants';
import { usePassengers } from '../../context/PassengerContext';
import { useRules } from '../../context/RuleContext';
const initialPassengers = new Array(9).fill(null)
  .map((item, idx) =>({
    label: '',
    value: `age${idx + 1}`,
    isActive: false,
  }));

  initialPassengers[0].isActive = true;
  initialPassengers[0].label = 'Adults';

const PassengerMappingForm = () => {
  const { passengers, activePassengers, setPassengers } = usePassengers();
  const {  rules, setRules, } = useRules();
  const passengersUpdated = useRef(true)
  
  useEffect(()=>{
    if(!passengersUpdated.current) {
      const newRules = rules.map(rule =>
        rule.type !== TOTAL_RULE ? rule
        : ({
          ...rule,
          paxs: activePassengers.map(p=>p.key)
        }))
      setRules(newRules);
      passengersUpdated.current = true;
      }
  }, [activePassengers, rules, setRules]);

  const handleChangeLabel = (value, index) => {
    passengersUpdated.current = false;
    const updatedPassengers = [...passengers]
    updatedPassengers[index].label = value;
    setPassengers(updatedPassengers);
  }

  const handleEnableDisablePax = (index) => {
    passengersUpdated.current = false;
    const updatedPassengers = [...passengers]
    updatedPassengers[index].isActive = !updatedPassengers[index].isActive;
    updatedPassengers[index].label = updatedPassengers[index].isActive ? 
    updatedPassengers[index].label : '';
    setPassengers(updatedPassengers);
  }
  
  return (
    <div className="flex flex-col mx-auto w-full lg:w-1/2">
      <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Passengers mapping</label>
      <ul>
        {passengers.map((field, idx) => (
          <li
            key={idx}
            className="flex w-full py-1 px-2 justify-between"
          > 
            <div className="flex items-center justify-center">
              <div className="relative">
                <input
                  id={idx}
                  type="checkbox" 
                  name="isActive"
                  checked={field.isActive}
                  className="inline-block align-middle" 
                  onChange={()=> handleEnableDisablePax(idx)}
                  disabled={idx === 0}
                />
                <label className="inline-block align-middle ml-1" htmlFor={idx}>{` Passenger${idx + 1}`}</label>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Total passengers</label>
              <input 
                id={idx}
                name={'label'}
                className="flex w-full py-1 px-3 rounded-md border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" 
                type="text" 
                placeholder="Total passengers" 
                value={field.label}
                onChange={(e) => handleChangeLabel(e.target.value, idx)}
                disabled={!field.isActive}
                />
            </div>
          

          </li>
        ))}
      </ul>
    </div>
  );
};

export default (PassengerMappingForm);