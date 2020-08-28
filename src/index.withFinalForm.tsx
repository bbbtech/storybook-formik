import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import {
  EVT_ON_SUBMIT,
  EVT_RENDER,
  EVT_SUBMIT,
  FinalFormPropsWithoutSubmit,
} from './shared';
import { Form as FinalForm } from 'react-final-form';

export const withFinalForm = makeDecorator({
  name: 'withFinalForm',
  parameterName: 'finalForm',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    let submitter: () => void;
    channel.on(EVT_SUBMIT, () => submitter && submitter());
    const formProps = parameters as FinalFormPropsWithoutSubmit | undefined;
    const initialValues = (formProps && formProps.initialValues) || {};

    return (
      <FinalForm
        onSubmit={v => {
          channel.emit(EVT_ON_SUBMIT, v);
          return {};
        }}
        {...formProps}
        initialValues={initialValues}
      >
        {props => {
          channel.emit(EVT_RENDER, props);
          if (!submitter) {
            submitter = props.handleSubmit;
          }
          return <form>{getStory(context)}</form>;
        }}
      </FinalForm>
    );
  },
});
