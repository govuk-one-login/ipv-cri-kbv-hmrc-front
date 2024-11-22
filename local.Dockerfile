FROM node:23.3.0-alpine3.19@sha256:1c380ed40f8d2f42081a07e8bcea5048b18df1e1dab3e6191e0ad095c84b9e12

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
