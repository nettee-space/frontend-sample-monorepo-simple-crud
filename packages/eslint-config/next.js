import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,

  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
    plugins: {
      '@next/next': pluginNext,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      // Next.js recommended and core-web-vitals rules
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  eslintConfigPrettier,
];
