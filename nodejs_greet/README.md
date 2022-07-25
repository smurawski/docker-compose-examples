# NodeJS "Hello, World!" Greeting Microservice

This example app is inspired by services demonstrated in the book [Introducing Distributed Application Runtime (Dapr): Simplifying Microservices Applications Development Through Proven and Reusable Patterns and Practices](https://www.amazon.com/Introducing-Distributed-Application-Runtime-Dapr/dp/1484269977)

Code samples are found [here](https://github.com/Apress/introducing-dapr)

## Create Azure Container Apps Environment

```azurecli
compose_hash=$(md5sum docker-compose.yml)
resource_group_name="nodejs-${compose_hash:27:4}"
environment_name="nodejs-${compose_hash:0:4}"

az group create --name $resource_group_name --location eastus
az containerapp compose create \
    --environment  $environment_name \
    --resource-group $resource_group_name

URL=$(az containerapp show --resource-group $resource_group_name --name greeting-service --query 'properties.configuration.ingress.fqdn' -o tsv)
curl https://$URL/greet

az group delete --name $resource_group_name -y --no-wait
```

## How it works

This repo contains three microservices using ExpressJS. The `hello-service` will return the text `Hello` in random casing (upper and lower case). The `world-service` will return the word `World` in various languages (it randomizes the return output so we get a new language each time).

The two services are intended to be accessible only from within the internal environment and "fronted" by the `greeting-service` (which is the only service accessible to the outside). This service will make calls to the `hello-service` and the `world-service` and the responses are concatenated to form the "Hello, World" response.

The `docker-compose.yml` file includes each of the 3 services mentioned above. To ensure the `hello-service` and `world-service` are exposed as internal-only services, the `expose` spec is used to expose port 80 within the Azure Container App environment. Both the `hello-service` and `world-service` services will be exposed over port 80 and both will have an internal DNS name prefixes that begins with `https://hello-service.internal` and `https://world-service.internal` respectively.

> At the moment, Azure Container Apps can only expose HTTP/S services via Ingress.

The internal ingress of the `hello-service` and `world-service` ingress are passed to the `greeting-service` as environment variables within the `docker-compose.yml` file. All container apps within a Container App environment resource will have the same DNS suffix, and this will be available as an environment variable in all container apps. The `greeting-service` app uses these environment variables to build the URIs of the `hello` and `world` services and makes a call for each (see the greeting-service/app.js file for details).

> Normally, this type of architecture is best suited for Dapr integration but the goal here is to illustrate how internal services can be reached within a Azure Container App environment.

The default behavior of the `containerapp-compose` extension is to deploy container apps that will scale to 0. To change this behavior, the `deploy.replicas` spec has been set to `1` to ensure there will always be one running instance of each container app.