const jwt = require('jsonwebtoken');
const User = require('../models/user');

const needAuth = (needAuth) => {
   return async (req, res, next) => {
      res.locals.user = '';

      const { token } = req.signedCookies;

      if (!token && needAuth) {
         return res.redirect('/login');
      }

      try {
         if (token) {
            const { id } = jwt.verify(token, process.env.SECRET_KEY);

            const user = await User.findOne({ discordId: id });

            if ((!user || !user.enabled) && needAuth) {
               return res.redirect('/login');
            }

            req.user = user;
            res.locals.user = user;
         }
      } catch (error) {
         console.error(error);

         return res.redirect('/login');
      }

      next();
   };
};

const hasRole = (roles) => {
   return async function (req, res, next) {
      const user = await User.findById(req.user.id);
      if (!user || !roles.includes(user.role)) {
         res.status(403);
         return res.render('error', {
            code: 403,
            msg: 'Forbidden',
         });
      }
      next();
   };
};

module.exports = {
   needAuth,
   hasRole,
};
