FROM node:20.12.2-alpine3.19@sha256:ec0c413b1d84f3f7f67ec986ba885930c57b5318d2eb3abc6960ee05d4f2eb28

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
