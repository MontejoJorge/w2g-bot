const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { dbConnection } = require('../../../database/config');
const path = require('path');
const hbs = require('hbs');
const passport = require('../helpers/passport');
const history = require('connect-history-api-fallback');



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
        
        this.discordAuthPath = "/api/auth/discord";
        this.dashboardPath = "/api/dashboard";
        
        
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

        //rutas
        this.routes();
        this.app.use(history());
        
        this.app.use(express.static(path.join(__dirname, '../../frontend/public')));
        
        //Conectar base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();
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

        this.app.use(this.discordAuthPath, require("../routes/auth"));

        this.app.use(this.dashboardPath, require("../routes/dashboard"));

        // this.app.get(routes.logout, function (req, res) {
        //     req.logout();
        //     res.redirect(routes.home);
        // });

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto ", this.port);
        });
    }

}

module.exports = Server;