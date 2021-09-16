import React from 'react';
import { action } from '@storybook/addon-actions';
import DropdownActionButtons from './DropdownActionButtons';
import { DROPDOWN_ACTIONS } from '../../../constants';

export default {
  title: 'Rule Builder/Drop Down Action List',
  component: DropdownActionButtons,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story/>
      </div>
    ),
  ],
};

const Template = (args) => <DropdownActionButtons { ...args } />

export const OpenDropdownActionButtons = Template.bind({});
OpenDropdownActionButtons.args = {
  isOpen: true,
  toggleIsOpen: action('toggleIsOpen'), 
  buttonLabel: 'Add rule', 
  actions: DROPDOWN_ACTIONS.map(item =>({...item, action: action(item.action)})),
}
export const ClosedDropdownActionButtons = Template.bind({});
ClosedDropdownActionButtons.args = {
  isOpen: false,
  toggleIsOpen: action('toggleIsOpen'), 
  buttonLabel: 'Add rule', 
  actions: DROPDOWN_ACTIONS.map(item =>({...item, action: action(item.action)})),
}