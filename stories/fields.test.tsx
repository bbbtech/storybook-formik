import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './fields.stories';

const { myTextInput: MyTextInput } = composeStories(stories);

// And it also works for testing your components with @storybook/testing-react
describe('subforms', () => {
  test('works works', () => {
    render(<MyTextInput />);
    expect(
      screen.getByText('Describe formik in 80 characters')
    ).toBeInTheDocument();
  });
});
