# Ourizip Mobile

Ourizip Mobile은 부동산 임장 기록을 지도 기반으로 남기는 React Native 앱입니다.
지도에서 위치를 확인하고, 임장 핀과 노트를 저장한 뒤, 나중에 목록과 상세 화면에서 다시
확인하는 흐름을 MVP의 중심으로 둡니다.

## 실행 방법

명령어는 항상 `apps/mobile` 디렉토리에서 실행합니다.

```bash
npm install
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

## 기술 스택

- Runtime: Expo SDK 54
- Framework: React Native 0.81, React 19
- Routing: Expo Router 6
- Language: TypeScript
- Navigation: React Navigation
- Server state: TanStack Query 예정
- Client state: Zustand 예정
- Package manager: npm

## MVP 범위

1일차 기준으로 실제 Kakao Map SDK와 백엔드 API는 붙이지 않고, 앱 구조와 지도 홈 mock 화면을
먼저 만듭니다.

반드시 개발할 MVP 기능은 다음입니다.

- 지도 홈
- 임장 핀 생성
- 임장 노트 작성과 수정
- 내 임장 목록
- 서버 저장

사진, 실거래가, 출근시간, 청약/분양 정보, 알림은 MVP 이후 확장 기능으로 둡니다.

## 프로젝트 구조

라우팅은 Expo Router의 `app/` 디렉토리가 담당하고, 실제 기능 구현은 `features/` 아래에
feature 단위로 둡니다.

```text
apps/mobile/
├── app/                  # Expo Router route entry
├── api/                  # 공통 API client
├── assets/               # images, fonts, static assets
├── components/           # 여러 feature에서 공유하는 UI
├── constants/            # 앱 전역 상수
├── features/             # 기능 단위 모듈
└── hooks/                # 앱 전역 공용 hook
```

공통 UI 컴포넌트는 `components/ui/`에 두고, 여러 feature에서 재사용될 때만 공통으로 올립니다.

```text
components/ui/
├── AppButton.tsx
├── AppIconButton.tsx
├── AppScreen.tsx
├── AppText.tsx
├── AppTextInput.tsx
├── Badge.tsx
├── EmptyState.tsx
├── ErrorState.tsx
└── LoadingState.tsx
```

임장 기능은 다음 구조를 기본으로 사용합니다.

```text
features/imjang/
├── domain/               # 앱 내부 기준 타입과 순수 규칙
├── data/                 # API, DTO, mapper, query, mutation
├── model/                # feature 내부 상태와 화면 모델
└── ui/
    ├── screens/          # 화면 단위 컴포넌트
    ├── components/       # 임장 feature 전용 UI
    └── hooks/            # 화면 상태와 이벤트 조합
```

## 아키텍처 흐름

```text
Route(app/)
  -> Screen(features/*/ui/screens)
  -> Feature Hook(features/*/ui/hooks)
  -> Query / Store
  -> API Client
  -> Backend
```

Android 개발 경험에 비유하면 다음과 같습니다.

- `app/(tabs)`는 Navigation graph에 가까운 route 선언입니다.
- `Screen`은 Compose screen 또는 Fragment에 가깝습니다.
- `ui/hooks`의 custom hook은 ViewModel 일부 역할에 가깝습니다.
- `domain/entities.ts`는 서버 DTO가 아니라 앱 내부에서 사용하는 domain model입니다.
- `props`는 Composable parameter처럼 부모가 자식 컴포넌트에 넘기는 입력값입니다.

## 라우팅 규칙

- `app/`에는 route wiring만 둡니다.
- 복잡한 화면 구현은 `features/*/uiscreens`로 이동합니다.
- route 파일은 가능하면 feature screen을 import해서 export하는 얇은 파일로 유지합니다.

예시:

```tsx
export { MapHomeScreen as default } from '@/features/imjang/ui/screens/MapHomeScreen';
```

## 네이밍 규칙

- 공통 UI 컴포넌트는 `App` prefix를 사용합니다.
  - `AppText`, `AppButton`, `AppScreen`, `AppTextInput`, `AppIconButton`
- 상태 표시용 컴포넌트는 의미 중심으로 이름을 붙입니다.
  - `Badge`, `EmptyState`, `LoadingState`, `ErrorState`
- feature 전용 컴포넌트는 도메인 이름을 포함합니다.
  - `ImjangPinPreviewCard`, `ImjangChecklistItem`
- 파일명은 컴포넌트명과 동일한 PascalCase를 사용합니다.

## 해상도와 반응형 UI 기준

모든 화면은 iPhone SE급 작은 화면부터 큰 iPhone, Android 기기, Web까지 깨지지 않도록
구성합니다. 특정 기기 크기에 맞춘 고정 레이아웃을 기본값으로 삼지 않습니다.

- 화면 최상위는 `AppScreen`을 우선 사용해 Safe Area, 배경색, 기본 padding을 통일합니다.
- 화면 전체 높이나 너비를 고정 숫자로 박지 않고 `flex`, `minHeight`, `maxWidth`, percentage를
  우선 사용합니다.
- 목록, 폼, 상세 화면처럼 세로 콘텐츠가 늘어나는 화면은 `ScrollView` 적용을 먼저 검토합니다.
- 버튼, 카드, 입력창은 작은 화면에서도 텍스트가 잘리지 않도록 줄바꿈, padding, minHeight를
  함께 고려합니다.
- 지도, 하단 패널처럼 `absolute` 배치를 쓰는 화면은 작은 화면에서 다른 요소와 겹치지 않는지
  반드시 확인합니다.
- 글자 크기를 화면 너비에 따라 과하게 키우지 않고, `theme.typography` 기준을 우선 사용합니다.
- 새 화면을 만들면 최소 iPhone 작은 화면, 일반 iPhone, 큰 iPhone, Android, Web 중 영향 범위를
  확인합니다.

## 상태 관리 기준

- 화면 내부에서만 쓰는 간단한 상태는 `useState`, `useReducer`, custom hook을 사용합니다.
- 서버 상태는 TanStack Query를 사용합니다.
- 로그인 사용자, 앱 설정, 지도 선택값처럼 여러 화면이 공유하는 클라이언트 상태는 Zustand를
  사용합니다.
- 서버 DTO와 화면 상태 타입을 섞지 않습니다.
