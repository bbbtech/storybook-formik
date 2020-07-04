import { FormikConfig } from 'formik';
import { FormProps } from 'react-final-form';

export const ADDON_ID = 'storybookjs/formik';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = 'formik';

// eventNames
export const EVT_RENDER = 'formik/render';
export const EVT_SUBMIT = 'formik/submit';
export const EVT_ON_SUBMIT = 'formik/on-submit';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ConfigWithoutSubmit<Values = any> = PartialBy<
  FormikConfig<Values>,
  'onSubmit'
>;
export type FinalFormPropsWithoutSubmit<Values = any> = PartialBy<
  FormProps<Values>,
  'onSubmit'
>;
export interface DecoratorParams<Values = any> {
  formik?: ConfigWithoutSubmit<Values>;
  finalForm?: FinalFormPropsWithoutSubmit<Values>;
}
