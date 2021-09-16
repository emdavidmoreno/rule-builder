import React from 'react';
import {SideBarItem, SideBarList} from '../sidebar/SideBar';

import '../../../index.css'

export default {
  title: 'Rule Builder/Sidebar',
  component: SideBarList,
  subcomponents: { SideBarItem },
};

const ItemTemplate = (args) => <SideBarItem {...args} />

export const SidebarItemDefault = ItemTemplate.bind({});
SidebarItemDefault.args = {
  code: 'ac',
  name: 'Air Canada',
  isSelected: false,
  onClick: () => {}
}

export const SideBarItemSelected = ItemTemplate.bind({});
SideBarItemSelected.args = {
  code: 'ac',
  name: 'Air Canada',
  isSelected: true,
  onClick: () => {}
}

const SideBarTemplate = (args) => <SideBarList {...args} />

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
      onClick: () => {}
    },
    {
      code: 'oa',
      name: 'Olympic Air',
      isSelected: false,
      onClick: () => {}
    },
    {
      code: 'fz',
      name: 'Fly Dubai',
      isSelected: false,
      onClick: () => {}
    },
  ], 
  selectedTenant: {code: 'oa'},
  setSelectecTenant: () => {},
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
      onClick: () => {}
    },
    {
      code: 'oa',
      name: 'Olympic Air',
      isSelected: false,
      onClick: () => {}
    },
    {
      code: 'fz',
      name: 'Fly Dubai',
      isSelected: false,
      onClick: () => {}
    },
  ], 
  selectedTenant: {code: 'oa'},
  setSelectecTenant: () => {},
  loading: false,
  show: false,
}