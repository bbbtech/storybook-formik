import { storiesOf } from '@storybook/react';
import {
  ProfessionalInfoSubForm,
  professionalInfoInitialValues,
  professionalInfoValidationSchema,
  PersonalInfoSubForm,
  personalInfoInitialValues,
  personalInfoValidationSchema,
  feedbackInitialValues,
  FeedbackSubform,
  MyCheckbox,
  MySelect,
  MyTextInput,
  SignupForm,
} from './final-form';
import React from 'react';
import { DecoratorParams } from '../src/shared';
import { withFinalForm } from '../src';
import { makeFinalFormValidator } from './lib';

const professionalInfoParams: DecoratorParams = {
  finalForm: {
    initialValues: professionalInfoInitialValues,
    validate: makeFinalFormValidator(professionalInfoValidationSchema),
  },
};

const personalInfoParams: DecoratorParams = {
  finalForm: {
    initialValues: personalInfoInitialValues,
    validate: makeFinalFormValidator(personalInfoValidationSchema),
  },
};

const feedbackParams: DecoratorParams = {
  finalForm: {
    initialValues: feedbackInitialValues,
    validate: makeFinalFormValidator(personalInfoValidationSchema),
  },
};

storiesOf('FinalForm/subforms', module)
  .addDecorator(withFinalForm)
  .add(
    'PersonalInfoSubform',
    () => (
      <>
        <p>
          The decorator can wrap Components that include Fields (or anything
          else expecting Formik context). This allows us to better componentise
          our larger forms.
        </p>
        <PersonalInfoSubForm />
      </>
    ),
    personalInfoParams
  )
  .add(
    'ProfessionalInfoSubform',
    () => (
      <>
        <p>Here we can play with the Professional Info subform as standalone</p>
        <ProfessionalInfoSubForm />
      </>
    ),
    professionalInfoParams
  )
  .add(
    'FeedbackSubform',
    () => (
      <>
        <p>
          With better tooling it makes it easier for us to componentise and
          compose our subforms. Here we re-use the above PersonalInfoSubform in
          our FeedbackSubform.
        </p>
        <FeedbackSubform />
      </>
    ),
    feedbackParams
  );

// You may want to demonstrate a library of your custom-made fields
storiesOf('FinalForm/MyFields', module)
  .addDecorator(withFinalForm)
  .add(
    'MyCheckbox',
    () => <MyCheckbox name="likeFinalForm">Do you like Final Form?</MyCheckbox>,
    {
      finalForm: {
        initialValues: {
          likeFinalForm: true,
        },
      },
    }
  )
  .add(
    'MySelect',
    () => (
      <MySelect name="finalFormRating" label="How much do you like finalForm?">
        <option value="3">I like it</option>
        <option value="4">I really like it</option>
        <option value="5">I absolutely love it</option>
      </MySelect>
    ),
    {
      finalForm: {
        initialValues: {
          finalFormRating: '5',
        },
      },
    }
  )
  .add(
    'MyTextInput',
    () => (
      <MyTextInput
        name="finalFormTweet"
        label="Describe finalForm in 80 characters"
        placeholder="I love finalForm because..."
      />
    ),
    {
      finalForm: {
        initialValues: {
          finalFormTweet: '',
        },
      },
    }
  );

storiesOf('FinalForm/standard', module).add('default', () => (
  <>
    <p>
      This is an entire 'Form'. It has several Fields that are descendants of an
      overall Form component. There is no need to supply a withFinalForm
      decorator here
    </p>
    <SignupForm />
  </>
));
