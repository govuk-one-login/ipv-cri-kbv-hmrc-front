FROM mcr.microsoft.com/playwright:v1.34.3-jammy as playwright

WORKDIR /tests

COPY package.json package-lock.json ./

RUN npm install

COPY . ./


CMD ["./run-tests.sh"]
