const express = require("express");
const fetch = require("node-fetch");

const app = express();

const helloHost = `${process.env.HELLO_SERVICE_HOST_PREFIX}.${process.env.CONTAINER_APP_ENV_DNS_SUFFIX}`;
const worldHost = `${process.env.WORLD_SERVICE_HOST_PREFIX}.${process.env.CONTAINER_APP_ENV_DNS_SUFFIX}`;

const invokeHello = `${helloHost}/sayHello`;
const invokeWorld = `${worldHost}/sayWorld`;

app.get("/greet", async (_, res) => {
  hello = await fetch(invokeHello);
  world = await fetch(invokeWorld);
  const greeting = (await hello.text()) + " " + (await world.text());
  console.log(`Sending: ${greeting}`);
  res.send(greeting);
});

const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`Listening on port ${port}`));
