import { Meta } from '@storybook/react';
import React from 'react';
import withFormik from '../dist';
import {
  MyCheckbox,
  MySelect,
  MyTextInput,
} from './example';

const meta: Meta = {
  decorators: [withFormik],
  title: 'WithFormik/Fields'
}
export default meta;

// You may want to demonstrate a library of your custom-made fields

export const myCheckbox = () => (
  <MyCheckbox name="likeFormik">Do you like formik?</MyCheckbox>
);
myCheckbox.parameters = {
  formik: {
    initialValues: {
      likeFormik: true,
    }
  }
};

export const mySelect = () => (
  <MySelect name="formikRating" label="How much do you like formik?" >
    <option value="3">I like it</option>
    <option value="4">I really like it</option>
    <option value="5">I absolutely love it</option>
  </MySelect>
);
mySelect.parameters = {
  formik: {
    initialValues: {
      formikRating: "5",
    }
  }
};

export const myTextInput = () => (
  <MyTextInput name="formikTweet" label="Describe formik in 80 characters" placeholder="I love formik because..." />
);
myTextInput.parameters = {
  formik: {
    initialValues: {
      formikTweet: '',
    }
  }
};
