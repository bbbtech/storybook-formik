import { Schema, ValidationError } from 'yup';
import { setIn, ValidationErrors } from 'final-form';

type FinalFormValidator = (
  values: any
) => ValidationErrors | Promise<ValidationErrors> | undefined;

export const makeFinalFormValidator = (
  schema: Schema<any>
): FinalFormValidator => (values: any) => {
  try {
    schema.validateSync(values, {
      abortEarly: false,
    });
    return;
  } catch (exc) {
    return (exc as ValidationError).inner.reduce(
      (errors: any, e: any) => setIn(errors, e.path, e.message),
      {}
    );
  }
};
