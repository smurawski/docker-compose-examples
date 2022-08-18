set -e

compose_hash=$(md5sum docker-compose.yml)

# az extension add --name containerapp --upgrade --yes --version 0.3.9

basename=cc39
location=canadacentral
resource_group_name="${basename}-${compose_hash:27:4}"
environment_name="${basename}-${compose_hash:0:4}"

# az group create --name $resource_group_name --location $location
# az containerapp compose create --environment $environment_name  --resource-group $resource_group_name --location canadacentral
az group delete --name $resource_group_name --no-wait --yes

basename=east39
location=eastus
resource_group_name="${basename}-${compose_hash:27:4}"
environment_name="${basename}-${compose_hash:0:4}"

# az group create --name $resource_group_name --location $location
# az containerapp compose create --environment $environment_name  --resource-group $resource_group_name --location canadacentral
az group delete --name $resource_group_name --no-wait --yes

az extension add --name containerapp --upgrade --yes --version 0.3.8

basename=cc38
location=canadacentral
resource_group_name="${basename}-${compose_hash:27:4}"
environment_name="${basename}-${compose_hash:0:4}"

# az group create --name $resource_group_name --location $location
# az containerapp compose create --environment $environment_name  --resource-group $resource_group_name --location canadacentral
az group delete --name $resource_group_name --no-wait --yes

basename=east38
location=eastus
resource_group_name="${basename}-${compose_hash:27:4}"
environment_name="${basename}-${compose_hash:0:4}"

# az group create --name $resource_group_name --location $location
# az containerapp compose create --environment $environment_name  --resource-group $resource_group_name --location canadacentral
az group delete --name $resource_group_name --no-wait --yes