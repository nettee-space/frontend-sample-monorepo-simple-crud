import { config } from '@workspace/eslint-config/base';
import tseslint from 'typescript-eslint';

export default [
  {
    // 패키지 매니저 루트의 불필요한 파일들만 무시
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.turbo/**',
    ],
  },
  ...config,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
  },
];
