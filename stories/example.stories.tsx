import React from 'react';
import { storiesOf } from '@storybook/react';
import withFormik from '../dist';
import {
  PersonalInfo,
  personalInfoInitialValues,
  personalInfoValidationSchema,
  ProfessionalInfo, professionalInfoInitialValues, professionalInfoValidationSchema,
  SignupForm
} from './example';
import {DecoratorParams} from "../src/shared";

const personalInfoParameters: DecoratorParams = {
  formik: {
    initialValues: personalInfoInitialValues,
    validationSchema: personalInfoValidationSchema,
  }
};

const professionalInfoParameters: DecoratorParams = {
  formik: {
    initialValues: professionalInfoInitialValues,
    validationSchema: professionalInfoValidationSchema,
  }
};

storiesOf('Example/decorated', module)
  .addDecorator(withFormik)
  .add('PersonalInfo', () => (
    <>
      <p>
        The decorator can wrap Components that include Fields (or anything else expecting Formik context).
        This allows us to better componentise our larger forms.
      </p>
      <PersonalInfo />
    </>
  ), personalInfoParameters)
  .add('ProfessionalInfo', () => (
    <>
      <ProfessionalInfo />
    </>
  ), professionalInfoParameters)
  .add('Override onSubmit', () => (
    <>
      <ProfessionalInfo />
    </>
  ), { formik: { onSubmit: () => console.log('log here instead if use action-logger')}});

storiesOf('Example/standard', module)
  .add('default', () => (
    <>
      <p>
        This is an entire 'Form'. It has several Fields that are descendants of an overall Formik component.
        There is no need to supply a withFormik decorator here
      </p>
      <SignupForm />
    </>
  ));
