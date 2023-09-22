# Environment variables

## General

- Environment variables can be set for local development using a `.env` file. An example file is included as a starting point.

| Name                  | Description                                                         | Default               |
| :-------------------- | :------------------------------------------------------------------ | :-------------------- |
| API_BASE_URL          | Base URL for the backend API server                                 | http://localhost:5055 |
| ASSETS_BASE_URL       | Host for assets CDN                                                 | /public               |
| EXTERNAL_WEBSITE_HOST | The (accessible) hostname (and port) of the listening web server.   | http://locahost:5050  |
| PORT                  | Port the web server listens on                                      | 5000                  |
| SESSION_SECRET        | A complex string unique to the environment, used to encrypt cookies |                       |
| SESSION_TABLE_NAME    | Table name for the user session data                                |                       |
| SESSION_TTL           | How long the user session should last (in milliseconds)             | 7200000 (2 hours)     |

## Metrics and Analytics

| Name             | Description                 | Default   |
| :--------------- | :-------------------------- | :-------- |
| ANALYTICS_UA_ID  | Google Tag Manager ID       |           |
| ANALYTICS_GA4_ID | Google Tag Manager ID       |           |
| ANALYTICS_DOMAIN | Domain for Google Analytics | localhost |
