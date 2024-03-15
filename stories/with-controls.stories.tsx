import { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import React, { FC } from 'react';
import withFormik from '../dist/esm';
import {
  PersonalInfo,
  personalInfoInitialValues,
  PersonalInfoSubForm,
  personalInfoValidationSchema
} from './example';

const meta: Meta = {
  decorators: [withFormik],
  title: 'WithFormik/With Controls',
  args: personalInfoInitialValues,
  parameters: {
    formik: {
      validationSchema: personalInfoValidationSchema
    }
  }
};
export default meta;

const Template: StoryFn<FC<PersonalInfo>> = args => {
  return <PersonalInfoSubForm />;
};

export const withControls = Template.bind({});
