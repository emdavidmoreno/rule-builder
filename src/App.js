import { useNavigation } from './context/NavigationContext';
import MultiStepForm from './components/forms/MultiStepForm';
import TotalPassengerForm from './components/forms/TotalPassengerForm';
import PassengerMappingForm from './components/forms/PassengerMappingForm';
import PassengerRulesList from './components/PassengerRulesList';
import RuleViewer from './components/presentation/RuleViewer';

function App() {

  const {current} = useNavigation();
  
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
                  <TotalPassengerForm />
                  <PassengerRulesList />
                </>
              )}

            </MultiStepForm>
          </div>

          {/* custom rules editor */}
          <div className="flex flex-col justify-center w-full lg:max-w-1/2 border rounded-md shadow-md border-gray-200 py-4 px-4">
            <RuleViewer />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
