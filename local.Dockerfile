FROM node:22.3.0-alpine3.19@sha256:075a5cc188c3c9a49acacd481a9e8a3c9abf4223f02c658e37fdb8e9fe2c4664

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
