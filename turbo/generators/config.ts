/* eslint-disable import/no-default-export */
import type { PlopTypes } from '@turbo/gen';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function generator(plop: PlopTypes.NodePlopAPI) {
  plop.setActionType('postInstall', () => {
    try {
      execSync('pnpm install', { stdio: 'inherit' });

      return '✅ pnpm install 완료';
    } catch (error) {
      console.error('❌ pnpm install 실행 중 오류 발생:', error);
      return '❌ pnpm install 실행 실패';
    }
  });

  plop.setGenerator('package', {
    description: 'packages 폴더 내부에 package를 생성합니다.',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: '패키지 이름 입력 >',
        validate: (input) => {
          const kebabCaseRegex = /^[a-z]+(-[a-z]+)*$/;
          if (!kebabCaseRegex.test(input)) {
            return '패키지명은 kebab-case로 작성해주세요.';
          }

          const packagePath = path.join(process.cwd(), 'packages', input);
          if (fs.existsSync(packagePath)) {
            return '이미 존재하는 패키지 이름입니다. 다른 이름을 입력해주세요.';
          }

          return true;
        },
      },
      {
        type: 'list',
        name: 'packageType',
        message: '패키지 유형을 선택해주세요 >',
        choices: [
          { name: '일반 패키지', value: 'regular' },
          { name: 'React 패키지', value: 'react' },
        ],
        default: 'regular',
      },
    ],
    actions: (data) => {
      const actions = [];
      const { packageType } = data as { packageType: 'regular' | 'react' };

      const pathPrefix =
        packageType === 'react' ? './templates/react' : './templates';

      // 1. package.json 생성
      actions.push({
        type: 'add',
        path: 'packages/{{packageName}}/package.json',
        templateFile: `${pathPrefix}/package.json.hbs`,
      });

      // 2. tsconfig.json 생성
      actions.push({
        type: 'add',
        path: 'packages/{{packageName}}/tsconfig.json',
        templateFile: `${pathPrefix}/tsconfig.json.hbs`,
      });

      // 3. esliont.config.js 생성
      actions.push({
        type: 'add',
        path: 'packages/{{packageName}}/eslint.config.js',
        templateFile: `${pathPrefix}/eslint.config.js.hbs`,
      });

      // 4. build.js 생성
      actions.push({
        type: 'add',
        path: 'packages/{{packageName}}/build.js',
        templateFile: './templates/build.js.hbs',
      });

      // 5. src 디렉토리 및 기본 파일 생성
      actions.push({
        type: 'add',
        path: 'packages/{{packageName}}/src/index.ts',
        templateFile: './templates/src/index.ts.hbs',
      });

      // 6. package.json 이름 업데이트
      actions.push({
        type: 'modify',
        path: 'packages/{{packageName}}/package.json',
        pattern: /"name": ".*"/,
        template: '"name": "@workspace/{{packageName}}"',
      });

      // 7. pnpm install 실행
      actions.push({
        type: 'postInstall',
      });

      return actions;
    },
  });
}
