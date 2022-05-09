# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_TELEMETRY_DISABLED=1\
    BACKEND\
    APP_SLUG\
    ACTNOW_URL\
    ACTNOW_CLIENT_ID\
    ACTNOW_CLIENT_SECRET\
    ACTNOW_API_KEY\
    GOOGLE_ID\
    GOOGLE_SECRET\
    GSHEETS_SPREADSHEET_ID\
    GSHEETS_PROMISES_SHEET_ID\
    GSHEETS_SITES_SHEET_ID\
    GSHEETS_STATUSES_SHEET_ID\
    GSHEETS_ARTICLES_SHEET_ID\
    GSHEETS_FACTCHECKS_SHEET_ID\
    GSHEETS_PROMISES_CATEGORIES_SHEET_ID\
    GSHEETS_ARTICLES_CATEGORIES_SHEET_ID\
    GSHEETS_FACTCHECKS_CATEGORIES_SHEET_ID\
    GSHEETS_SITES_NAVIGATIONS_SHEET_ID\
    GSHEETS_CATEGORIES_SHEET_ID\
    GSHEETS_PROMISES_EVENTS_SHEET_ID

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} 

ENV BACKEND=${BACKEND}\
    APP_SLUG=${APP_SLUG}\
    ACTNOW_URL=${ACTNOW_URL}\
    ACTNOW_CLIENT_ID=${ACTNOW_CLIENT_ID}\
    ACTNOW_CLIENT_SECRET=${ACTNOW_CLIENT_SECRET}\
    ACTNOW_API_KEY=${ACTNOW_API_KEY}\
    GOOGLE_ID=${GOOGLE_ID}\
    GOOGLE_SECRET=${GOOGLE_SECRET}\
    GSHEETS_SPREADSHEET_ID=${GSHEETS_SPREADSHEET_ID}\
    GSHEETS_PROMISES_SHEET_ID=${GSHEETS_PROMISES_SHEET_ID}\
    GSHEETS_SITES_SHEET_ID=${GSHEETS_SITES_SHEET_ID}\
    GSHEETS_STATUSES_SHEET_ID=${GSHEETS_STATUSES_SHEET_ID}\
    GSHEETS_ARTICLES_SHEET_ID=${GSHEETS_ARTICLES_SHEET_ID}\
    GSHEETS_FACTCHECKS_SHEET_ID=${GSHEETS_FACTCHECKS_SHEET_ID}\
    GSHEETS_PROMISES_CATEGORIES_SHEET_ID=${GSHEETS_PROMISES_CATEGORIES_SHEET_ID}\
    GSHEETS_ARTICLES_CATEGORIES_SHEET_ID=${GSHEETS_ARTICLES_CATEGORIES_SHEET_ID}\
    GSHEETS_FACTCHECKS_CATEGORIES_SHEET_ID=${GSHEETS_FACTCHECKS_CATEGORIES_SHEET_ID}\
    GSHEETS_SITES_NAVIGATIONS_SHEET_ID=${GSHEETS_SITES_NAVIGATIONS_SHEET_ID}\
    GSHEETS_CATEGORIES_SHEET_ID=${GSHEETS_CATEGORIES_SHEET_ID}\
    GSHEETS_PROMISES_EVENTS_SHEET_ID=${GSHEETS_PROMISES_EVENTS_SHEET_ID}

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
