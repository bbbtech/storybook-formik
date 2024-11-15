import { addons, types } from '@storybook/manager-api';
import React from 'react';

import { FormikPanel } from './FormikPanel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './shared';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Formik',
    render: ({ active }) => <FormikPanel active={active} />,
    paramKey: PARAM_KEY,
  });
});
