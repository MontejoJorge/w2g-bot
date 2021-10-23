const router = require('express').Router();

router.get('/', function (req, res) {
   res.clearCookie('token');

   return res.redirect('/');
});

module.exports = router;
