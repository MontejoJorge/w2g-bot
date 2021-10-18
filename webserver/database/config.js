const mongoose = require('mongoose');
const Role = require('../models/role');

const dbConnection = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_CNN);

      console.log('Database ready!');

      Role.find({}).then((roles) => {
         if (roles.length <= 0) {
            Role.create([
               {
                  name: 'user',
               },
               {
                  name: 'admin',
               },
            ]);
         }
      });
   } catch (error) {
      console.error(error);
      throw new Error('Error connecting to database');
   }
};

module.exports = {
   dbConnection,
};
