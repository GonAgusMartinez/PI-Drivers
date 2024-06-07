const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("../server/src/db");
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

sequelize.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('Server listening on port 3001');
  });
});

module.exports = server;