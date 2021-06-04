import { SUM_PAX_VS_PAX_RULE, PAX_VS_PAX_RULE, RANGE_RULE, SIMPLE_RULE, SUM_PAX_VS_NUMBER_RULE, SUM_PAX_VS_SUM_PAX_RULE, TOTAL_RULE, RULE_DEFAULT_FORMAT, PAX_VS_PAX_MULTIPLY_RULE } from "../constants";

const totalRule = (passengers = [], total = 9) => {
  if (!passengers.length) return {};
  passengers = passengers.map((p = '') => {return {"var": p}});
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
  passengers = passengers.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengers] }, value] };
}

const sumRulePassengerPassengers = (operator, passenger, passengers) => {
  passengers = passengers.map((p = '') => {return {"var": p}});
  return { [operator] : [{"var": passenger}, { "+" : [ ...passengers] }] };
}

const sumRulePassengersLeftPassengersRight = (operator, passengersLeft, passengersRight) => {
  passengersLeft = passengersLeft.map((p = '') => {return {"var": p}});
  passengersRight = passengersRight.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengersLeft] }, { "+" : [ ...passengersLeft] }] };
}

export const convertRulesToString = (rules =[], format = RULE_DEFAULT_FORMAT) => {
  try {
    const stringRules = rules.map(rule => {
      switch (rule.type) {
        case TOTAL_RULE:
          return totalRule(rule.paxs, rule.total);
        case RANGE_RULE:
          return rangeRulePassengerValueValue(rule.pax, rule.min, rule.max);
        case SIMPLE_RULE:
          return simpleRulePassengerValue(rule.operator, rule.pax, rule.number);
        case PAX_VS_PAX_RULE:
          return simpleRulePassengerPassenger(rule.operator, rule.leftPax, rule.rightPax);
        case SUM_PAX_VS_NUMBER_RULE:
          return sumRulePassengersValue(rule.operator, rule.paxs, rule.number);
        case SUM_PAX_VS_SUM_PAX_RULE:
          return sumRulePassengersLeftPassengersRight(rule.operator, rule.leftPaxs, rule.rightPaxs);
        case SUM_PAX_VS_PAX_RULE:
          return sumRulePassengerPassengers(rule.operator, rule.pax, rule.paxs);
        case PAX_VS_PAX_MULTIPLY_RULE:
          return multiplyRulePassengerPassengerByValue(rule.operator, rule.leftPax, rule.rightPax, rule.multiplier);
        default:
          return '';
      }
    })
    .map(r => JSON.stringify(r))
    .join(',\n');
    return `{
  "and":[
    ${stringRules}
  ]}`
    
  } catch (error) {
    console.log(error);
    return "";
  }
}

