# ALIENTEKA DB Setup (Supabase + Prisma)

## 1) Crear proyecto en Supabase
- Ve a https://supabase.com y crea un proyecto.
- Copia:
  - Project URL -> NEXT_PUBLIC_SUPABASE_URL
  - anon key -> NEXT_PUBLIC_SUPABASE_ANON_KEY
  - service_role key (opcional) -> SUPABASE_SERVICE_ROLE_KEY
  - Connection string (psql) -> DATABASE_URL

## 2) Configurar .env.local
Crea `.env.local` en la raíz con:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon
SUPABASE_SERVICE_ROLE_KEY=your_service_role # opcional
# formato: postgresql://postgres:password@db.host:5432/postgres
DATABASE_URL=postgresql://postgres:password@host:5432/postgres

## 3) Preparar Prisma
- Instala dependencias si es necesario.
- Genera cliente y empuja el esquema:

npm run prisma:generate
npm run db:push

## 4) Seed (opcional)
- Si ya tienes un usuario en Supabase (auth.users) y su UUID, puedes crearte un artículo inicial:

SETX SEED_AUTHOR_ID <UUID_DEL_USUARIO>
npm run db:seed

En Windows PowerShell, usa:

$env:SEED_AUTHOR_ID = "<UUID>"
npm run db:seed

## 5) Probar autenticación
- Inicia el dev server.
- Regístrate o inicia sesión. En el primer login, la app llama a `/api/users/ensure` para crear tu registro en `users` de Prisma con tu mismo UUID de Supabase.

## 6) Crear artículos reales
- Ve a `/articles/new` y completa título, categoryId (toma uno de `categories`), contenido JSON y publica.
- La lista `/articles` ahora lee desde la DB.

## 7) Mapa con DB
- Endpoint `/api/sightings` devuelve avistamientos reales (debes crear registros en `sightings`).

Notas:
- El modelo `User.id` es UUID para coincidir con Supabase auth.
- Si cambias el esquema, vuelve a ejecutar `npm run db:push`.
