# CLAUDE.md

## Build Commands

### API

- Install: `./gradlew dependencies`
- Run: `./gradlew bootRun`
- Test: `./gradlew test`
- Build: `./gradlew build`

Run API commands from `apps/api`.

### Mobile

- Install dependencies: `npm install`
- Start Metro: `npm start`
- Run iOS: `npm run ios`
- Run Android: `npm run android`
- Test: `npm test`

Run mobile commands from `apps/mobile`.

### Database

- Start PostgreSQL/PostGIS locally: `docker compose up -d db`
- Stop database: `docker compose down`

Infrastructure files for the database should live under `infra/` or `docs/` as the monorepo grows.

## Directory Structure

```text
.
├── apps/
│   ├── api/        # Spring Boot + Kotlin backend
│   └── mobile/     # React Native application
├── docs/           # Product, architecture, and setup docs
├── CLAUDE.md
├── README.md
└── .gitignore
```

## Conventions

- Keep deployable applications under `apps/`.
- Keep cross-project documentation in `docs/`.
- Do not mix generated files into source directories unless required by the framework.
- Prefer Kotlin conventions already established in `apps/api`.
- Use feature-based structure for new React Native screens and modules when the app is added.
- Keep environment-specific secrets out of Git and use `.env.*` files only when paired with ignored local variants.
- Add new shared tooling or infrastructure at the repo root only when it is genuinely used across multiple apps.
