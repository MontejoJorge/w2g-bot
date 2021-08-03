const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { dbConnection } = require('../../../database/config');
const path = require('path');
const hbs = require('hbs');
const passport = require('../helpers/passport');


hbs.registerPartials('./webserver/views/templates', function (err) { });


const routes = {
    home: "/",
    login: "/login",
    logout: "/logout",
    dashboard: "/dashboard"
}

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.app.set('views', path.join("./webserver/views"));
        this.app.set('view engine', 'hbs');

        this.app.use(session({
            secret: process.env.SECRET_KEY,
            name: 'sessionId',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use(express.static(path.join(__dirname, '../../frontend/public')));


        //Conectar base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parse del body
        this.app.use(express.json());

    }

    routes() {

        this.app.get(routes.home, function (req, res) {

            const urls = routes;

            res.render("index", {
                urls,
                loged: req.isAuthenticated()
            });
        });

        this.app.get(routes.login, passport.authenticate('discord'), function (req, res) { });

        this.app.get('/callback',
            passport.authenticate('discord', { failureRedirect: '/' }), function (req, res) { res.redirect(routes.dashboard) }
        );

        this.app.get(routes.logout, function (req, res) {
            req.logout();
            res.redirect(routes.home);
        });

        this.app.get(routes.dashboard, checkAuth, function (req, res) {
            res.json(req.user);
        });
        
        function checkAuth(req, res, next) {
            if (req.isAuthenticated()) return next();
            res.redirect(routes.login);
        }

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto ", this.port);
        });
    }

}

module.exports = Server;