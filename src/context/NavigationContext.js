import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({children}) => {
  const [steps, setSteps] = useState(4);
  const [current, setCurrent] = useState(1);
  return (
  <NavigationContext.Provider value={{
    steps, 
    setSteps, 
    current, 
    setCurrent,
  }}>
    {children}
  </NavigationContext.Provider>
  )
}

export const useNavigation = () => useContext(NavigationContext);