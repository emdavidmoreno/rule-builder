import { useEffect, useState } from 'react';
import RuleEditor from './components/presentation/RuleEditor';
import  { convertRulesToString } from './helpers/getRuleFromPassenger';
import { usePassengers } from './context/PassengerContext';
import { useNavigation } from './context/NavigationContext';
import MultiStepForm from './components/form/MultiStepForm';
import TotalPassengerForm from './components/form/TotalPassengerForm';
import PassengerMappingForm from './components/form/PassengerMappingForm';
import PassengerRulesList from './components/PassengerRulesList';
import { useRules } from './context/RuleContext';
import { RULE_DEFAULT_FORMAT, TOTAL_RULE } from './constants';

function App() {

  const {
    totalPassengers, 
    setTotalPassengers,
    passengers, 
    setPassengers,
  } = usePassengers();

  const {rules, setRules} = useRules();

  const {current} = useNavigation();

  const [rulesString, setRulesString] = useState(null);
  const [format, setFormat] = useState(RULE_DEFAULT_FORMAT); // to change rule string format
  
  useEffect(()=>{
    const paxs = passengers.map(p => p.value);
    setRulesString(convertRulesToString(rules, format))
  },[rules, totalPassengers, passengers])
  
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
      setRules(rules.map(rule=>{
        return rule.type !== TOTAL_RULE ? rule
          : {
            ...rule,
            total: value,
          }
      }))
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
