FROM node:23.2.0-alpine3.19@sha256:416fdb6cb5dbb08184ffde134fe543b014b058ed21c373767832410b25ec3662

ENV PORT 5000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD npm run dev

EXPOSE $PORT
