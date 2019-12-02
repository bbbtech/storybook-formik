# storybook-formik

A [Storybook](https://storybook.js.org/) decorator that will allow you to render Formik Fields/Components that are reliant on the existence of Formik context

## Install

    npm install --save-dev storybook-formik

## Usage

Suppose you split your forms into smaller, re-usable components and these 'sub-forms' rely on formik context, each of these
sub-forms may be used to build up a larger form, but we still want to test and run them independently. We can use the withFormik
decorator so that we can wrap the subform in a Formik component, which will pass down the context as normal. 

```js
import React from 'react';
import { Field } from 'formik';

const PersonalInfoSubform = () => (
  <div>
    <Field name="forename" type="input" />
    <Field name="surname" type="input" />
  </div>
);

export default PersonalInfoSubform;
```

you can add the `withFormik` decorator to your story this way:

```js
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';

import PersonalInfoSubform from '<your_component_path>/PersonalInfoSubform';

storiesOf('Example', module)
  .addDecorator(
    withFormik({
      initialValues: {
        forename: 'John',
        surname: 'Johnerson',
      },
    })
  )
  .add('default', () => <PersonalInfoSubform />);
```

## Arguments

The decorator accepts the `Formik` component props as an argument, so you can pass initialValues, validationSchema,
validateOnBlur, etc. as you please.

If you do not pass an onSubmit function then storybook-actions is used to render submission in the Action Logger. 

## Live State Updates

The decorator will track the internal formik state and render values in the storybook Formik panel.

## Typescript-ready

Like Formik, this is built in Typescript. If you want to be more strict on your stories you can use the generic syntax
as such:

```js
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';

import PersonalInfoSubform from '<your_component_path>/PersonalInfoSubform';

interface PersonalInfoSubformValues {
  forename?: string;
  surname?: string;
}

storiesOf('Example', module)
  .addDecorator(
    withFormik<PersonalInfoSubformValues>({
      initialValues: {
        forename: 'John',
        surname: 'Johnerson',
      },
    })
  )
  .add('default', () => <PersonalInfoSubform />);
```
