# 임장노트 (Ourizip)

## 프로젝트 목적

부동산 임장(현장 방문 조사)을 지도 기반으로 디지털화하는 모바일·웹 서비스.
핀과 코멘트로 현장 기록을 남기고, 청약·분양·시세·출근지 이동시간을 한 화면에서 확인합니다.

## 기술 스택

- **인프라**: AWS S3 / Cloudflare R2, Firebase FCM
- **프레임워크**: Spring Boot 3 (백엔드), React Native + React Native Web (앱)
- **언어**: Kotlin (백엔드), TypeScript (앱)
- **데이터베이스**: PostgreSQL 15 + PostGIS, Redis (캐시)
- **외부 API**: Kakao Map SDK, Kakao 길찾기, 청약홈 Open API, 국토부 실거래가 API

## 프로젝트 구조

```text
.
├── apps/
│   ├── api/                    # Spring Boot + Kotlin 백엔드
│   │   └── src/main/kotlin/
│   └── mobile/                 # React Native 앱 (iOS/Android/Web)
│       └── src/
│           ├── screens/        # 화면 단위 컴포넌트
│           ├── features/       # 기능별 모듈 (pin, favorite, simulator)
│           ├── api/            # API 클라이언트
│           └── components/     # 공용 UI 컴포넌트
├── docs/                       # 요구사항, API 스펙
├── CLAUDE.md
└── README.md
```

## 핵심 규칙 및 금지 사항

- **위치 쿼리는 PostGIS의 `ST_DWithin`, `ST_Distance` 사용** — 직접 위경도 거리 계산 금지
- **API 응답 모델 변경 시 `docs/api-spec.md` 동시 업데이트** — 스펙과 코드 불일치 금지
- **모바일 앱에 외부 API 키(Kakao, 공공데이터) 직접 박지 않기** — 모든 외부 호출은 백엔드 경유
- **사용자 위치 정보는 서버 저장 시 암호화** — 평문 저장 금지
- **`.env`, `.env.local` 등 비밀값 파일 커밋 금지** — `.env.example`만 커밋


## API 스펙 문서 경로

- 요구사항 정의서: `docs/requirements.md`
- API 스펙: `docs/api-spec.md`
- Swagger UI (로컬): `http://localhost:8080/swagger-ui.html`

## 테스트 규칙

- **백엔드**: 도메인 로직(시세 계산, 거리 쿼리)은 단위 테스트 필수, Repository는 Testcontainers로 PostGIS 실제 동작 검증
- **모바일**: 화면 단위 컴포넌트는 React Native Testing Library로 렌더링·인터랙션 테스트
- **외부 API 호출**: 실제 Kakao/공공데이터 API는 mock 처리, 통합 테스트는 별도 태그(`@IntegrationTest`)로 분리
- **PR 머지 전**: `./gradlew test`와 `npm test` 모두 통과 필수

## 일반 작업 원칙

- 배포 가능한 애플리케이션은 `apps/` 아래에 두기
- 프로젝트 공통 문서는 `docs/` 아래에 두기
- 프레임워크가 요구하지 않는 한 생성 파일을 소스 디렉토리에 섞지 않기
- React Native 화면과 모듈은 기능 단위(feature-based) 구조를 우선 사용
- 환경별 비밀값은 Git에 커밋하지 않고, `.env.*` 파일은 무시 규칙과 함께 로컬 변형만 사용
- 여러 앱에서 실제로 함께 쓰는 경우에만 루트에 공용 툴링이나 인프라를 추가