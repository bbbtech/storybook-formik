import { FormikConfig } from 'formik';

export const ADDON_ID = 'storybookjs/formik';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = 'formik';

// eventNames
export const EVT_RENDER = 'formik/render';
export const EVT_SUBMIT = 'formik/submit';
export const EVT_ON_SUBMIT = 'formik/on-submit';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ConfigWithoutExtra<Values = any> = PartialBy<
  FormikConfig<Values> & { castArgs?: boolean, initialValues?: Values },
  'onSubmit' | 'castArgs'
>;
export interface DecoratorParams<Values = any> {
  formik: ConfigWithoutExtra<Values>;
}
