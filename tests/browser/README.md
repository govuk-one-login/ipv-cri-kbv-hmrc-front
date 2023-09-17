# di-ipv-cri-kbv-hmrc-front-tests

Kbv Hmrc Credential Issuer Frontend Tests is a test suite designed to run against the webserver in the root of this repository.

## Quick Start

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
