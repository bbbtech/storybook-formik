import React from 'react';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

import { ADDON_ID, PANEL_ID, PARAM_KEY } from './shared';
import { FormikPanel } from './FormikPanel';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Formik',
    render: ({ active, key }) => (
      <AddonPanel active={!!active} key={key}>
        <FormikPanel />
      </AddonPanel>
    ),
    paramKey: PARAM_KEY
  });
});
