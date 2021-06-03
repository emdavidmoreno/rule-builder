import { createContext, useContext, useState } from "react";

const PassengerContext = createContext();

export const PassengerProvider = ({children}) => {
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [passengers, setPassengers] = useState([{name: 'age1', label: 'Adult', min: 0, max: 0}]);
  const [rulesString, setRulesString] = useState(0);

  return <PassengerContext.Provider
  value={{
    totalPassengers,
    setTotalPassengers,
    passengers,
    setPassengers,
    rulesString,
    setRulesString,
  }}
  >
    {children}
  </PassengerContext.Provider>
};

export const usePassengers = () => useContext(PassengerContext);

