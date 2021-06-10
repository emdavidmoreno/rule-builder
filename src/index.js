import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PassengerProvider } from './context/PassengerContext';
import { NavigationProvider } from './context/NavigationContext';
import { RuleProvider } from './context/RuleContext';
import { RuleFormatProvider } from './context/RuleFormatContext';
import { TenantProvider } from './context/TenantContext';


ReactDOM.render(
  <React.StrictMode>
    <TenantProvider>
      <PassengerProvider>
        <NavigationProvider>
          <RuleProvider>
            <RuleFormatProvider>
              <App />
            </RuleFormatProvider>
          </RuleProvider>
        </NavigationProvider>
      </PassengerProvider>
    </TenantProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
