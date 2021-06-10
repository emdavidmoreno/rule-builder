import { createContext, useContext, useState } from "react";

const initialPassengers = new Array(9).fill(null)
  .map((item, idx) =>({
    label: '',
    key: `age${idx + 1}`,
    value:  0,
    isActive: idx === 0,
  }));

  initialPassengers[0].isActive = true;
  initialPassengers[0].label = 'Adults';
  initialPassengers[0].value = 1;


const PassengerContext = createContext();

export const PassengerProvider = ({children}) => {
  const [totalPassengers, setTotalPassengers] = useState(9);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [rulesString, setRulesString] = useState(null);

  return <PassengerContext.Provider
  value={{
    totalPassengers,
    setTotalPassengers,
    passengers,
    activePassengers: passengers.filter(p => p.isActive),
    setPassengers,
    rulesString,
    setRulesString,
  }}
  >
    {children}
  </PassengerContext.Provider>
};

export const usePassengers = () => useContext(PassengerContext);

