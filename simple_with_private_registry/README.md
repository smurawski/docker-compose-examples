# Simple Example

## Create Azure Container Apps Environment

```azurecli
tag="latest"
repository="containerapps-helloworld"
image_name ="$repository:$tag"
source_image="mcr.microsoft.com/azuredocs/$image_name"
compose_hash=$(md5sum docker-compose.yml)
resource_group_name="simple-${compose_hash:27:4}"
environment_name="simple-${compose_hash:0:4}"
acr_name="simpleacr${compose_hash:0:4}"

az group create --name $resource_group_name --location eastus
export ACR_LOGIN_SERVER=$(az acr create --resource-group $resource_group_name --name $acr_name --sku Basic --query loginServer --output tsv)
az acr import --name $acr_name --source $source_image --image $image_name
az acr update --name $acr_name --admin-enabled 
password=$(az acr credential show --name $acr_name --query 'passwords[0].value' -o tsv)

az containerapp compose create --environment $environment_name \
                               --resource-group $resource_group_name \
                               --registry-server $ACR_LOGIN_SERVER \
                               --registry-username $acr_name \
                               --registry-password $password 

URL=$(az containerapp show --resource-group $resource_group_name --name helloworld --query 'properties.configuration.ingress.fqdn' -o tsv)
curl https://$URL

az group delete --name $resource_group_name --yes
```
