module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['node_modules/*', '!.prettierrc.js', 'public'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      {
        selector: 'enumMember',
        format: ['PascalCase', 'UPPER_CASE'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal'],
      },
    ],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    camelcase: 'off',
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
