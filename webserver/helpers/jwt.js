const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
   return new Promise((resolve, reject) => {
      const payload = { id };

      jwt.sign(
         payload,
         process.env.SECRET_KEY,
         {
            expiresIn: '8h',
         },
         (err, token) => {
            if (err) {
               console.log(err);
               reject('There was an error generating the token');
            } else {
               resolve(token);
            }
         }
      );
   });
};

module.exports = {
   generateJWT,
};
