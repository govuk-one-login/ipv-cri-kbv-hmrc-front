# Imposter

[Imposter](https://www.imposter.sh/) is a mocking solution for APIs.

## Running

Imposter can be [run locally](https://docs.imposter.sh/getting_started/) using the [Imposter CLI](https://docs.imposter.sh/run_imposter_cli/). Alternatively, it can also be run using [Docker](https://docs.imposter.sh/run_imposter_docker/) or a [JAR](https://docs.imposter.sh/run_imposter_jar/) file.

The Imposter server can be started using the cli:

```bash
imposter up
```

Imposter runs on port `8080` by default, this can be changed using `--port` as an option on the command line.

## Endpoints

To test that the system is running as expected hit the following endpoint.

curl http://URL/system/status
