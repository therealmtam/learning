module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },

  extends: ['eslint:recommended', 'prettier'],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: {
      extends: './tsconfig.json',
      includes: ['gqlEslint/**/*.ts']
    },
    tsconfigRootDir: './'
  },

  plugins: ['@typescript-eslint', 'prettier'],

  rules: {
    'no-console': 'error',
    'no-unused-vars': 'error',
    'require-await': 'error',
    'customRule': 'error'
  },
  ignorePatterns: ['rules/*.js']
}
  