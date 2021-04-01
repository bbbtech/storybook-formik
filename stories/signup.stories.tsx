import { Meta } from '@storybook/react';
import React from 'react';
import {
  SignupForm,
} from './example';

const meta: Meta = {
  title: 'WithFormik/Signup'
}
export default meta;

export const signup = () => (
  <>
    <p>
      This is an entire 'Form'. It has several Fields that are descendants of an overall Formik component.
      There is no need to supply a withFormik decorator here
    </p>
    <SignupForm />
  </>
);
