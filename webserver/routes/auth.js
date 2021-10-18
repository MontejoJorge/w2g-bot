const { discordLogin } = require('../controllers/auth');
const router = require('express').Router();

router.get('/callback', discordLogin);

module.exports = router;
