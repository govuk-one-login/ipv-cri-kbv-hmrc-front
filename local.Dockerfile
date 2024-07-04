FROM node:22.4.0-alpine3.19@sha256:138d0b5f22718a61ceb6a6d306050fbdb599c35f4bb472bc996e540b14cd76ed

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
