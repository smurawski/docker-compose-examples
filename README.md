# Getting Started with Azure Container Apps and the `containerapp-compose` CLI Extension

## Installing the `containerapp-compose` extension

```azurecli
az extension add --name containerapp --upgrade --yes
az extension add --name containerapp-compose --upgrade --yes
```

## Dev Container

This repo contains a `.devcontainer` directory. This directory contains files to open the repo locally in a [Dev Container](https://code.visualstudio.com/docs/remote/create-dev-container) (if you have Docker Desktop running) or in [GitHub Codespaces](https://github.com/features/codespaces) (if you have access to GitHub Codespaces).

The Dev Container configuration will already have the `containerapp` and `containerapp-compose` Azure CLI extensions installed, so will not need to run the commands listed in the section above.

To run the examples, you will need to authenticate using Azure CLI. Run the following command to authenticate using the [device authorization grant flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-device-code):

```bash
az login --use-device-code
```

## Examples

* [Simple example with one container](./simple/README.md)
* [Simple example with a private registry](./simple_with_private_registry/README.md)
* [Two container GRPC example](./grpc/README.md)
