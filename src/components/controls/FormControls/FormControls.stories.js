import React from 'react';
import FormControls from './FormControls';


export default {
  title: 'Controls/Form Controls',
  component: FormControls,
  decorators: [
    (Story) => (
      <div className="flex justify-end w-full max-w-sm shadow-md text-right py-2 px-4">
        <Story/>
      </div>
    ),
  ],
};

export const Default = (args) => <FormControls {...args} />