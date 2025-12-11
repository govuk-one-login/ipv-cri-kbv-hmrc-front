FROM mcr.microsoft.com/playwright:v1.34.3-jammy as playwright

WORKDIR /tests

COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

COPY . ./


CMD ["./run-tests.sh"]
