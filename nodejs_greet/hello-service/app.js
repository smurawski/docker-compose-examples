const express = require("express");
const app = express();

app.get("/sayHello", (_, res) => {
  let hello = "";
  for (const letter of "hello") {
    const isUpperCase = Math.round(Math.random());
    hello += isUpperCase ? letter.toUpperCase() : letter;
  }
  console.log(`Sending: ${hello}`);
  res.send(hello);
});

const port = process.env.HELLO_SERVICE_PORT || 8088;
app.listen(port, () => console.log(`Listening on port ${port}`));
