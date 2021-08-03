require("./bot");

const Server = require("./webserver/backend/models/server");

const server = new Server();

server.listen();