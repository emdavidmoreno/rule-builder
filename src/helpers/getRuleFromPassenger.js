const totalRule = (passengers = [], total = 9) => {
  if (!passengers.length) return {};
  passengers = passengers.map(p => {return {"var": p}});
  return { "<=" : [{ "+" : [ ...passengers] }, total] };
}

const rangeRulePassengerValueValue = (passenger = '', minval = 0, maxval = 9) => {
  if (passenger==='') return {};
  return { "and" : [{ ">=" : [{"var": passenger}, minval] }, { "<=" : [{"var": passenger}, maxval] }] };
}

const simpleRulePassengerValue = (operator = '<=', passenger = '', value = 9) => {

  return { [operator] : [{"var": passenger}, value] };
}

const simpleRulePassengerPassenger = (operator, passengerLeft, passengerRight) => {
  return { [operator] : [{"var": passengerLeft}, {"var": passengerRight}] };
}

const multiplyRulePassengerPassengerByValue = (operator, passengerLeft, passengerRight, multiplyValue) => {
  return { [operator] : [{"var": passengerLeft}, {"*": [{"var": passengerRight}, multiplyValue]}] };
}

const sumRulePassengersValue = (operator, passengers, value) => {
  passengers = passengers.map(p => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengers] }, value] };
}

const sumRulePassengerPassengers = (operator, passenger, passengers) => {
  passengers = passengers.map(p => {return {"var": p}});
  return { [operator] : [{"var": passenger}, { "+" : [ ...passengers] }] };
}

const sumRulePassengersLeftPassengersRight = (operator, passengersLeft, passengersRight) => {
  passengersLeft = passengersLeft.map(p => {return {"var": p}});
  passengersRight = passengersRight.map(p => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengersLeft] }, { "+" : [ ...passengersLeft] }] };
}

///////////////// USE EXAMPLES /////////////////////////////////////////////////////////
// const rules = { "and" : [] };
// rules.and.push(rangeRuleAgeValueValue('age1', 3, 7));
// rules.and.push(simpleRuleAgeValue('<=', 'age2', 5));
// rules.and.push(simpleRuleAgeAge('<=', 'age2', 'age1'))
// rules.and.push(multiplyRuleAgeAgeByValue('<=', 'age5', 'age1', 2));
// rules.and.push(sumRuleAgearrayValue('<=', ['age1','age2','age3'], 10));
// rules.and.push(sumRuleAgeAgearray('<=', 'age4', ['age1','age2','age3']));
// rules.and.push(sumRuleAgearrayAgearray('>=', ['age1','age2'], ['age4','age5']));
////////////////////////////////////////////////////////////////////////////////////////