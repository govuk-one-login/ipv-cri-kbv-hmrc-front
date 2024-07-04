FROM mcr.microsoft.com/playwright:v1.34.3-jammy as playwright

WORKDIR /app

COPY . ./

WORKDIR /app/tests

COPY package.json package-lock.json ./

RUN npm install

CMD ["./run-tests.sh"]
