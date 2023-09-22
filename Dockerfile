FROM node:18.17.1-alpine3.17 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY /src ./src
RUN npm run build

RUN npm prune

FROM node:18.17.1-alpine3.17 AS final

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini"]

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/src ./src

ENV PORT 8080
EXPOSE $PORT

ENTRYPOINT ["tini", "--"]

CMD ["npm", "start"]
