const express = require("express");
const app = express();

const worldTranslations = ["world",
    "свят", "svijet", "svět", "świat", "мир", "свет", "світ", "svet", "svetu",
    "lume", "verden", "wereld", "värld", "pasaulē", "pasaulyje", "mondo", "monde", "mundo",
    "العالمية", "世界", "세계", "विश्व", "বিশ্ব", "โลก"];

app.get("/sayWorld", (_, res) => {
  const index = Math.floor(Math.random() * worldTranslations.length);
  const world = worldTranslations[index];
  console.log(`Sending: ${world}`);
  res.send(world);
});

const port = process.env.WORLD_SERVICE_PORT || 8089;
app.listen(port, () => console.log(`Listening on port ${port}`));
