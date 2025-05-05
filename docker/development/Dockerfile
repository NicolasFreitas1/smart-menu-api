FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install pnpm -g && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env.development.sample .env

# Adicione comandos para execução
# Exemplo, caso esteja usando o PrismaORM, adicione o comando para gerar as tipagens na node_modules
RUN npx prisma generate
RUN npm run build

# Reinstalar a node_modules, apenas com as dependências de produção

# RUN npm install --omit=dev

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

USER root

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules

# entrypoint.sh para executar os comando de migrations e seeds do TypeORM. (Etapa não obrigatória)
# COPY ./entrypoint.sh /entrypoint.sh


USER root

EXPOSE 5000

ENV PORT=5000


# Executar os comandos via o entrypoint, caso não exista, pode usar o comando:
CMD npm run start:prod
# ENTRYPOINT ["/entrypoint.sh"]