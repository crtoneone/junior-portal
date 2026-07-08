# Project context

Toto je job portal pre juniorov. Backend NestJS na porte 4000, frontend Next.js na porte 3000. Databaza SQLite.

## Co bolo spravene (2026-06-07)
- Prechod z PostgreSQL na SQLite (kvoli chybajucej databaze na systeme)
- Fixnute circular dependencies v moduloch (global JwtModule)
- Skills, requirements, responsibilities ulozene ako JSON string namiesto array (SQLite limitation)
- JSON serializacia/deserializacia v jobs.service.ts a candidates.service.ts
- Vytvorene chybajuce stranky:
  - /dashboard/employer/profile (employer profil edit)
  - /dashboard/employer/jobs/[id]/edit (edit job)
  - /auth/candidate, /auth/employer (presmerovacie stranky)
  - /cv (jednoducha CV stranka)
- Pridane linky v employer dashboard headeri na profil, v candidate dashboard na profil a CV

## Co bolo spravene (2026-06-19) — Admin Backoffice + Contact
- **Backend**: Pridany `ContactMessage` model (schema, module, controller, service)
- **Backend**: Rozsireny Admin modul (users CRUD, jobs CRUD, skills CRUD, contact messages)
- **Backend**: Pridany `isActive` field na User (soft-block)
- **Seed**: Pridane 3 sample kontaktne spravy (UNREAD, READ, REPLIED)
- **Frontend**: Admin Layout so sidebarom (collapsible, unread count badge)
- **Frontend**: Admin Dashboard s rozsirenymi statistikami a trendami
- **Frontend**: Admin Users (fulltext search, filter podla role, verify/block/delete)
- **Frontend**: Admin Jobs (search, filter podla statusu, close/activate/delete)
- **Frontend**: Admin Skills (CRUD, grouped by category)
- **Frontend**: Admin Messages (inbox s filtrom, detail s odpovedou)
- **Frontend**: Public `/contact` stranka s kontaktnym formularom
- **Frontend**: Contact CTA sekcia na landing page
- **Navbar**: Pridany "Kontakt" link, admin friendly links

## Ako spustit
- Backend: `cd ~/portal/backend && setsid node dist/main.js < /dev/null > /tmp/backend.log 2>&1 &`
- Frontend: `cd ~/portal/frontend && setsid npx next dev -p 3000 < /dev/null > /tmp/frontend.log 2>&1 &`
- Po zmene kodu: `cd ~/portal/backend && rm -rf dist tsconfig.tsbuildinfo && npx tsc` (backend)
- Seed: `cd ~/portal/backend && npx prisma db seed`

## Testovacie ucty
- admin@juniorportal.sk / password123 (ADMIN)
- kandidat@example.sk / password123 (CANDIDATE)
- firma@example.sk / password123 (EMPLOYER)

## Este chyba
- Notification triggers (create notifikacie pri aplikacii/status change)
- Token refresh na frontende (auto-refresh pri 401)
- Skill API (CRUD endpointy pre Skill model)
- CV builder (kompletna funkcionalita)
