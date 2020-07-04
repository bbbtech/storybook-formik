import React, { CSSProperties, useState } from 'react';
import { FormikState } from 'formik';
import { FormState } from 'final-form';
import JSONTree from 'react-json-tree';
import { useChannel } from '@storybook/api';
import { STORY_RENDERED } from '@storybook/core-events';

import { EVT_ON_SUBMIT, EVT_RENDER, EVT_SUBMIT } from './shared';
import { BooleanState } from './components/BooleanState';

const style: { [key: string]: CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: '32px',
    alignItems: 'center',
    boxShadow: 'rgba(0,0,0,.1) 0 -1px 0 0',
  },
  submitButton: {
    height: '100%',
  },
  columns: {
    display: 'flex',
    height: '100%',
  },
  column: {
    flex: '1 1 25%',
    height: '100%',
    boxShadow: 'rgba(0,0,0,.1) 0 0 8px 0 inset',
  },
  columnHeading: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
};

// because JSONTree styling is limited
const classRoot = 'formik-';
const stateContainerClass = `${classRoot}stateContainer`;
const injectCss = `.${stateContainerClass} > ul {
    height: 100% !important;
    margin: 0 !important;
    overflow-y: scroll !important;
  }`;

const eightiesTheme = {
  scheme: 'eighties',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2d2d2d',
  base01: '#393939',
  base02: '#515151',
  base03: '#747369',
  base04: '#a09f93',
  base05: '#d3d0c8',
  base06: '#e8e6df',
  base07: '#f2f0ec',
  base08: '#f2777a',
  base09: '#f99157',
  base0A: '#ffcc66',
  base0B: '#99cc99',
  base0C: '#66cccc',
  base0D: '#6699cc',
  base0E: '#cc99cc',
  base0F: '#d27b53',
};

type Values = any;

const useFinalFormPanel = () => {
  const [formState, setFormState] = useState<Partial<FormState<Values>>>({});
  const [submitCount, setSubmitCount] = useState(0);

  // TODO: Wrap in useEffect?
  const emit = useChannel({
    [EVT_RENDER]: async (state: FormState<Values>) => await setFormState(state),
    // TODO: Two instances of channel listener, causing duplicate values to be set on state hook
    [EVT_ON_SUBMIT]: async (values: Values) =>
      await setSubmitCount(submitCount + 1),
  });

  const { values, errors, touched, validating, submitting } = formState;

  return {
    emit,
    values,
    errors,
    touched,
    // status,
    isValidating: validating,
    isSubmitting: submitting,
    submitCount,
  };
};

const useFormikPanel = () => {
  const [formikState, setFormikState] = useState<Partial<FormikState<Values>>>(
    {}
  );
  const [submittedValues, setSubmittedValues] = useState<Values[]>([]);

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
    // status,
    isValidating,
    isSubmitting,
    submitCount,
  } = formikState;

  return {
    emit,
    values,
    errors,
    touched,
    // status,
    isValidating,
    isSubmitting,
    submitCount,
  };
};

export const FormikPanel = () => {
  // const {
  //   emit,
  //   values,
  //   errors,
  //   touched,
  //   // status,
  //   isValidating,
  //   isSubmitting,
  //   submitCount,
  // } = useFormikPanel();

  const {
    emit,
    values,
    errors,
    touched,
    // status,
    isValidating,
    isSubmitting,
    submitCount,
  } = useFinalFormPanel();

  // console.log(touched);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: injectCss }} />
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
          <div className={stateContainerClass} style={style.column}>
            <h1 style={style.columnHeading}>Values</h1>
            <JSONTree data={values || {}} hideRoot />
          </div>
          <div className={stateContainerClass} style={style.column}>
            <h1 style={style.columnHeading}>Touched</h1>
            <JSONTree data={touched || {}} hideRoot theme={eightiesTheme} />
          </div>
          <div className={stateContainerClass} style={style.column}>
            <h1 style={style.columnHeading}>Errors</h1>
            <JSONTree data={errors || {}} hideRoot />
          </div>
          {/*
          <div className={stateContainerClass} style={{...style.column}}>
            <h1>Submissions</h1>
            <JSONTree data={submittedValues} hideRoot />
          </div>
          */}
        </div>
      </div>
    </>
  );
};
