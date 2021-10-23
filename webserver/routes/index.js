const getBotLink = require('../../helpers/inviteLink');
const { needAuth } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', needAuth(false), function (req, res) {
   res.render('index', {
      botLink: getBotLink(),
      loginLink: '/login',
      suggestionLink: '/dashboard/suggestion',
   });
});

module.exports = router;
