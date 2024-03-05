# Generalised CRI Frontend Application structure

The website is constructed using [Express](https://expressjs.com) [routers](https://expressjs.com/en/api.html#router), [param middleware](https://expressjs.com/en/api.html#router.param) and [shared middleware](https://expressjs.com/en/api.html#router.use).

The general folder structure is:

- `app.js` - entrypoint for the application which configured and starts the Express webserver
- `app/` - Express functionality exposed as router modules inside subdirectories
- `assets/` - frontend assets (JavaScript & SCSS)
- `lib/` - generalised code libraries
- `locales/`- i18next localisation files
- `presenters/` - transformers from data models to [GOV UK Frontend](https://design-system.service.gov.uk/) macros
- `views/` - Nunjucks templates

## Routing

The index file of each app module is used to configure any routes or subroutes that this module will serve through Express.

### HMPO Form Wizard

Multi-page forms are provided using the [HMPO Form Wizard](https://github.com/HMPO/hmpo-form-wizard) which is an extension of the [GOV.UK Design System](https://design-system.service.gov.uk/). These have a different setup and lifecycle in order to faciliate form rendering and processing. Further details are available in the [GitHub repository](https://github.com/HMPO/hmpo-form-wizard)

They can have a variety of different parts, in either a root file, or a folder with multiple files, and exposed via an `index.js` in the folder.

- `controllers/` - controllers for adapting the Form Wizard lifecycle methods
- `fields.js` - Field definitions
- `steps.js` - Step definitions
- `validators/` - Validator functions

## di-ipv-cri-common-express

[common-express](https://github.com/alphagov/di-ipv-cri-common-express/) is a shared library used by Credential Issuer frontends for:

- UI components
- frontend assets
- reusable OAuth middleware
- i18n utilities

## General notes

- Express middleware should be used to manipulate the request object by adding values to the `req` object which will be used by later middleware functions.
- `res.locals` should be reserved only for data that will definitely be rendered in some way - often data on the `req` object can replace this usage.
- HMP Form Wizard is a config based framework so unit tests are not required for the `fields.js` and `steps.js`, this integreation is more appropriately tested using [browser tests](../tests/browser)
