## packages 워크스페이스 내 pacakge 추가

### 기능

- 패키지 이름의 kebab-case 형식 검증
- 이미 존재하는 패키지 이름 중복 확인
- 일반 패키지 또는 React 패키지 생성 선택 가능
- 패키지 생성 후 자동 `pnpm install` 실행
- 패키지 사용법 안내

### 사용 방법

```bash
turbo gen package
```

명령어 실행 후 다음 과정을 따라주세요:

1. 패키지 이름 입력 (kebab-case 형식)
2. 패키지 유형 선택
   - 일반 패키지: 기본 TypeScript 패키지
   - React 패키지: React 라이브러리 패키지

#### 일반 패키지 생성 예제

```bash
$ turbo gen package
? 패키지 이름 입력 > utils
? 패키지 유형을 선택해주세요 > 일반 패키지
```

#### React 패키지 생성 예제

```bash
$ turbo gen package
? 패키지 이름 입력 > ui-components
? 패키지 유형을 선택해주세요 > React 패키지
```

#### 생성 파일 구조

```
//일반 패키지

packages/your-package/
├── package.json
├── tsconfig.json
├── eslint.config.js
├── build.js
└── src/
    └── index.ts
```

```
//React 패키지

packages/your-react-package/
├── package.json (React 의존성 포함)
├── tsconfig.json
├── eslint.config.js
├── build.js
└── src/
    ├── index.ts
    └── components/
```

### 템플릿 파일

패키지 생성 도구는 다음 위치의 템플릿 파일을 사용합니다.

#### 일반 패키지 템플릿

- `./templates/package.json.hbs`: 패키지 기본 구성
- `./templates/tsconfig.json.hbs`: TypeScript 설정
- `./templates/eslint.config.js.hbs`: ESLint 설정
- `./templates/build.js.hbs`: 빌드 스크립트(공통)
- `./templates/src/index.ts.hbs`: 소스 코드 진입점 (공통)

#### React 패키지 템플릿

- `./templates/react/package.json.hbs`: React 의존성을 포함한 패키지 구성
- `./templates/react/tsconfig.json.hbs`: React 프로젝트에 맞는 TypeScript 설정
- `./templates/react/eslint.config.js.hbs`: React 프로젝트에 맞는 ESLint 설정
- `./templates/build.js.hbs`: 빌드 스크립트(공통)
- `./templates/src/index.ts.hbs`: 소스 코드 진입점 (공통)
