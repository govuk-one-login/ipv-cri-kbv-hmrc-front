FROM node:23.0.0-alpine3.19@sha256:3c0c8d88ecc014e9012b4e928cdc91f99a2856b9f5c4d5319e0c4dbb6ea7ce22

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
