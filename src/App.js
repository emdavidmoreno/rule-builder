import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PassengerForm from './components/PassengerForm';
import RuleEditor from './components/presentation/RuleEditor';
import rulesSTR from './helpers/getRuleFromPassengerConfig';
import { usePassengers } from './context/PassengerContext';
import { useNavigation } from './context/NavigationContext';
import MultiStepForm from './components/form/MultiStepForm';
import TotalPassengerForm from './components/form/TotalPassengerForm';
import PassengerMappingForm from './components/form/PassengerMappingForm';
import PassengerRulesList from './components/PassengerRulesList';

function App() {

  const {
    totalPassengers, 
    setTotalPassengers,
    passengers, 
    setPassengers,
  } = usePassengers();

  const {current} = useNavigation();

  const [rulesString, setRulesString] = useState(null);
  
  useEffect(()=>{
    setRulesString(rulesSTR(totalPassengers, passengers));
  },[totalPassengers, passengers])
  
  const handleChangeValue = (event)=> {
    event.preventDefault();
    const {id, name, value} = event.target;
    if(['name', 'min', 'max'].includes(name)) {
      const updatedPassengers = [...passengers]
      updatedPassengers[id][name] = value;
      setPassengers(updatedPassengers);
    }
    if(['totalPassengers'].includes(name)){
      setTotalPassengers(value)
    }
  }
  
  const addRule = () => setPassengers([...passengers,{name: '', min: 0, max: 0}]);

  const removeRule = (idx) => {
    if(passengers.length > 1){
      setPassengers([...passengers.filter((item,index)=> index !== idx)])
    }
  } 
  return (
    <div className="flex mx-auto w-screen h-screen">
      {/* sidebar */}

      {/* topbar */}

      {/* content */}
      <div className="container mx-auto">
        <h2 className="text-blue-800 text-left font-bold text-2xl uppercase mt-3 flex items-center leading-none">
          Passenger rules Playground
        </h2>
        <div className="flex flex-row items-center items-stretch space-x-1">
          {/* basic rules form */}
          <div className="flex flex-col justify-center w-full lg:max-w-1/2 border rounded-md shadow-md border-gray-200 py-4 h-auto">
            <MultiStepForm>
              {current === 1 && (
                <PassengerMappingForm />
              )}

              {current === 2 && (
                <>
                  <TotalPassengerForm
                    value={totalPassengers}
                    handleChange={handleChangeValue}
                  />
                  <PassengerRulesList />
                </>
              )}

              {current === 3 && (
                <span>maybe remove this</span>
              )}

              {current === 4 && (
                <>
                  'Show the result in the editor and save'
                  <div className="flex justify-start w-max my-4 mx-8">
                    <button 
                      className='w-auto bg-blue-500 hover:bg-bllue-700 rounded-md shadow-md font-medium text-white px-4 py-2'
                      onClick={addRule}
                    >
                      Add passenger
                    </button>
                  </div>
                  {passengers.map((passenger, idx) => (
                    <PassengerForm
                      key={idx}
                      id={idx}
                      name={passenger.name || ''}
                      min={passenger.min || 0}
                      max={passenger.max || 0}
                      handleChange={handleChangeValue}
                      handleRemove={removeRule}
                    />
                  ))}
                </>
              )}

            </MultiStepForm>
          </div>

          {/* custom rules editor */}
          <div className="flex flex-col justify-center w-full lg:max-w-1/2 border rounded-md shadow-md border-gray-200 py-4 px-4">
            <RuleEditor
              value={rulesString}
              handleChange={setRulesString}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
