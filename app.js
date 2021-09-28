require("./helpers/dev-prod");
require("./bot");

const Server = require("./webserver/models/server");
const server = new Server;
server.listen();