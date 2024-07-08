FROM mcr.microsoft.com/playwright:v1.34.3-jammy as playwright

WORKDIR /app

COPY . /app

WORKDIR /app/tests/browser

RUN npm install

CMD ["./run-tests.sh"]
