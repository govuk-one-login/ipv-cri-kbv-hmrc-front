# di-ipv-cri-kbv-hmrc-front

[![Github Action: Scan repository](https://github.com/govuk-one-login/ipv-cri-kbv-hmrc-front/actions/workflows/scan-repo.yml/badge.svg?branch=main)](https://github.com/govuk-one-login/ipv-cri-kbv-hmrc-front/actions/workflows/scan-repo.yml?query=branch%3Amain)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ipv-cri-kbv-hmrc-front&metric=coverage)](https://sonarcloud.io/summary/overall?id=ipv-cri-kbv-hmrc-front)

> Note: This repository is templated as part of [di-ipv-cri-templates](https://github.com/govuk-one-login/di-ipv-cri-templates), and any substantial changes that can be shared should be included back into that repository for re-use elsewhere

KBV HMRC Credential Issuer Frontend is a Credential Issuer as part of the GOV.UK One Login programme.

There are two main repositories that comprise this credential issuer:

- This is the website used for displaying the Kbv Hmrc Credential Issuer.
- There is a related [api repository](https://github.com/govuk-one-login/di-ipv-cri-kbv-hmrc-api) that contains the backend API that provides all the data interaction consumed

For frontend specific work there are the following repositories:

- There is a [shared library repository](https://github.com/alphagov/di-ipv-cri-common-express)
- This contains Express middleware, shared JavaScript and Sass files, and shared templates

## Quick Start

The following quickstart process details how to install and run the CRI frontend webserver with API mocks.

### Major Dependencies

- [Node.js](https://nodejs.org/en/) (>= 18.17.1)
- [NPM](https://www.npmjs.com/) (>= 9.6.0)
- [pre-commit](https://pre-commit.com/) (>= 2.17.0)

### Installation

1. Clone repository and change directory:

```
git clone https://github.com/alphagov/di-ipv-cri-kbv-hmrc-front && cd di-ipv-cri-kbv-hmrc-front
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

In order to successfully run the application, the following things are required:

1. frontend application started and configured to point at an API
2. deployed API or mock API needs to be made available and configured
3. a correctly formed entry point url using `client_id` and `request` OAuth parameters

#### Frontend

The app will run on port 5000 by default and be available at [http://localhost:5000](http://localhost:5000).

##### In development mode

To run the server with continuous build mode:

```
npm run dev
```

> Note: By default, the server runs with an in-memory Redis instance, so restarting the server will clear the session.

By default, the application will be running at [http://localhost:5000](http://localhost:5000).

##### In production mode

```
NODE_ENV=production npm start
```

### API

An API is required for all oauth requests and all other backend interactions.

This is configured in the frontend application using the `API_BASE_URL` environment variable, as described in [environment variables](./environment-variables.md).

### Mock API

A standalone mock of the [api](https://github.com/alphagov/di-ipv-cri-kbv-hmrc-api) is provided using a combination of the API's OpenAPI config and hand-crafted Imposter scenarios.

More details on how to run this are in the [Imposter folder](./tests/imposter/).

When connecting to a mock API both the `client_id` and `request` parameters are determined by the data in the Imposter configuration files. The `client_id` is used for determining what data to return to the frontend, and the request parameter is ignored.

### Deployed API

This can also be connected to a deployed API behind an API Gateway, using the same `API_BASE_URL` variable.

When connecting to a deployed API both the `client_id` and `request` parameters are supplied by an upstream service acting as this system's Relying Party. The `client_id` is configured for use with API and the `request` payload is signed and encrypted with keys known to the API.

### URL

Using the appropriate `client_id` and `request` parameters, the website can be accessed using a URL similar to:

http://localhost:5000/oauth2/authorize?request=ignored&client_id=success

### Running tests

#### Unit tests

Unit tests can be run from the root of the project using:

```
npm run dev
```

They use Jest as the test runner, which is configured using [jest.config.js](./jest.config.js)

#### Browser tests

Browser tests are run from the [tests/browser](./tests/browser/) folder, with appropriate quick start documentation located there.

## Licence

The codebase is released under the [MIT License](./LICENSE).
