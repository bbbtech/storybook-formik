# storybook-formik

A [Storybook](https://storybook.js.org/) Addon and Decorator to wrap Formik Fields and track their state in a Panel.

![example screenshot](https://user-images.githubusercontent.com/12024258/70381969-9c13b400-194b-11ea-8444-582933bf30f5.png)

You can see the example stories in action [here](https://bhishp.github.io/storybook-formik/).

Thanks to [@jaredpalmer](https://jaredpalmer.com/) for giving us the amazing [formik](https://github.com/jaredpalmer/formik) library and making forms great again.

## Install

```sh
npm install --save-dev storybook-formik
```

Then register the addon in `.storybook/main.js`

```ts
module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['storybook-formik/register'],
};
```

## Usage

Suppose you split your forms into smaller, re-usable components and these 'subforms' rely on formik context, each of these
sub-forms may be used to build up a larger form, but you still want to test and run them independently. You can use the withFormik
decorator so that we can wrap the subform in a Formik component, which will pass down the context as normal.

Given a simple subform:

```tsx
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

You add the `withFormik` decorator to your stories and can pass any `Formik` props as a parameter to the individual story.

```tsx
export const personalInfoSubform = () => (
  <>
    <p>
      The decorator can wrap Components that include Fields (or anything else
      expecting Formik context). This allows us to better componentise our
      larger forms.
    </p>
    <PersonalInfoSubForm />
  </>
);
personalInfoSubform.decorators = [withFormik];
// can use the DecoratorParams type and pass a type for type-safety of initialValues
const personalInfoParams: DecoratorParams<PersonalInfo> = {
  formik: {
    initialValues: personalInfoInitialValues,
    validationSchema: personalInfoValidationSchema,
  },
};
personalInfoSubform.parameters = personalInfoParams;
```

This gives you the benefit of rendering formik Fields that are expecting formik context, but also to track the key formik state
within the storybook panel below.

See the [example stories](https://github.com/bhishp/storybook-formik/blob/master/stories/) for further examples

### Legacy story format

Example with the `storiesOf` syntax.

```tsx
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';

import PersonalInfoSubform from '<your_component_path>/PersonalInfoSubform';

storiesOf('Example', module)
  .addDecorator(withFormik)
  .add('default', () => <PersonalInfoSubform />, {
    formik: {
      initialValues: {
        forename: 'John',
        surname: 'Johnerson',
      },
    },
  });
```

## Arguments

You can pass any `Formik` component props (initialValues, validationSchema, validateOnBlur, etc) as arguments to a story.
These props must be passed under the `formik` parameter key.

If no initial values are supplied, `{}` will be used.

```tsx
export const myTextInput = () => (
  <MyTextInput
    name="formikTweet"
    label="Describe formik in 80 characters"
    placeholder="I love formik because..."
  />
);
myTextInput.parameters = {
  formik: {
    initialValues: {
      formikTweet: '',
    },
    validationSchema: someSchema,
    onSubmit: v => console.log('I want to log these... ', v),
  },
};
```

## Mature Examples

In time, I will add more mature examples that show the usefulness of the subforms pattern on a larger scale. If anyone
has any good examples then please do submit them.
