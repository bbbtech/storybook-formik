import React from 'react';
import { storiesOf } from '@storybook/react';
import { Field } from 'formik';
import withFormik from 'storybook-formik';

storiesOf('Example', module)
  .addDecorator(
    withFormik<any>({
      initialValues: {
        firstName: 'John',
      },
    })
  )
  .add('default', () => <Field name="firstName" type="input" />);
