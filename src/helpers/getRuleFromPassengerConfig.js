function totalRule (total = 0, passengers = []) {
  if(!passengers.length) return null;
  const variables = passengers.map((p = {}) => `"${p.name || ''}"`).join(',');
  
  return `{"<=":[{"+":[${variables}]}, ${total}]}`
}

function simpleRule ({pax = '', min = 0, max = 0}) {
  return `{"and": [{">=":["${pax}", ${min}]}, {"<=":["${pax}", ${max}]}]}`;
}

export default function rulesSTR (total = 0, passengers = []) {
  return (
`{
"and":[
  ${totalRule(total, passengers)},
  ${passengers.map((p = {}) => simpleRule(p)).join(',\n')}
]}`
  )
}