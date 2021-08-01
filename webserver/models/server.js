const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../../database/config');
const path = require('path');
var hbs = require('hbs');

hbs.registerPartials('./webserver/views/templates', function (err) {});

const routes = {
    home: "/",
    login: "/login",
}

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.app.set('views', path.join("./webserver/views"));
        this.app.set('view engine', 'hbs');

        //Conectar base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB() {
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
                urls
            });
        });

        this.app.get(routes.login, function (req, res) {
            res.send('Login');
        });

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto ", this.port);
        });
    }

}

module.exports = Server;