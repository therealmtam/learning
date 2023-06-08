module.exports = {
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
    'useGetPayments': 'error'
  },

  
  ignorePatterns: ['rules/*.js', '.eslintrc.js'],

  overrides: [
    {
      files: ['*.graphql', '*.gql'],
      plugins: ['@graphql-eslint'],
      parser: '@graphql-eslint/eslint-plugin',
      rules: {
        'gqlRule': 'error',
        '@graphql-eslint/require-description': ['error', { FieldDefinition: true }],
      },
    },
  ]
}
  