require('dotenv').config();

const {client, getAllLinks, createLink, createInitialLink} = require('./data_layer');

const express = require("express");
const path = require("path");

const { sync } = require("./data_layer/index");
const { nextTick } = require('process');
const { Server } = require('http');

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || false;

const app = express();

app.use(express.static(path.join(__dirname, "build")));

const apiRouter = require('./api');
app.use('/api', apiRouter);

const startServer = new Promise((resolve) => {
  app.listen(PORT, () => {
    console.log("The server is listening on port", PORT)
    resolve();
  });
});

sync(FORCE)
  .then(startServer)
  // .then(createInitialLink())
  .catch((error) => {
    console.error(`YIKES: ${error.toString()}`);
  });
