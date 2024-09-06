# ------------------------------instalando pnpm------------------------------
FROM node:20-alpine as base

RUN npm i -g pnpm

WORKDIR /app

# ------------------------------instalando dependencias------------------------------
FROM base as dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# ------------------------------ultimo stage------------------------------
FROM base as dev

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./
COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./

EXPOSE 3000
CMD ["pnpm", "start:dev"]