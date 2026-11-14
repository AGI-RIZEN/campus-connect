# Deploying the backend to Railway

The server is ready for Railway as-is:

- `server/Dockerfile` is auto-detected and used for the build.
- On every start the container runs `prisma migrate deploy`, then the API (`npm run start:prod`),
  so the database schema is created/updated automatically.
- Redis client uses `family: 0`, which Railway's private (IPv6) network requires.
- The API listens on whatever `PORT` Railway injects — **don't set `PORT` yourself**.

You'll end up with 3 services in one Railway project: **Postgres**, **Redis**, **campus-connect-api**.

---

## 1. Create the project + databases

1. Sign in at https://railway.com → **New Project** → **Deploy PostgreSQL**.
2. In the same project: **+ Create** → **Database** → **Add Redis**.

## 2. Add the API service

Pick ONE way:

**A. From GitHub (auto-deploys on every push)**
1. Push this repo to GitHub.
2. **+ Create** → **GitHub Repo** → pick the repo.
3. Service → **Settings** → **Root Directory** = `server`.

**B. From this laptop with the Railway CLI (no GitHub needed)**
```bash
npm i -g @railway/cli
railway login
cd server
railway link          # choose the project you created
railway up            # uploads server/ and builds it (your .env is NOT uploaded — .dockerignore)
```

## 3. Variables (API service → Variables → Raw Editor)

Paste this, then fill in the secret values (copy Cloudinary/Brevo from your local `server/.env`):

```
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
DIRECT_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
JWT_ACCESS_SECRET=<new random 64 chars>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=<different random 64 chars>
JWT_REFRESH_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=
BREVO_SMTP_PASS=
MAIL_FROM="Campus Connect <no-reply@campusconnect.app>"
CORS_ORIGIN=*
```

`${{Postgres.DATABASE_URL}}` / `${{Redis.REDIS_URL}}` are Railway references — they use the
private network automatically. If you renamed the database services, use their names instead.

Random secrets (PowerShell):
```powershell
$b=New-Object byte[] 48;[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b);[Convert]::ToBase64String($b)
```

## 4. Settings (API service → Settings)

- **Healthcheck Path**: `/health`
- **Networking → Generate Domain** → you get `https://<something>.up.railway.app`

Check it: open `https://<something>.up.railway.app/health` → `{"status":"ok","env":"production"}`

## 5. (Optional) Copy your existing data into Railway Postgres

The first deploy creates empty tables. To bring over your current users/posts/etc. from the
local Docker database:

1. Railway → **Postgres** → **Variables** → copy `DATABASE_PUBLIC_URL`.
2. On this laptop (local Docker Postgres must be running):
```powershell
$bin = "C:\Program Files\PostgreSQL\18\bin"
$env:PGPASSWORD = "<LOCAL_PG_PASSWORD from server/.env>"
& "$bin\pg_dump.exe" -h localhost -p 5433 -U postgres -d campus_connect --format=custom --no-owner --no-acl --data-only --exclude-table=_prisma_migrations -f local-data.dump
Remove-Item Env:PGPASSWORD
& "$bin\pg_restore.exe" --dbname="<DATABASE_PUBLIC_URL>" --data-only --no-owner --disable-triggers --single-transaction local-data.dump
```
(Do this right after the first successful deploy, before anyone signs up on Railway.)

## 6. Point the APK at Railway and build it

In `eas.json` → `build.preview.env`:
```json
"EXPO_PUBLIC_API_URL": "https://<something>.up.railway.app/api"
```
Then:
```bash
npx eas-cli@latest login
npx eas-cli@latest build --profile preview --platform android
```

## Scaling

API service → Settings → **Replicas**. Several replicas are fine: chat events are shared via
the Redis Socket.io adapter, and the app's socket uses WebSocket-only transport, so no sticky
sessions are needed. Railway load-balances between replicas itself (no nginx needed there).
