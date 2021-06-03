import React, { useState } from 'react';
import { PAX_VS_NUMBER_RULE, PAX_VS_PAX_RULE, RANGE_RULE, SIMPLE_RULE, SUM_PAX_VS_NUMBER_RULE, SUM_PAX_VS_SUM_PAX_RULE, TOTAL_RULE } from '../constants';
import { useRules } from '../context/RuleContext';
import RangeRuleForm from './form/RangeRuleForm';
import DropdownActionButtons from './presentation/DropdownActionButtons';
import RangeRuleView from './views/RangeRuleView';

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
          pax: '',
          comparison: '',
          number: 0,
          isEditing: true,
        }]);

      case RANGE_RULE:
        return setRules([...rules,{
          type: RANGE_RULE,
          pax: '',
          min: 0,
          max: 0,
          isEditing: true,
        }]);

      case PAX_VS_PAX_RULE:
        return setRules([...rules, {
          type: PAX_VS_PAX_RULE,
          leftPax: '',
          comparison: '',
          rightPax: '',
          isEditing: true,
        }]);

      case PAX_VS_NUMBER_RULE:
        return setRules([...rules, {
          type: PAX_VS_NUMBER_RULE,
          pax: '',
          comparison: '',
          number: 0,
          isEditing: true,
        }]);
      
      case SUM_PAX_VS_NUMBER_RULE:
        return setRules([...rules, {
          type: SUM_PAX_VS_NUMBER_RULE,
          paxs: [],
          comparison: '',
          number: 0,
          isEditing: true,
        }]); 

      case SUM_PAX_VS_SUM_PAX_RULE:
          return setRules([...rules, {
            type: SUM_PAX_VS_SUM_PAX_RULE,
            leftPaxs: [],
            comparison: '',
            rightPaxs: [],
            isEditing: true,
          }]); 
  
      default:
        return;
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
            label: 'Pax vs Number rule',
            action: ()=> AddRule(SUM_PAX_VS_NUMBER_RULE),
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
              { (r.type === RANGE_RULE && r.isEditing) && <RangeRuleForm />}
              { (r.type === RANGE_RULE && !r.isEditing) && (
                <RangeRuleView
                  pax={r.pax}
                  min={r.min}
                  max={r.max}
                />
              )}
              {(r.type === TOTAL_RULE) && 'total rule view'}
              {(r.type === SIMPLE_RULE && r.isEditing) && 'simple rule form'}
              {(r.type === SIMPLE_RULE && !r.isEditing) && 'simple rule view'}
              {(r.type === PAX_VS_PAX_RULE && r.isEditing) && 'pax vs pax  rule form'}
              {(r.type === PAX_VS_PAX_RULE && !r.isEditing) && 'pax vs pax  rule view'}

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