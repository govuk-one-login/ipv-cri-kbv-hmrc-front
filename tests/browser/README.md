# di-ipv-cri-kbv-hmrc-front-tests

KBV HMRC Credential Issuer Frontend Tests is a test suite designed to run against the webserver in the root of this repository.

## Quick Start

The following quickstart process details how to install and run the browser tests against an existing frontend website..

### Major Dependencies

- [Node.js](https://nodejs.org/en/) (>= 18.17.1)
- [NPM](https://www.npmjs.com/) (>= 9.6.0)

### Installation

1. Install node dependencies:

   ```
   npm install
   ```

### Configuring the application

Create a copy of the example environment variable file and add values for the keys:

```
cp .env.example .env
```

Set the [environment variables](./environment-variables.md) accordingly.

### Running the tests

```
npm run test:browser
```

### Cucumber

The browser tests are written as [Cucumber Gherkin Features](https://cucumber.io/docs/gherkin/) with the [cucumber-js](https://cucumber.io/docs/installation/javascript/) test runner integrated with [Playwright](https://playwright.dev/)
