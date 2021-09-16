import React from 'react';
import { action } from '@storybook/addon-actions';
import {SideBarItem} from '../sidebar/SideBar';

import '../../../index.css'

export default {
  title: 'Rule Builder/SidebarItem',
  component: SideBarItem,
};

const ItemTemplate = (args) => <SideBarItem {...args} />

export const SidebarItemDefault = ItemTemplate.bind({});
SidebarItemDefault.args = {
  code: 'ac',
  name: 'Air Canada',
  isSelected: false,
  onClick: action('clicked')
}

export const SideBarItemSelected = ItemTemplate.bind({});
SideBarItemSelected.args = {
  code: 'ac',
  name: 'Air Canada',
  isSelected: true,
  onClick: action('clicked')
}
