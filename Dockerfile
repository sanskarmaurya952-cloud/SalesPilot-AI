# ── deps ──────────────────────────────────────────────────────────────────────
FROM node:22-slim AS deps
WORKDIR /app

RUN npm install -g pnpm@11.25.0
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

# ── build ─────────────────────────────────────────────────────────────────────
FROM node:22-slim AS build
WORKDIR /app

RUN npm install -g pnpm@11.25.0
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_AGORA_APP_ID
ENV NEXT_PUBLIC_AGORA_APP_ID=$NEXT_PUBLIC_AGORA_APP_ID
RUN echo "AGORA_APP_ID=$NEXT_PUBLIC_AGORA_APP_ID"
RUN pnpm run build

# ── runner ────────────────────────────────────────────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
