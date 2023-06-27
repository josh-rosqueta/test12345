const express = require("express");
const cors = require("cors");
const middlewares = require("middlewares");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const server = express();

const PORT = process.env.PORT || 8081;

server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(middlewares);
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

server.listen(PORT, async () => {
  console.log("Server is running on port", PORT);
});