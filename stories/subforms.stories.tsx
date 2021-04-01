import { Meta } from '@storybook/react';
import React from 'react';
import withFormik from '../dist';
import {
  PersonalInfoSubForm,
  personalInfoInitialValues,
  personalInfoValidationSchema,
  ProfessionalInfoSubForm,
  professionalInfoInitialValues,
  professionalInfoValidationSchema,
  FeedbackSubform,
  feedbackInitialValues, PersonalInfo, ProfessionalInfo, Feedback,
} from './example';
import { DecoratorParams } from '../src/shared';

const meta: Meta = {
  title: 'WithFormik/Subforms'
}
export default meta;

export const personalInfoSubform = () => (
  <>
    <p>
      The decorator can wrap Components that include Fields (or anything else expecting Formik context).
      This allows us to better componentise our larger forms.
    </p>
    <PersonalInfoSubForm />
  </>
);
personalInfoSubform.decorators = [withFormik];
const personalInfoParams: DecoratorParams<PersonalInfo> = {
  formik: {
    initialValues: personalInfoInitialValues,
    validationSchema: personalInfoValidationSchema,
  }
};
personalInfoSubform.parameters = personalInfoParams;

export const professionalInfoSubform = () => (
  <>
    <p>
      Here we can play with the Professional Info subform as standalone
    </p>
    <ProfessionalInfoSubForm />
  </>
);
const professionalInfoParams: DecoratorParams<ProfessionalInfo> = {
  formik: {
    initialValues: professionalInfoInitialValues,
    validationSchema: professionalInfoValidationSchema,
  }
};
professionalInfoSubform.story = {
  decorators: [withFormik],
  parameters: professionalInfoParams
};

export const feedbackSubform = () => (
  <>
    <p>
      With better tooling it makes it easier for us to componentise and compose our subforms.
      Here we re-use the above PersonalInfoSubform in our FeedbackSubform.
    </p>
    <FeedbackSubform />
  </>
);
const feedbackParams: DecoratorParams<Feedback> = {
  formik: {
    initialValues: feedbackInitialValues,
    validationSchema: personalInfoValidationSchema,
  }
};
feedbackSubform.story = {
  decorators: [withFormik],
  parameters: feedbackParams
};
