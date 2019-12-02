import React from 'react';
import { storiesOf } from '@storybook/react';
import { Field } from 'formik';
import withFormik from '../src';

storiesOf('Example', module)
  .addDecorator(
    withFormik({
      initialValues: {
        firstName: 'John',
      },
    })
  )
  .add('default', () => <Field name="firstName" type="input" />);
