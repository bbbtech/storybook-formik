import React, {CSSProperties} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// example adapted from official Formik docs: https://jaredpalmer.com/formik/docs/tutorial#leveraging-react-context

export const personalInfoInitialValues = {
  firstName: 'Initial',
  lastName: '',
  email: '',
};

export const professionalInfoInitialValues = {
  jobType: '',
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
  textField: {
    display: 'block'
  },
  error: {
    display: 'block',
    color: '#ff4d4d',
  }
};

export const MySelect = ({children, ...props}: any) => {
  return (
    <>
      <label style={style.label} htmlFor={props.id || props.name}>{props.label}</label>
      <Field component="select" {...props}>
        {children}
      </Field>
      <div style={style.error}>
        <ErrorMessage name={props.name} />
      </div>
    </>
  );
};

export const MyTextInput = (props: any) => {
  return (
    <>
      <label style={style.label} htmlFor={props.id || props.name}>{props.label}</label>
      <Field style={style.textField} {...props}/>
      <div style={style.error}>
        <ErrorMessage name={props.name} />
      </div>
    </>
  );
};

export const ProfessionalInfo = () => (
  <>
    <MySelect label="Job Type" name="jobType">
      <option value="">Select a job type</option>
      <option value="designer">Designer</option>
      <option value="development">Developer</option>
      <option value="product">Product Manager</option>
      <option value="other">Other</option>
    </MySelect>
  </>
);

export const PersonalInfo = () => (
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
          <PersonalInfo />
          <ProfessionalInfo />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};
