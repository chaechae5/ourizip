# AGENTS.md

이 문서는 `apps/mobile`을 루트로 작업하는 모바일 앱 개발 가이드입니다.
모바일 앱 관련 작업은 이 디렉토리를 기준으로 실행하고, 백엔드 코드는 `../api` 아래에서 관리합니다.

## 프로젝트 목적

부동산 임장(현장 방문 조사)을 지도 기반으로 디지털화하는 모바일·웹 서비스.
핀과 코멘트로 현장 기록을 남기고, 청약·분양·시세·출근지 이동시간을 한 화면에서 확인합니다.

## 기술 스택

- Runtime: Expo SDK 54
- Framework: React Native 0.81, React 19
- Routing: Expo Router 6
- Language: TypeScript 5, strict mode
- Navigation: React Navigation
- UI/UX: React Native, Expo Image, Expo Symbols, Expo Haptics
- Web: React Native Web
- Lint/Format: ESLint 9, eslint-config-expo, Prettier
- Package manager: npm

## 기본 명령어

```bash
npm install
npm run start
npm run ios
npm run android
npm run web
npm run lint
```

명령어는 항상 `apps/mobile`에서 실행합니다.

## 프로젝트 구조

라우팅은 Expo Router의 `app/` 디렉토리가 담당하고, 실제 기능 구현은 `features/` 아래에 feature 단위로 둡니다.

```text
apps/mobile/
├── app/                  # Expo Router route entry
├── assets/               # images, fonts, static assets
├── components/           # 여러 feature에서 공유하는 UI
├── constants/            # 앱 전역 상수
├── hooks/                # 앱 전역 공용 hook
├── features/             # 기능 단위 모듈
├── package.json
├── tsconfig.json
└── app.json
```

Feature는 다음 구조를 기본으로 사용합니다.

```text
features/imjang/
├── ui/
│   ├── screens/
│   │   └── ImjangScreen.tsx
│   ├── components/
│   │   └── ImjangCard.tsx
│   └── hooks/
│       └── useImjangListView.ts
├── domain/
│   ├── entities.ts
│   ├── rules.ts
│   └── repository.ts
├── data/
│   ├── api.ts
│   ├── dto.ts
│   ├── mapper.ts
│   ├── queries.ts
│   └── mutations.ts
└── model/
    ├── store.ts
    └── types.ts
```

## 레이어 책임

### `ui/`

- 화면, 화면 전용 hook, 화면 내부 컴포넌트를 둡니다.
- API 호출, DTO 변환, 비즈니스 규칙을 직접 작성하지 않습니다.
- `screens/`는 route에서 바로 연결되는 화면 단위 컴포넌트입니다.
- `components/`는 해당 feature 안에서만 사용하는 presentational component입니다.
- `hooks/`는 화면 상태 조합, 이벤트 핸들러 조립, view model 생성을 담당합니다.

### `domain/`

- 앱의 핵심 개념과 규칙을 둡니다.
- `entities.ts`: 도메인 엔티티와 값 객체 타입
- `rules.ts`: 순수 비즈니스 규칙, 검증, 계산 로직
- `repository.ts`: 데이터 접근 인터페이스
- React, Expo, 네트워크 구현 세부사항에 의존하지 않습니다.

### `data/`

- 외부 API, 서버 DTO, 캐싱 query, mutation, mapper를 둡니다.
- `api.ts`: HTTP 요청 함수
- `dto.ts`: 서버 요청/응답 타입
- `mapper.ts`: DTO와 domain entity 사이 변환
- `queries.ts`: 조회성 서버 상태
- `mutations.ts`: 생성/수정/삭제성 서버 상태
- DTO를 `ui/`로 직접 넘기지 않고, domain 타입으로 변환해서 사용합니다.

### `model/`

- feature 내부 상태와 화면에 가까운 타입을 둡니다.
- `store.ts`: 클라이언트 상태, reducer, store 정의
- `types.ts`: feature 내부에서 공유하는 UI/model 타입
- 서버 응답 원본 타입은 `data/dto.ts`에만 둡니다.

## Import 규칙

- `ui`는 `model`, `domain`, `data`를 사용할 수 있습니다.
- `data`는 `domain`을 사용할 수 있습니다.
- `domain`은 다른 레이어에 의존하지 않습니다.
- 다른 feature 내부 파일을 직접 import하지 않습니다. 공유가 필요하면 `components/`, `hooks/`, `constants/` 또는 별도 shared 영역으로 승격합니다.
- path alias `@/*`는 `apps/mobile` 루트를 기준으로 사용합니다.

예시:

```ts
import { ImjangScreen } from '@/features/imjang/ui/screens/ImjangScreen';
```

## 라우팅 규칙

- `app/`에는 route wiring만 둡니다.
- 복잡한 화면 구현은 `features/*/ui/screens`로 이동합니다.
- route 파일은 가능하면 feature screen을 import해서 export하는 얇은 파일로 유지합니다.

예시:

```tsx
export { ImjangScreen as default } from '@/features/imjang/ui/screens/ImjangScreen';
```

## 상태 관리 기준

- 화면 내부에서만 쓰는 간단한 상태는 `useState`, `useReducer`를 사용합니다.
- 여러 컴포넌트가 공유하는 feature 상태는 `features/*/model/store.ts`로 분리합니다.
- 서버 상태는 `data/queries.ts`, `data/mutations.ts`에 모읍니다.
- 서버 DTO와 화면 상태 타입을 섞지 않습니다.

## API 연동 기준

- API endpoint, request, response DTO는 `data/`에 둡니다.
- 화면 컴포넌트에서 `fetch`나 API client를 직접 호출하지 않습니다.
- 서버 응답은 `mapper.ts`에서 domain entity로 변환합니다.
- API 변경이 있으면 백엔드 스펙 문서 또는 협의 내용을 함께 확인합니다.
- 외부 API 키는 모바일 앱에 직접 넣지 않습니다. Kakao, 공공데이터 등 외부 API 호출은 백엔드를 경유합니다.
- API 계약이 확정되지 않은 경우 mock 데이터와 임시 타입에 `TODO(api-contract)`를 남기고, PR 설명에 백엔드 협의 필요 여부를 적습니다.
- HTTP status, error code, nullable field의 의미는 백엔드와 합의된 스펙을 기준으로 처리합니다.
- 날짜, 시간, 좌표, 금액, 면적 단위는 DTO 단계에서 명확히 이름으로 드러냅니다.

## 환경 변수와 설정

- 로컬 환경값은 `.env.local`처럼 git에 올라가지 않는 파일에 둡니다.
- 커밋 가능한 예시는 `.env.example`에만 작성합니다.
- Expo public config에 들어가는 값은 사용자가 앱 번들에서 볼 수 있다고 가정합니다.
- API base URL, feature flag, analytics key 등 환경별로 달라지는 값은 하드코딩하지 않습니다.
- 민감한 키, 서버 secret, 외부 API secret은 모바일 저장소에 두지 않습니다.

## 에러와 사용자 상태

- 네트워크 실패, 권한 거부, 빈 목록, 서버 오류, 위치 권한 미허용 상태를 구분해서 다룹니다.
- 사용자가 다시 시도할 수 있는 오류에는 retry 동선을 제공합니다.
- 개발자 디버깅용 메시지와 사용자에게 노출되는 메시지를 분리합니다.
- 로딩 상태는 화면 전체 로딩과 부분 로딩을 구분합니다.
- 낙관적 업데이트를 사용할 때는 실패 시 롤백 동작을 함께 설계합니다.

## 네이밍 규칙

- Screen: `ImjangScreen.tsx`
- Component: `ImjangCard.tsx`
- Hook: `useImjangListView.ts`
- Entity type: `Imjang`, `ImjangId`
- DTO type: `ImjangResponseDto`, `CreateImjangRequestDto`
- Mapper: `toImjang`, `toImjangDto`
- Query hook: `useImjangListQuery`
- Mutation hook: `useCreateImjangMutation`

## 컴포넌트 작성 기준

- 컴포넌트는 작게 유지하고, 데이터 가공은 hook이나 mapper로 뺍니다.
- 재사용 컴포넌트는 props를 명확히 하고 domain/entity 전체를 무작정 받지 않습니다.
- 접근성 label, loading, empty, error 상태를 함께 고려합니다.
- iOS, Android, Web에서 모두 어색하지 않은 레이아웃을 우선합니다.
- 스타일 값은 반복되면 theme 또는 constants로 올립니다.

## TypeScript 기준

- `any` 사용을 피하고, 필요한 경우 `unknown`에서 좁혀갑니다.
- API boundary에서는 DTO 타입을 명확히 둡니다.
- optional 값은 UI에서 사용하기 전에 fallback 또는 guard를 둡니다.
- 도메인 규칙은 순수 함수로 작성해 테스트하기 쉽게 유지합니다.

## 테스트와 검증

- 변경 후 최소한 `npm run lint`를 실행합니다.
- 도메인 규칙이 추가되면 단위 테스트를 우선 고려합니다.
- API mapper는 서버 DTO 변경에 취약하므로 테스트 가치가 높습니다.
- 화면 변경은 iOS/Android/Web 중 영향 범위를 확인합니다.
- 지도, 위치 권한, 네트워크 상태처럼 기기 환경에 의존하는 기능은 실제 기기 또는 시뮬레이터에서 확인합니다.
- 주요 사용자 흐름은 성공, 빈 상태, 실패 상태를 함께 확인합니다.

## Git 작업 기준

- 모바일 작업은 `apps/mobile` 아래 변경으로 제한합니다.
- 백엔드 `apps/api` 변경이 필요하면 백엔드 개발자와 협의합니다.
- 생성 파일, 캐시, 빌드 산출물은 커밋하지 않습니다.
- 큰 구조 변경은 기능 작업과 분리해서 커밋합니다.
- PR은 기능 변경, 리팩터링, 포맷 변경을 가능하면 분리합니다.
- PR 설명에는 변경 범위, 확인한 명령어, 화면 변경 여부, API 계약 변경 여부를 적습니다.
- 리뷰에서 논의 중인 구조는 임의로 크게 바꾸지 않고, 합의된 방향만 반영합니다.
- 공용 컴포넌트나 전역 hook을 수정하면 영향을 받는 화면을 함께 확인합니다.

## 협업 체크포인트

- API 요청/응답이 변경되었는가?
- 백엔드 스펙 문서 또는 협의 내용과 타입이 일치하는가?
- 모바일 단독 변경인지, 백엔드 배포 순서가 필요한 변경인지 명확한가?
- feature 내부 구현이 다른 feature로 새어 나가지 않았는가?
- 공통 컴포넌트로 올릴 만큼 재사용 가치가 있는가?
- 임시 코드, mock 데이터, TODO가 PR에 설명되어 있는가?
- 새 의존성을 추가했다면 이유와 대체 가능성을 설명할 수 있는가?
- 사용자 위치, 실거래가, 즐겨찾기 같은 민감하거나 중요한 데이터 흐름이 안전한가?

## 실무 체크리스트

- 라우트 파일이 너무 두꺼워지지 않았는가?
- DTO가 UI 컴포넌트까지 새어 나오지 않았는가?
- feature 간 직접 참조가 생기지 않았는가?
- loading, empty, error 상태가 있는가?
- API 실패 시 사용자에게 보여줄 상태가 있는가?
- `npm run lint`가 통과하는가?
- 민감한 값이 코드나 `app.json`에 들어가지 않았는가?
- iOS, Android, Web 중 이번 변경이 영향을 주는 플랫폼을 확인했는가?
- 접근성 label, 터치 영역, 키보드 회피가 필요한 화면인지 확인했는가?
- 성능에 민감한 목록, 지도, 이미지 렌더링에서 불필요한 re-render가 없는가?
- 새로 만든 타입과 파일명이 기존 네이밍 규칙과 맞는가?
