const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/songs", require("./songs/songs-router"));

server.use((err, req, res, next /*eslint-disable-line*/) => {
  res.status(res.status || 500).json({
    note: "Houston, we have a problem....",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
