import { createContext, useContext, useState } from "react";

const PassengerContext = createContext();

export const PassengerProvider = ({children}) => {
  const [totalPassengers, setTotalPassengers] = useState(9);
  const [passengers, setPassengers] = useState([{key: 'age1', label: 'Adult', value: 1}]);
  const [rulesString, setRulesString] = useState(null);

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

