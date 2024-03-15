import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { addons } from '@storybook/manager-api';
import { makeDecorator, useArgs } from '@storybook/preview-api';
import {
  ConfigWithoutExtra,
  EVT_ON_SUBMIT,
  EVT_RENDER,
  EVT_SUBMIT,
} from './shared';

export { DecoratorParams } from './shared';

export const withFormik = makeDecorator({
  name: 'withFormik',
  parameterName: 'formik',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    let submitter: () => void;
    channel.on(EVT_SUBMIT, () => submitter && submitter());
    const formikConfig = parameters as ConfigWithoutExtra | undefined;
    const hasArgs = Object.keys(context.argTypes).length > 0;
    let initialValues =
      (formikConfig && formikConfig.initialValues) || context.args || {};

    if (
      formikConfig &&
      formikConfig.validationSchema &&
      parameters.castValues
    ) {
      initialValues = formikConfig.validationSchema.cast(initialValues);
    }

    const [_, updateArgs] = useArgs();
    return (
      <Formik
        enableReinitialize
        onSubmit={(v, { setSubmitting }) => {
          channel.emit(EVT_ON_SUBMIT, v);
          setSubmitting(false);
        }}
        {...formikConfig}
        initialValues={initialValues}
      >
        {function FormWrap(props) {
          channel.emit(EVT_RENDER, props);
          if (!submitter) {
            submitter = props.submitForm;
          }

          useEffect(() => {
            if (!hasArgs) {
              return;
            }

            updateArgs(props.values);
          }, [hasArgs, props.values]);

          return <Form>{getStory(context)}</Form>;
        }}
      </Formik>
    );
  },
});

export default withFormik;
