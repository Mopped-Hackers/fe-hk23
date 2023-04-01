FROM node:16-alpine AS development

ENV NODE_ENV development

WORKDIR /var/www/html
COPY package*.json ./
RUN npm install
COPY . .


FROM node:16-alpine AS build-step
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/dist /var/www/html
