import React, { memo, useEffect, useRef, useState } from 'react';
import { SUM_PAX_VS_PAX_RULE, PAX_VS_PAX_RULE, RANGE_RULE, SIMPLE_RULE, SUM_PAX_VS_NUMBER_RULE, SUM_PAX_VS_SUM_PAX_RULE, PAX_VS_PAX_MULTIPLY_RULE, GREATER_THAN_OR_EQUAL_TO, DOUBLE_EQUAL_TO, TOTAL_RULE } from '../constants';
import { useRules } from '../context/RuleContext';
import { SumPaxVsPaxRuleForm, SumPaxVsNumberRuleForm, PaxVsPaxRuleForm, RangeRuleForm, SimpleRuleForm, SumPaxVsSumPaxRuleForm } from './forms';
import { SimpleRuleView, RangeRuleView, PaxVsPaxRuleView, SumPaxVsNumberRuleView, SumPaxVsPaxRuleView, SumPaxVsSumPaxRuleView } from './views';
import DropdownActionButtons from './presentation/DropdownActionButtons';
import { usePassengers } from '../context/PassengerContext';


const PassengerRulesList = () => {
  const {rules, setRules } = useRules();
  const { passengers, setPassengers } = usePassengers();
  const passengersUpdated = useRef(true)

  useEffect(()=>{
    if(!passengersUpdated.current) {
      setPassengers(passengers.map((passenger, index) =>({
        ...passenger,
        value: index === 0 ? 1 : 0
      })))
      passengersUpdated.current = true;
    }
  },[rules,passengers, setPassengers])
  
  const [isOpen, toggleIsOpen] = useState(false);

  const AddRule = type => {
    toggleIsOpen(!isOpen);
    passengersUpdated.current = false;
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
    passengersUpdated.current = false;
    const newData = [...rules];
    newData[index].isEditing = false;
    setRules(newData);
  }

  const editRule = (index) => {
    passengersUpdated.current = false;
    const newData = [...rules];
    newData[index].isEditing = true;
    setRules(newData);
  }

  const removeRule = (index)  => {
    passengersUpdated.current = false;
    setRules(rules.filter((f, idx) => index !== idx));
  }

  const handleChangeRuleValues = (value = '', index = '', key = '')=> {
    passengersUpdated.current = false;
    const updatedRules = [...rules]
    updatedRules[index][key] = value;
    setRules(updatedRules);
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
      <ul className="pt-6">
        {rules.length > 0 && rules.map((r, i) => {
          if(r.type === TOTAL_RULE) return null;
          return (
            <li key={i} className="flex border border-gray-200 rounded-md items-center px-4">
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
              {(r.type === PAX_VS_PAX_RULE && r.isEditing) && (
                <PaxVsPaxRuleForm
                  {...r} id={i}
                  handleChange={handleChangeRuleValues}
                  handleSave={saveRule} 
                />
              )}
              {(r.type === PAX_VS_PAX_RULE && !r.isEditing) && (
                <PaxVsPaxRuleView
                  {...r}
                  id={i}
                  handleEdit={editRule}
                  handleRemove={removeRule}
                />
              )}

              {(r.type === SUM_PAX_VS_PAX_RULE && r.isEditing) && (
                <SumPaxVsPaxRuleForm
                  {...r} id={i}
                    handleChange={handleChangeRuleValues}
                    handleSave={saveRule} 
                  />
              )}
              {(r.type === SUM_PAX_VS_PAX_RULE && !r.isEditing) && (
                <SumPaxVsPaxRuleView
                  {...r}
                  id={i}
                  handleEdit={editRule}
                  handleRemove={removeRule}
                />
                )}

              {(r.type === SUM_PAX_VS_NUMBER_RULE && r.isEditing) && (
                <SumPaxVsNumberRuleForm
                  {...r} id={i}
                  handleChange={handleChangeRuleValues}
                  handleSave={saveRule} 
                />
              )}
              {(r.type === SUM_PAX_VS_NUMBER_RULE && !r.isEditing) && (
                <SumPaxVsNumberRuleView
                  {...r}
                  id={i}
                  handleEdit={editRule}
                  handleRemove={removeRule}
                />
              )}

              {(r.type === SUM_PAX_VS_SUM_PAX_RULE && r.isEditing) && (
                <SumPaxVsSumPaxRuleForm
                  {...r} id={i}
                  handleChange={handleChangeRuleValues}
                  handleSave={saveRule} 
                />
              )}
              {(r.type === SUM_PAX_VS_SUM_PAX_RULE && !r.isEditing) && (
                <SumPaxVsSumPaxRuleView
                  {...r}
                  id={i}
                  handleEdit={editRule}
                  handleRemove={removeRule}
                />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default memo(PassengerRulesList);