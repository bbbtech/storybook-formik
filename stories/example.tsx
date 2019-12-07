import React, {CSSProperties} from 'react';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';

// example adapted from official Formik docs: https://jaredpalmer.com/formik/docs/tutorial#leveraging-react-context

export const personalInfoInitialValues = {
  firstName: 'Initial',
  lastName: '',
  email: '',
};

export const professionalInfoInitialValues = {
  jobType: '',
  acceptedTerms: false,
};

export const feedbackInitialValues = {
  ...personalInfoInitialValues,
  rating: 1,
  remarks: ''
};

const initialValues = {
  ...personalInfoInitialValues,
  ...professionalInfoInitialValues
};

export const personalInfoValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

export const professionalInfoValidationSchema = Yup.object({
  jobType: Yup.string()
    .oneOf(
      ['designer', 'development', 'product', 'other'],
      'Invalid Job Type'
    )
    .required('Required'),
  acceptedTerms: Yup.boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms and conditions.'),
});

const validationSchema = Yup.object().concat(personalInfoValidationSchema).concat(professionalInfoValidationSchema);

const onSubmit = (values: any, { setSubmitting }: any) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const style: { [key: string]: CSSProperties } = {
  label: {
    display: 'block',
    fontWeight: 'bold',
  },
  field: {
    display: 'block'
  },
  error: {
    display: 'block',
    color: '#ff4d4d',
  }
};

export const MyCheckbox = ({ children, ...props }: any) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label style={style.label} >
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div style={style.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const MySelect = (props: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label style={style.label} htmlFor={props.id || props.name}>{props.label}</label>
      <select style={style.field} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={style.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const MyTextInput = (props: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label style={style.label} htmlFor={props.id || props.name}>{props.label}</label>
      <input style={style.field} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={style.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const ProfessionalInfoSubForm = () => (
  <>
    <MySelect label="Job Type" name="jobType">
      <option value="">Select a job type</option>
      <option value="designer">Designer</option>
      <option value="development">Developer</option>
      <option value="product">Product Manager</option>
      <option value="other">Other</option>
    </MySelect>
    <MyCheckbox name="acceptedTerms">
      I accept the terms and conditions
    </MyCheckbox>
  </>
);

export const PersonalInfoSubForm = () => (
  <>
    <MyTextInput
      label="First Name"
      name="firstName"
      type="text"
      placeholder="Jane"
    />
    <MyTextInput
      label="Last Name"
      name="lastName"
      type="text"
      placeholder="Doe"
    />
    <MyTextInput
      label="Email Address"
      name="email"
      type="email"
      placeholder="jane@formik.com"
    />
  </>
);

export const FeedbackSubform = () => (
  <>
    <PersonalInfoSubForm />
    <label style={style.label} htmlFor="rating">How good?</label>
    <Field style={style.field} component="select" name="rating">
      <option value={0}>Bad</option>
      <option value={1}>Neutral</option>
      <option value={2}>Good</option>
    </Field>
    <label style={style.label} htmlFor="remarks">Why so good?</label>
    <Field style={style.field} component="textarea" name="remarks" />
  </>
);

export const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <PersonalInfoSubForm />
          <ProfessionalInfoSubForm />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};
