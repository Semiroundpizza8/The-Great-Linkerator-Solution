const express = require("express");
const path = require("path");

const { sync } = require("./data_layer/index");

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || false;

const app = express();

console.log(__dirname);

app.use(express.static(path.join(__dirname, "dist")));

// ["create"].forEach((route) => {
//   app.get(`/${route}`, (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// });

app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const startServer = new Promise((resolve) => {
  app.listen(PORT, () => {
    resolve();
  });
});

sync(FORCE)
  .then(startServer)
  .catch((error) => {
    console.error(`YIKES: ${error.toString()}`);
  });
