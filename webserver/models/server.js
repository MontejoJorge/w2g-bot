const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.app.use(cookieParser(process.env.SECRET_KEY));
        this.port = process.env.PORT || 3000

        this.app.set('view engine', 'ejs');
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.use(express.static(path.join(__dirname, "../public")));

        this.app.use(session({
            name: 'session',
            resave: false,
            saveUninitialized: true,
            secret: process.env.SECRET_KEY,
            cookie: {
                maxAge: 28800000, //8h
            }
        }));

        this.conectDB();

        this.middlewares();

        this.routes();

    }

    async conectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(flash());

        //Expose flash to all views
        this.app.use((req, res, next) => {
            res.locals.successfull = req.flash("successfull");
            res.locals.error = req.flash("error");
            next();
        })

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

    }

    routes() {
        this.app.use("/", require("../routes/index"));

        this.app.use("/home", require("../routes/home"));

        this.app.use("/dashboard", require("../routes/dashboard"))

        this.app.use("/login", require("../routes/login"));

        this.app.use("/logout", require("../routes/logout"));

        this.app.use("/auth", require("../routes/auth"));

        this.app.use("/api", require("../routes/api"));

        this.app.use("*", function(req, res) {
            res.status(404);
            return res.render("error", {
                code: 404,
                msg: "Not Found"
            });
        })

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server runing on: ${process.env.BASE_URL}:${this.port}`);
        })
    }

}

module.exports = Server;