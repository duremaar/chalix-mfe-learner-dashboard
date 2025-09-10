const path = require('path');
const { createConfig } = require('@openedx/frontend-build');
const CopyPlugin = require('copy-webpack-plugin');

const config = createConfig('webpack-prod');

config.resolve.modules = [
  path.resolve(__dirname, './src'),
  path.resolve(__dirname, './node_modules'),
  'node_modules',
];

config.module.rules[0].test = /\.(js|jsx|ts|tsx)$/;

config.resolve.extensions.push('.tsx', '.ts');

// Add alias for footer component to help with resolution
config.resolve.alias = {
  ...config.resolve.alias,
  '@chalix/frontend-component-footer': path.resolve(__dirname, '../chalix-mfe-component-footer'),
};

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, './public/robots.txt'),
        to: path.resolve(__dirname, './dist/robots.txt'),
      },
    ],
  }),
);

module.exports = config;
