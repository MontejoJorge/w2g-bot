const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.app.use(cookieParser(process.env.SECRET_KEY));
        this.port = process.env.PORT || 3000

        this.app.set('view engine', 'ejs');
        this.app.set("views", path.join(__dirname, "../views"))

        this.routes();

        this.conectDB();

        this.middlewares();
    }

    async conectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());
    }

    routes() {
        this.app.get("/", function (req, res) {
            res.render("index");
        });

        this.app.use("/home", require("../routes/home"));

        this.app.get("/login", (req, res) => {
            const oauth2 = new URL("https://discord.com/api/oauth2/authorize");

            oauth2.searchParams.append("client_id", process.env.DISCORD_CLIENT_ID);
            oauth2.searchParams.append("redirect_uri", req.protocol + '://' + req.get('host') + "/auth/callback");
            oauth2.searchParams.append("response_type", "code");
            oauth2.searchParams.append("scope", "identify email");

            res.redirect(oauth2);
        });

        this.app.use("/auth", require("../routes/auth"));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server runing on: ${process.env.BASE_URL}:${this.port}`);
        })
    }

}

module.exports = Server;