const {
   presencePost,
   announcementPost,
   suggestionPost,
   twitchPost,
   twitchDelete,
} = require('../controllers/api');
const { needAuth, hasRole } = require('../middlewares/auth');
const {
   presenceValidator,
   announcementValidator,
   suggestionValidator,
   twitchValidator,
} = require('../middlewares/api/validators');

const router = require('express').Router();
const { check } = require('express-validator');

router.use('/', needAuth(true));

router.post('/presence', [hasRole(['admin']), presenceValidator], presencePost);

router.post(
   '/announcement',
   [hasRole(['admin']), announcementValidator],
   announcementPost
);

router.post('/suggestion', [suggestionValidator], suggestionPost);

router.post(
   '/twitch',
   [
      check('guild_id').isNumeric(),
      check('channel_id').isNumeric(),
      check('message').isString(),
      check('url').isURL(),
      twitchValidator,
   ],
   twitchPost
);

router.delete('/twitch', twitchDelete);

module.exports = router;
