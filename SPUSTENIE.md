# JuniorPortal - Job portal pre juniorov

## Struktura
```
portal/
  backend/    - NestJS REST API
  frontend/   - Next.js 16 App
```

## Ako spustit
```bash
# Backend
cd portal/backend
npm install
rm -rf dist tsconfig.tsbuildinfo && npx tsc
npx prisma db push
npx prisma db seed
setsid node dist/main.js < /dev/null > /tmp/backend.log 2>&1 &

# Frontend
cd portal/frontend
npm install
setsid npx next dev -p 3000 < /dev/null > /tmp/frontend.log 2>&1 &
```

## URL
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Testovacie ucty
| Rola | Email | Heslo |
|------|-------|-------|
| Admin | admin@juniorportal.sk | password123 |
| Kandidat | kandidat@example.sk | password123 |
| Zamestnavatel | firma@example.sk | password123 |

## Poznamky
- Databaza: SQLite (prisma/junior_portal.db)
- Porty: backend 4000, frontend 3000
- Pre PostgreSQL by treba zmenit provider v schema.prisma
