import React from 'react';
import ViewControls from './ViewControls';


export default {
  title: 'Controls/View Controls',
  component: ViewControls,
  decorators: [
    (Story) => (
      <div className="flex justify-end w-full max-w-sm shadow-md text-right py-2 px-4">
        <Story/>
      </div>
    ),
  ],
};

export const Default = (args) => <ViewControls {...args} />