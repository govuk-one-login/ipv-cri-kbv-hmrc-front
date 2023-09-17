# di-ipv-cri-kbv-hmrc-front

[![Github Action: Unit Tests](https://github.com/alphagov/di-ipv-cri-check-hmrc-front/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/alphagov/di-ipv-cri-check-hmrc-front/actions/workflows/unit-tests.yml?query=branch%3Amain)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alphagov_di-ipv-cri-kbv-front&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alphagov_di-ipv-cri-check-hmrc-front)

> Note: This repository is templated as part of [di-ipv-cri-templates](https://github.com/alphagov/di-ipv-cri-templates), and any substational changes that can be shared should be included back into that repository for re-use elsewhere

Kbv Hmrc Credential Issuer Frontend is a Credential Issuer as part of the GOV.UK One Login programme.

There are two main repositories that comprise this credential issuer:

- This is the website used for displaying the HMRC Check Credential Issuer.
- There is a related [api repository](https://github.com/alphagov/di-ipv-cri-kbv-hmrc-api) that contains the backend API that provides all the data interaction consumed

For frontend specific work there are the following repositories:

- There is a [shared library repository](https://github.com/alphagov/di-ipv-cri-common-express)
- This contains Express middleware, shared JavaScript and Sass files, and shared templates

## Quick Start

### Major Dependencies

- [Node.js](https://nodejs.org/en/) (>= 18.17.1)
- [NPM](https://www.npmjs.com/) (>= 9.6.0)

### Installation

1. Clone repository and change directory:

```
git clone https://github.com/alphagov/di-ipv-cri-check-hmrc-front && cd di-ipv-cri-kbv-hmrc-front
```

2. Install node dependencies:

```
npm install
```

3. Build the assets

```
npm run build
```

### Configuring the application

Create a copy of the example environment variable file and add values for the keys:

```
cp .env.example .env
```

Set the [environment variables](./environment-variables.md) accordingly.

### Running the application

#### In production mode

```
NODE_ENV=production npm start
```

The app will run on port 5000 by default and be available at [http://localhost:5000](http://localhost:5000).

#### In development mode

To run the server with continuous build mode:

```
npm run dev
```

> Note: By default, the server runs with an in-memory Redis instance, so restarting the server will clear the session.

By default, the application will be running at [http://localhost:5000](http://localhost:5000)

## Licence

The codebase is released under the [MIT License](./LICENSE).
