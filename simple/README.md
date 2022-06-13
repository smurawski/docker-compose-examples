# Simple Example

## Create Azure Container Apps Environment

```azurecli
compose_hash=$(md5sum docker-compose.yml)
resource_group_name="simple-${compose_hash:27:4}"
environment_name="simple-${compose_hash:0:4}"

az group create --name $resource_group_name --location eastus
az containerapp compose create --environment $environment_name  --resource-group $resource_group_name

URL=$(az containerapp show --resource-group $resource_group_name --name helloworld --query 'properties.configuration.ingress.fqdn' -o tsv)
curl https://$URL

az group delete --name $resource_group_name --yes
```
