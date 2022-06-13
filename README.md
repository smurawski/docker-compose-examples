# Getting Started with Azure Container Apps and the `containerapp-compose` CLI Extension

## Installing the `containerapp-compose` extension

```azurecli
az extension add --name containerapp --upgrade --yes
az extension add --name containerapp-compose --upgrade --yes
```

## Examples

* [Simple example with one container](./simple/README.md)
* [Simple example with a private registry](./simple_with_private_registry/README.md)
* [Two container GRPC example](./grpc/README.md)
