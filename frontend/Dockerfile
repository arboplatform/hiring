FROM node:20

ENV PORT=3000

EXPOSE 3000

WORKDIR /app

RUN npm install -g pnpm

COPY [ "package.json", "pnpm-lock.yaml", "./" ] .

RUN ["pnpm", "install"]

COPY . .

USER node

CMD ["pnpm", "dev"]