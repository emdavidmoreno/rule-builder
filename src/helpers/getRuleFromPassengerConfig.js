function totalRule (total = 0, passengers = []) {
  if(!passengers.length) return null;
  const variables = passengers.map((p = {}) => `"${p.name || ''}"`).join(',');
  
  return `{"<=":[{"+":[${variables}]}, ${total}]}`
}

export const rangeRule =  ({pax = '', min = 0, max = 0}) => {
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