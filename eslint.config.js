import ts from '@rklos/eslint-configs/typescript';

export default [
  ...ts,
  {
    files: [ 'tools/**/*.ts', '.vite/**/*.ts', 'vite.config.js' ],
    rules: {
      'no-console': 0,
      'no-underscore-dangle': 0,
      'no-restricted-syntax': 0,
      'guard-for-in': 0,
      'no-continue': 0,
      'consistent-return': 0,
      'import/no-extraneous-dependencies': 0,
    },
  },
];
