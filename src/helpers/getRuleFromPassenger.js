import { 
  TOTAL_RULE, 
  RANGE_RULE,
  SIMPLE_RULE,
  PAX_VS_PAX_RULE,
  SUM_PAX_VS_PAX_RULE,
  RULE_DEFAULT_FORMAT, 
  RULE_COMPACT_FORMAT, 
  SUM_PAX_VS_NUMBER_RULE,
  SUM_PAX_VS_SUM_PAX_RULE,
  PAX_VS_PAX_MULTIPLY_RULE, 
  SUM_PAX_VS_PAX_MULTIPLY_RULE,
  SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE, 
} from "../constants";

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
  if (passenger==='') return {};
  return { [operator] : [{"var": passenger}, value] };
}

const simpleRulePassengerPassenger = (operator = '<=', passengerLeft = '', passengerRight = '') => {
  if (passengerLeft==='' || passengerRight==='') return {};
  return { [operator] : [{"var": passengerLeft}, {"var": passengerRight}] };
}

const multiplyRulePassengerPassengerByValue = (operator = '<=', passengerLeft = '', passengerRight = '', multiplyValue = 1) => {
  if (passengerLeft==='' || passengerRight==='') return {};
  return { [operator] : [{"var": passengerLeft}, {"*": [{"var": passengerRight}, multiplyValue]}] };
}

const sumRulePassengersValue = (operator = '<=', passengers = [], value = 0) => {
  if (!passengers.length) return {};
  passengers = passengers.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengers] }, value] };
}

const sumRulePassengerPassengers = (operator = '<=', passenger = '', passengers= []) => {
  if (!passengers.length || passenger==='') return {};
  passengers = passengers.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengers] }, {"var": passenger}] };
}

const sumRulePassengersLeftPassengersRight = (operator = '<=', passengersLeft = [], passengersRight = []) => {
  if (!passengersLeft.length || !passengersRight.length) return {};
  passengersLeft = passengersLeft.map((p = '') => {return {"var": p}});
  passengersRight = passengersRight.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengersLeft] }, { "+" : [ ...passengersLeft] }] };
}

const multiplyRulePassengersPassengerByValue = (operator = '<=', passengers = [], passenger= '', multiplyValue=1) => {
  if (!passengers.length  || passenger==='') return {};
  passengers = passengers.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengers ] }, { "*": [{"var": passenger}, multiplyValue]  }] };
}

const multiplyRulePassengersPassengersByValue = (operator = '<=', passengersLeft = [], passengersRight= '', multiplyValue=1) => {
  if (!passengersLeft.length || !passengersRight.length) return {};
  passengersLeft = passengersLeft.map((p = '') => {return {"var": p}});
  passengersRight = passengersRight.map((p = '') => {return {"var": p}});
  return { [operator] : [{ "+" : [ ...passengersLeft ] }, { "*": [{ "+" : [ ...passengersLeft ] }, multiplyValue]  }] };
}

export const convertRulesToJS = (rules = []) => {
  return rules.map(rule => {
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
      case SUM_PAX_VS_PAX_MULTIPLY_RULE:
        return multiplyRulePassengersPassengerByValue(rule.operator,rule.paxs, rule.pax, rule.multiplier);
      case SUM_PAX_VS_SUM_PAX_MULTIPLY_RULE:
        return multiplyRulePassengersPassengersByValue (rule.operator,rule.leftPaxs, rule.rightPaxs, rule.multiplier);
      default:
        return '';
    }
  });
}

export const convertRulesToString = (rules =[], format = RULE_DEFAULT_FORMAT) => {
  try {
    const arrrayRules = convertRulesToJS(rules);
    let result;
    switch (format) {
      case RULE_DEFAULT_FORMAT:
        result = arrrayRules
          .map(r => JSON.stringify(r))
          .join(',\n ');
        return `{\n"and":[\n ${result}\n]}`;
      case RULE_COMPACT_FORMAT:
        result = {
          and: [...arrrayRules]
        }
        return JSON.stringify(result);
    
      default:  // extended format
        result = {
          and: [...arrrayRules]
        }
        return JSON.stringify(result, undefined, 2);
    }
    
  } catch (error) {
    console.log(error);
    return "";
  }
}

