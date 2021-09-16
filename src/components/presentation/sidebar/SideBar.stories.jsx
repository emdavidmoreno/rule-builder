import React from 'react';
import { action } from '@storybook/addon-actions';
import {SideBarList as SideBar} from '../sidebar/SideBar';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../../../index.css'

export default {
  title: 'Rule Builder/Sidebar',
  component: SideBar,
};

const SideBarTemplate = (args) => <SideBar {...args} />

export const LoadingSideBar = SideBarTemplate.bind({});
LoadingSideBar.args = {
  tenants: [], 
  loading: true,
  show: true,
}

export const LoadedSideBarDesktop = SideBarTemplate.bind({});
LoadedSideBarDesktop.args = {
  tenants: [
    {
      code: 'ac',
      name: 'Air Canada',
      isSelected: false,
      onClick:  action('clicked')
    },
    {
      code: 'oa',
      name: 'Olympic Air',
      isSelected: false,
      onClick: action('clicked')
    },
    {
      code: 'fz',
      name: 'Fly Dubai',
      isSelected: false,
      onClick: action('clicked')
    },
  ], 
  selectedTenant: {code: 'oa'},
  setSelectecTenant: action('clicked'),
  loading: false,
  show: true,
}

export const LoadedSideBarMobileHidden = SideBarTemplate.bind({});
LoadedSideBarMobileHidden.args = {
  tenants: [
    {
      code: 'ac',
      name: 'Air Canada',
      isSelected: false,
      onClick: action('clicked')
    },
    {
      code: 'oa',
      name: 'Olympic Air',
      isSelected: false,
      onClick: action('clicked')
    },
    {
      code: 'fz',
      name: 'Fly Dubai',
      isSelected: false,
      onClick: action('clicked')
    },
  ], 
  selectedTenant: {code: 'oa'},
  setSelectecTenant: action('clicked'),
  loading: false,
  show: false,
};

LoadedSideBarMobileHidden.parameters = {
  viewport: {
    defaultViewport: 'iphonex'
  },
}