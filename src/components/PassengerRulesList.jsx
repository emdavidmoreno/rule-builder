import React, { useState } from 'react';
import { SUM_PAX_VS_PAX_RULE, PAX_VS_PAX_RULE, RANGE_RULE, SIMPLE_RULE, SUM_PAX_VS_NUMBER_RULE, SUM_PAX_VS_SUM_PAX_RULE, PAX_VS_PAX_MULTIPLY_RULE, GREATER_THAN_OR_EQUAL_TO, DOUBLE_EQUAL_TO } from '../constants';
import { useRules } from '../context/RuleContext';
import RangeRuleForm from './form/RangeRuleForm';
import SimpleRuleForm from './form/SimpleRuleForm';
import DropdownActionButtons from './presentation/DropdownActionButtons';
import RangeRuleView from './views/RangeRuleView';
import SimpleRuleView from './views/SimpleRuleView';


const PassengerRulesList = () => {
  const {
    rules = [],
    setRules,
  } = useRules();
  
  const [isOpen, toggleIsOpen] = useState(false);

  const AddRule = type => {
    toggleIsOpen(!isOpen);
    switch (type) {
      case SIMPLE_RULE:
        return setRules([...rules,{
          type: SIMPLE_RULE,
          pax: 'age1',
          operator: GREATER_THAN_OR_EQUAL_TO,
          number: 0,
          isEditing: true,
        }]);

      case RANGE_RULE:
        return setRules([...rules,{
          type: RANGE_RULE,
          pax: 'age1',
          min: 0,
          max: 0,
          isEditing: true,
        }]);

      case PAX_VS_PAX_RULE:
        return setRules([...rules, {
          type: PAX_VS_PAX_RULE,
          leftPax: 'age1',
          operator: DOUBLE_EQUAL_TO,
          rightPax: 'age1',
          isEditing: true,
        }]);

      case PAX_VS_PAX_MULTIPLY_RULE:
        return setRules([...rules, {
          type: PAX_VS_PAX_MULTIPLY_RULE,
          leftPax: 'age1',
          operator: DOUBLE_EQUAL_TO,
          rightPax: 'age1',
          multiplier: 1,
          isEditing: true,
        }]);

      case SUM_PAX_VS_PAX_RULE:
        return setRules([...rules, {
          type: SUM_PAX_VS_PAX_RULE,
          paxs: ['age1'],
          operator: DOUBLE_EQUAL_TO,
          pax: 'age1',
          isEditing: true,
        }]);
      
      case SUM_PAX_VS_NUMBER_RULE:
        return setRules([...rules, {
          type: SUM_PAX_VS_NUMBER_RULE,
          paxs: ['age1'],
          operator: DOUBLE_EQUAL_TO,
          number: 0,
          isEditing: true,
        }]); 

      case SUM_PAX_VS_SUM_PAX_RULE:
          return setRules([...rules, {
            type: SUM_PAX_VS_SUM_PAX_RULE,
            leftPaxs: ['age1'],
            comparison: DOUBLE_EQUAL_TO,
            rightPaxs: ['age1'],
            isEditing: true,
          }]); 
  
      default:
        return;
    }
  }

  const saveRule = (index) => {
    const newData = [...rules];
    newData[index].isEditing = false;
    setRules(newData);
  }

  const editRule = (index) => {
    const newData = [...rules];
    newData[index].isEditing = true;
    setRules(newData);
  }

  const removeRule = (index)  => {
    setRules(rules.filter((f, idx) => index !== idx));
  }

  const handleChangeRuleValues = (event)=> {
    event.preventDefault();
    const {id, name, value} = event.target;
    if(['pax', 'min', 'max', 'operator', 'number'].includes(name)) {
      const updatedRules = [...rules]
      updatedRules[id][name] = value;
      setRules(updatedRules);
    }
  }

  return (
    <div>
      <DropdownActionButtons
        buttonLabel={'Add rule'}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        actions={[
          {
            label: 'Simple rule',
            action: ()=> AddRule(SIMPLE_RULE),
          },
          {
            label: 'Range rule',
            action: ()=> AddRule(RANGE_RULE),
          },
          {
            label: 'Pax vs Pax rule',
            action: ()=> AddRule(PAX_VS_PAX_RULE),
          },
          {
            label: 'Sum Pax vs pax rule',
            action: ()=> AddRule(SUM_PAX_VS_PAX_RULE),
          },
          {
            label: 'Sum Pax vs Number rule',
            action: ()=> AddRule(SUM_PAX_VS_NUMBER_RULE),
          },
          {
            label: 'Sum Pax vs Sum Pax rule',
            action: ()=> AddRule(SUM_PAX_VS_SUM_PAX_RULE),
          },
        ]}
      />
      <ul>
        {rules.length > 0 && rules.map((r, i) => {
          return (
            <li key={i}>
              {(r.type === SIMPLE_RULE && r.isEditing) && (
                <SimpleRuleForm
                  {...r} 
                  id={i}
                  handleChange={handleChangeRuleValues}
                  handleSave={saveRule} 
                />
              )}
              {(r.type === SIMPLE_RULE && !r.isEditing) && (
                <SimpleRuleView
                  {...r}
                  id={i}
                  handleEdit={editRule}
                  handleRemove={removeRule}
                />
              )}
              { (r.type === RANGE_RULE && r.isEditing) && (
              <RangeRuleForm 
                {...r} id={i}
                handleChange={handleChangeRuleValues}
                handleSave={saveRule} 
              />
              )}
              { (r.type === RANGE_RULE && !r.isEditing) && (
                <RangeRuleView
                  {...r}
                  id={i}
                  handleEdit={editRule}
                  handleRemove={removeRule}
                />
              )}
              {(r.type === PAX_VS_PAX_RULE && r.isEditing) && 'pax vs pax  rule form'}
              {(r.type === PAX_VS_PAX_RULE && !r.isEditing) && 'pax vs pax  rule view'}

              {(r.type === SUM_PAX_VS_PAX_RULE && r.isEditing) && 'sum pax vs pax  rule form'}
              {(r.type === SUM_PAX_VS_PAX_RULE && !r.isEditing) && 'sum pax vs pax  rule view'}

              {(r.type === SUM_PAX_VS_NUMBER_RULE && r.isEditing) && 'sum pax vs number  rule form'}
              {(r.type === SUM_PAX_VS_NUMBER_RULE && !r.isEditing) && 'sum pax vs number  rule view'}

              {(r.type === SUM_PAX_VS_SUM_PAX_RULE && r.isEditing) && 'sum pax vs sum pax rule form'}
              {(r.type === SUM_PAX_VS_SUM_PAX_RULE && !r.isEditing) && 'sum pax vs sum pax rule view'}
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default PassengerRulesList;