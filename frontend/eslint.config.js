const { configs: eslintConfigs } = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tseslintParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  eslintConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...tseslint.configs['eslint-recommended'].rules,
      ...tseslint.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off', // TypeScript's compiler already checks this
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': 'React|JSX' }],
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['**/*.{test.ts,test.tsx}'],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        React: 'writable',
        JSX: 'writable',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLSpanElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        HTMLHeadingElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLImageElement: 'readonly',
        HTMLLabelElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        SVGSVGElement: 'readonly',
        console: 'readonly',
        window: 'readonly',
        alert: 'readonly',
        document: 'readonly',
        className: 'readonly',
      },
    },
  },
];

console.log('ESLint configuration is being loaded');
