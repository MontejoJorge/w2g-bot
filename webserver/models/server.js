const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { dbConnection } = require('../../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = 80;

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(bodyParser.urlencoded({extended: false}));

        //CORS
        this.app.use(cors());

        // Lectura y parse del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("webserver/public"));

    }

    routes() {

        this.app.post('/form', function (req, res) {

            let sql = `INSERT INTO survey (Text) VALUES ('${req.body.textarea}')`;
            dbConnection.query(sql);

            res.send('Form submited');
        })

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto ", this.port);
        });
    }

}

module.exports = Server;