module.exports = {
  plugins: ['import'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
};
