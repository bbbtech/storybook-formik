import React from 'react';
import { types, addons } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';

import { ADDON_ID, PANEL_ID, PARAM_KEY } from './shared';
import { FormikPanel } from './FormikPanel';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Formik',
    render: ({ active }) => (
      <AddonPanel active={!!active}>
        <FormikPanel />
      </AddonPanel>
    ),
    paramKey: PARAM_KEY,
  });
});
