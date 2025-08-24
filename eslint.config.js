// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  { ignores: ['**/*.js'] },
  {
    files: ['**/*.ts'],
    ignores: [
      '.angular/**',
      '**/swagger/**',
      '**/assets/**',
      '**/network/**',
      '**/shared/error/**',
      '**/shared/components/address-input/**',
      '**/shared/components/upload-file-button/**',
      '**/shared/components/dialogs/**',
    ],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-constant-binary-expression': 'warn',
      '@angular-eslint/no-output-on-prefix': 'warn',
      // "@angular-eslint/directive-selector": [
      //   "error",
      //   {
      //     type: "attribute",
      //     prefix: "app",
      //     style: "camelCase",
      //   },
      // ],
      // "@angular-eslint/component-selector": [
      //   "error",
      //   {
      //     type: "element",
      //     prefix: "app",
      //     style: "kebab-case",
      //   },
      // ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      // ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
);
