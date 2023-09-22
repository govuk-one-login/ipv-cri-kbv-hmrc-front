# Environment variables

## General

- Environment variables can be set for local development using a `.env` file. An example file is included as a starting point.
- `GITHUB_ACTIONS` is set by default when running as a GitHub Action

| Name         | Description                                                       | Default               |
| :----------- | :---------------------------------------------------------------- | :-------------------- |
| MOCK_API     | Enable the use of passthrough @mock-api tags into the `client-id` | true                  |
| WEBSITE_HOST | URL of the website to test against                                | http://localhost:5090 |
