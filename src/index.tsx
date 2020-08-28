import React from 'react';
import { Formik, Form } from 'formik';

import addons, { makeDecorator } from '@storybook/addons';
import {
  ConfigWithoutSubmit,
  EVT_ON_SUBMIT,
  EVT_RENDER,
  EVT_SUBMIT,
  FinalFormPropsWithoutSubmit,
} from './shared';
