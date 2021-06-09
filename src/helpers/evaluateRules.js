import jsonLogic from 'json-logic-js';
import { convertRulesToJS } from './getRuleFromPassenger';

export const evaluateRules = (rules = [], travelers = []) => {
  const data = {};
  travelers.map(traveler => data[traveler.key] = traveler.value) 
  const rulesObject = {
    and: [...convertRulesToJS(rules)]
  }
  return jsonLogic.apply(rulesObject, data);
};