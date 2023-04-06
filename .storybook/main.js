module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '../dist/esm/register'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
};
