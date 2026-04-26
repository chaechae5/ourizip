
# 임장노트 (Ourizip)

부동산 임장(현장 방문 조사)을 디지털화하는 지도 기반 모바일·웹 서비스.
지도 위에 핀을 찍어 현장 메모를 남기고, 청약·분양 정보와 실거래 시세,
출근지 이동시간을 한 화면에서 확인할 수 있습니다.

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 모바일/웹 | React Native + React Native Web |
| 지도 | Kakao Map SDK |
| 백엔드 | Spring Boot 3 + Kotlin |
| 데이터베이스 | PostgreSQL 15 + PostGIS |
| 캐시 | Redis |
| 인증 | JWT + OAuth 2.0 (Kakao, Google) |

## 저장소 구조

```text
.
├── apps/
│   ├── api/         # Spring Boot 백엔드
│   └── mobile/      # React Native 앱
├── docs/            # 요구사항 정의서, API 스펙
├── CLAUDE.md        # AI 에이전트용 프로젝트 가이드
└── README.md
```

## 시작하기

### 사전 요구사항

- JDK 17
- Node.js 20+
- PostgreSQL 15 + PostGIS extension


### 백엔드 실행

```bash
cd apps/api
./gradlew bootRun
# http://localhost:8080
```

### 모바일 앱 실행

```bash
cd apps/mobile
npm install
npm run ios       # 또는 npm run android
```

## 개발 로드맵

1. **MVP** — 지도 + 핀 + 코멘트
2. 즐겨찾기 · 임장 목록 
3. 출근지 이동시간 + 시세 시뮬레이터 
4. 청약 · 분양 정보 오버레이 
5. 알림 고도화 

자세한 기능 명세는 [docs/requirements.md](./docs/requirements.md) 참조.
