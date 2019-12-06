import React, { CSSProperties } from 'react';
import { useAddonState, useChannel } from '@storybook/api';
import { FormikState } from 'formik';
import { ADDON_ID, EVT_ON_SUBMIT, EVT_RENDER, EVT_SUBMIT } from './shared';
import { STORY_RENDERED } from '@storybook/core-events';

const trafficLightStyle: CSSProperties = {
  display: 'inline-block',
  marginLeft: '4px',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
};

const booleanStateStyle: { [key: string]: CSSProperties } = {
  wrapper: {
    padding: '4px 16px',
    border: '2px solid neon',
  },
  trafficLightTrue: {
    ...trafficLightStyle,
    backgroundColor: '#13bc86',
  },
  trafficLightFalse: {
    ...trafficLightStyle,
    backgroundColor: '#ff4d4d',
  },
};

const BooleanState = ({ name, value }: { name: string; value?: boolean }) => (
  <div style={booleanStateStyle.wrapper}>
    {name}
    <span
      style={
        value === undefined
          ? {}
          : value === true
          ? booleanStateStyle.trafficLightTrue
          : booleanStateStyle.trafficLightFalse
      }
    >
      {value === undefined && '?'}
    </span>
  </div>
);

const style: { [key: string]: CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  submitButton: {},
  columns: {
    display: 'flex',
  },
  column: {
    flex: '0 1 25%',
  },
};

type Values = any;

export const FormikPanel = () => {
  const [formikState, setFormikState] = useAddonState<
    FormikState<Values> | Partial<FormikState<Values>>
  >(`${ADDON_ID}/f-state`, {});
  const [submittedValues, setSubmittedValues] = useAddonState<Values[]>(
    `${ADDON_ID}/submissions`,
    []
  );

  const emit = useChannel({
    [STORY_RENDERED]: async id => await setSubmittedValues([]),
    [EVT_RENDER]: async (state: FormikState<Values>) =>
      await setFormikState(state),
    // TODO: Two instances of channel listener, causing duplicate values to be set on state hook
    [EVT_ON_SUBMIT]: async (values: Values) =>
      await setSubmittedValues([...submittedValues, values]),
  });

  const {
    values,
    errors,
    touched,
    status,
    isValidating,
    isSubmitting,
    submitCount,
  } = formikState;

  return (
    <div style={style.container}>
      <div style={style.header}>
        <button style={style.submitButton} onClick={() => emit(EVT_SUBMIT)}>
          Submit Form
        </button>
        <BooleanState name="isValidating" value={isValidating} />
        <BooleanState name="isSubmitting" value={isSubmitting} />
        <div style={{ padding: '4px 16px' }}>
          submitCount
          <span style={{ marginLeft: '4px' }}>{submitCount}</span>
        </div>
      </div>
      <div style={style.columns}>
        <div style={style.column}>
          <h1>Values</h1>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
        <div style={style.column}>
          <h1>Errors</h1>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
        <div style={style.column}>
          <h1>Touched</h1>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
        </div>
        <div style={style.column}>
          <h1>Status</h1>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
        <div style={style.column}>
          <h1>Submissions</h1>
          <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
