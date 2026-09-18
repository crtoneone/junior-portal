# AGENTS.md — dajflek dev (`/srv/dev`)

## Commands
- Backend dev: `cd /srv/dev/backend && npm run dev` — NestJS on `localhost:4000`
- Frontend dev: `cd /srv/dev/frontend && npm run dev` — Next.js on `localhost:3000`
- Rebuild backend: `cd /srv/dev/backend && rm -rf dist tsconfig.tsbuildinfo && npx tsc`
- Seed: `cd /srv/dev/backend && npx prisma db seed`
- PM2 (running on server): `dev-backend` (`/srv/dev/backend/dist/main.js`) a `dev-frontend` (`next dev -p 3000`), logy v `/tmp/dev-*-*.log`
- Docker stack (alternatíva): `docker compose -f /srv/dev/docker-compose.yml up --build` — PostgreSQL 5432, backend 4000, frontend 3000

## Architektúra
- Frontend: Next.js 16 App Router v `/srv/dev/frontend/src/app`. Backend: NestJS v `/srv/dev/backend/src`.
- API prefix: `/api` (`app.setGlobalPrefix('api')`).
- DB: Prisma + SQLite (`/srv/dev/backend/prisma/junior_portal.db`). `db push` sa používa namiesto migrácií.
- CORS backend: dynamicky z `FRONTEND_URL` env; lokálne fallback `http://localhost:3000`.
- Frontend API URL: `NEXT_PUBLIC_API_URL` env; lokálne `http://localhost:4000/api`.
- `next.config.ts` má `allowedDevOrigins: ['dev.dajflek.sk']`.

## Dôležité konvencie / gotchy
- Pole pre skills, requirements, responsibilities sú v DB ako `String` (`@default("[]")`). Pri práci s nimi treba JSON parse/stringify v službách.
- `User.role` enum formou stringu: `CANDIDATE`, `EMPLOYER`, `ADMIN`. `isActive` = soft-block.
- Landingové témy sú v `frontend/src/app/landing-*`: `bauhaus2` (zdieľaný `components/landing/landing-page.tsx`), dve Bauhaus iterácie `bauhaus-primar`, `bauhaus-poster` (`components/landing/bauhaus-landing.tsx`) a tri brutal iterácie `brutal`, `brutal-dark`, `brutal-signal` (`components/landing/brutal-landing.tsx`, variant cez prop). Tokeny tém v `globals.css` (`[data-theme=...]`), zoznam v `lib/theme.tsx` + `components/theme-switcher.tsx`. Neupravuj `page.tsx` pre nové landingy — pridávaj samostatný priečinok/routu.
- Uploads: backend Multer, statické `/uploads` cez Express.
- Žiadne `.env` súbory nie sú v repozitári; nastavenia ísť cez PM2 env alebo docker-compose.
