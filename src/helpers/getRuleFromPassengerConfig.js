import { SUM_PAX_VS_PAX_RULE, PAX_VS_PAX_RULE, RANGE_RULE, SIMPLE_RULE, SUM_PAX_VS_NUMBER_RULE, SUM_PAX_VS_SUM_PAX_RULE, TOTAL_RULE } from "../constants";

function totalRule (total = 0, passengers = []) {
  if(!passengers.length) return null;
  const variables = passengers.map((pax = {}) => `{"var": "${pax || ''}"}`).join(',');
  
  return `{"<=":[{"+":[${variables}]}, ${total}]}`
}

export const rangeRule = (pax = '', min = 0, max = 0) => {
  return `{"and": [{">=":[{"var": "${pax}"}, ${min}]}, {"<=":["var": "${pax}", ${max}]}]}`;
}


export default function rulesSTR (total = 0, passengers = []) {
  return (
`{
"and":[
  ${totalRule(total, passengers)},
  ${passengers.map((p = {}) => rangeRule(p)).join(',\n')}
]}`
  )
}

export const convertRulesToString = (rules =[]) => {
  const stringRules = rules.map(rule => {
    switch (rule.type) {
      case TOTAL_RULE:
        return totalRule(rule.total, rule.paxs);
      case RANGE_RULE:
        return rangeRule(rule.pax, rule.min, rule.max);
      case SIMPLE_RULE:
        return 'simple rule string';
      case PAX_VS_PAX_RULE:
        return 'pax vs pax rule'
      case SUM_PAX_VS_NUMBER_RULE:
        return 'sum pax vs pax rule'
      case SUM_PAX_VS_SUM_PAX_RULE:
        return 'sum pax vs sum pax rule'
      case SUM_PAX_VS_PAX_RULE:
        return 'sum pax vs pax rule';
      default:
        return '';
    }
  })
  .join(',\n');
  return `{
"and":[
  ${stringRules}
]}`
}