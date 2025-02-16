import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import turboPlugin from 'eslint-plugin-turbo';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    plugins: {
      turbo: turboPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: importPlugin,
      onlyWarn,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',

      // Simple Import Sort rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off',

      // Unused Import rules
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'import/no-unresolved': 'off',
      'import/no-named-default': 'error',

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TailwindCSS rules
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',

      // import 관련 규칙
      'import/no-default-export': 'error',

      // Prettier 적용
      'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    },
    settings: {},
  },
  {
    files: [
      '**/app/**/page.tsx',
      '**/app/**/layout.tsx',
      '**/app/**/loading.tsx',
      '**/app/**/error.tsx',
      '**/app/**/not-found.tsx',
      '**/app/**/default.tsx',
      '**/app/**/template.tsx',
      '**/app/**/route.tsx',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  {
    files: [
      // config 파일 패턴 매칭
      '**/*.config.mjs',
      '**/*.config.js',
      '**/*.config.ts',
      '**/vite.config.*',
      '**/jest.config.*',
      '**/webpack.config.*',
      '**/next.config.*',
      // 필요한 다른 config 파일 패턴 추가
    ],
    rules: {
      'import/no-default-export': 'off', // config 파일들에서는 default export 허용
    },
  },

  eslintConfigPrettier,
  {
    ignores: ['dist/**'],
  },
];
