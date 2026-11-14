# ---- build stage: install all deps, generate Prisma client, compile TS ----
FROM node:22-slim AS build
WORKDIR /app

# Prisma's query engine needs OpenSSL at generate time and at runtime.
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Drop devDependencies but keep the generated client in node_modules/.prisma
RUN npm prune --omit=dev

# ---- runtime stage: just the compiled app + production deps ----
FROM node:22-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000
USER node

# PORT is overridden by the host (Railway injects its own), so read it at check time.
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Apply any pending Prisma migrations, then start. Safe with several replicas starting at
# once — Prisma takes a database advisory lock while migrating.
CMD ["npm", "run", "start:prod"]
