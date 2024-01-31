# Compilação
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Execução
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/src/swaggerConfig.yaml ./dist/

EXPOSE 5000

CMD ["node", "dist/main.js"]