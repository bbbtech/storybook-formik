import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as stories from './fields.stories';

const { myTextInput: MyTextInput } = composeStories(stories);

describe('subforms', () => {
  // Stories are reused and the tests become simpler thanks to https://github.com/storybookjs/testing-react
  test('renders correctly from the story using Formik decorator', () => {
    render(<MyTextInput />);
    expect(
      screen.getByText('Describe formik in 80 characters')
    ).toBeInTheDocument();
  });
});
