# ourizip

`ourizip` is a monorepo for the OuriZip platform.

## Stack

- API: Spring Boot + Kotlin
- Mobile App: React Native
- Database: PostgreSQL + PostGIS

## Repository Layout

```text
.
├── apps
│   ├── api
│   └── mobile
├── docs
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Getting Started

The API source is imported from the existing `ourizip-api` repository with `git subtree --squash`.

The React Native app and shared DB-related assets can be added incrementally under this monorepo structure.
