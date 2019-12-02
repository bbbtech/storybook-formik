import React, { Fragment } from 'react';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
// import { RenderFunction } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const style = {
  heading: {
    margin: '1rem 0',
    fontSize: '3rem',
    fontWeight: 700,
  },
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ConfigWithoutSubmit<Values> = PartialBy<FormikConfig<Values>, 'onSubmit'>;

export default <Values extends FormikValues>(
  config: ConfigWithoutSubmit<Values>,
) => (storyFn: any) => (
  <Formik<Values> onSubmit={action('on-submit')} {...config}>
{(x) => {
  const { values } = x;
  return (
    <Form>
      <div
        style={{
    padding: '8px',
  }}
>
  {storyFn()}
  </div>
  <div
  style={{
    padding: '8px',
      backgroundColor: '#e2e2e2',
      borderTop: '1px solid black',
      width: '100%',
  }}
>
  <div style={style.heading}>Formik decorator</div>
  <button
  style={{
    backgroundColor: 'white',
      border: '1px solid #e4e4e4',
      borderRadius: '4px',
      padding: '8px',
  }}
  type="submit"
    >
    Submit Formik
  </button>
  <div style={style.heading}>Values</div>
  {JSON.stringify(values, null, 2)
    .split('')
    .map((x, i) =>
      x === '{' ? (
        <Fragment key={`${x}-${i}`}>
  &#123; <br />
  </Fragment>
  ) : x === '}' ? (
    <Fragment key={`${x}-${i}`}>
    <br />
    &#125;
    </Fragment>
  ) : x === ',' ? (
    <br key={`${x}-${i}`} />
  ) : (
    x
  ),
  )}
  </div>
  </Form>
);
}}
</Formik>
);
