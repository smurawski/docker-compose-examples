# GRPC Example

Source: https://github.com/jeffhollan/grpc-sample-python

## Create Azure Container Apps Environment

```azurecli
compose_hash=$(md5sum docker-compose.yml)
resource_group_name="grpc-${compose_hash:27:4}"
environment_name="grpc-${compose_hash:0:4}"

az group create --name $resource_group_name --location eastus
export TAG=main
az containerapp compose create \
    --environment  $environment_name \
    --resource-group $resource_group_name \
    --transport backend=http2 

URL=$(az containerapp show --resource-group $resource_group_name --name frontend --query 'properties.configuration.ingress.fqdn' -o tsv)
curl -s https://$URL/hello

az group delete --name $resource_group_name --yes
```
