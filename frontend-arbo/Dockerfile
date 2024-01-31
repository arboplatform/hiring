# Compilação
FROM node:18 AS builder

WORKDIR /usr/src/app

# variáveis de ambiente
ARG REACT_APP_BACKEND_URL

COPY package*.json ./
# COPY .env ./

RUN npm install

COPY . .

RUN npm run build

RUN REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} npm run build

# Servir o Conteúdo
FROM nginx:alpine

# Copia o build do React
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

# mapeamento de porta do Dockerfiles
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]