module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '../dist/register',
  ],
};
