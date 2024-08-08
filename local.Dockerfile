FROM node:22.6.0-alpine3.19@sha256:30c5be9215c0ab992925f025a388d41e9be66c159a6cefb8f132ba829874e7f7

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
