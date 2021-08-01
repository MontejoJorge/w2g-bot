const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Database ready!");
        
    } catch (error) {
        console.log(error);
        throw new Error("Error al connectar con la base de datos")
    }


}

module.exports = {
    dbConnection,
}