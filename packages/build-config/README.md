# 워크스페이스 패키지 빌드 시스템

이 빌드 시스템은 tsup을 기반으로 워크스페이스 환경에서 패키지를 효율적으로 빌드하기 위한 도구입니다.

## 기능

- `package.json`의 exports 필드를 기반으로 자동 엔트리포인트 생성
- ESM 및 CommonJS 형식 동시 지원
- TypeScript 타입 정의 파일(.d.ts) 자동 생성
- 개발 모드 및 감시 모드 지원
- 소스맵 생성
- 트리 쉐이킹 최적화

## 사용 방법

### 기본 사용법

`build.js` 파일을 워크스페이스 루트에 생성하고 다음과 같이 작성합니다.

```javascript
import { run } from '@workspace/build-config';
import pkg from './package.json' assert { type: 'json' };

run({ pkg });
```

### 명령어

```bash
# 기본 빌드
node build.js

# 개발 모드 (코드 최소화 없음)
node build.js --dev

# 감시 모드 (파일 변경 감지하여 자동 재빌드)
node build.js --watch

# 개발 + 감시 모드 동시 사용
node build.js --dev --watch
```

### 커스텀 설정

추가 설정을 적용하려면 `config` 객체를 전달합니다:

```javascript
run({
  pkg,
  config: {
    // 추가 tsup 설정 옵션
    outDir: 'custom/dist',
    esbuildOptions: (options) => {
      // esbuild 설정 커스터마이징
      return options;
    },
  },
});
```

## 작동 방식

1. `package.json`의 `exports` 필드를 분석하여 엔트리포인트를 자동으로 구성합니다.
2. `exports`가 없는 경우 기본값으로 `src/index.ts`를 사용합니다.
3. 의존성 및 피어 의존성을 자동으로 외부 모듈로 처리합니다.
4. ESM 및 CommonJS 형식으로 번들을 생성합니다.
5. TypeScript 타입 정의 파일을 생성합니다.

## 예시 package.json 구성

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.mjs",
      "require": "./dist/utils/index.js"
    }
  },
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js --watch",
    "postinstall": "pnpm build"
  },
  "devDependencies": {
    "@workspace/build-config": "workspace:*"
  }
}
```

## 주의사항

- `exports` 필드의 `types` 경로는 규칙에 맞게 작성되어야 합니다 (`./dist/{경로}.d.ts`).
- 빌드 실패 시 프로세스가 종료되며 오류 메시지가 출력됩니다.
