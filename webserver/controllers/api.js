const { announcement } = require('../../helpers/announcement');
const { setBotPresence } = require('../../helpers/botPresence');
const Activity = require('../models/activity');
const Suggestion = require('../models/suggestion');
const TwitchWebhook = require('../models/twitchWebhook');

const axios = require('axios');

const presencePost = async (req, res) => {
   await Activity.deleteMany({});

   await Activity.insertMany(req.activities)
      .then(req.flash('successfull', 'Operation completed successfully.'))
      .catch((err) => {
         req.flash('error', 'Error: Something went wrong.');
         console.error(err);
      });

   setBotPresence(req.activities);

   res.redirect('back');
};

const announcementPost = (req, res) => {
   announcement(req.body.announcementText);

   req.flash('successfull', 'Operation completed successfully.');
   return res.redirect('back');
};

const suggestionPost = async (req, res) => {
   await Suggestion.create({
      text: req.body.suggestionText,
      user: req.user.id,
   })
      .then(req.flash('successfull', 'Operation completed successfully.'))
      .catch((err) => {
         req.flash('error', 'Error: Something went wrong.');
         console.error(err);
      });

   res.redirect('back');
};

const twitchPost = async (req, res) => {
   if (req.body.message.length > 100) {
      req.flash('error', 'The message cannot be longer than 100 characters');
      return res.redirect('back');
   }

   const client = require('../../bot');

   const guild = client.guilds.cache.find(
      (guild) => guild.id == req.body.guild_id
   );

   if (!guild) {
      req.flash('error', 'Server ID not found.');
      return res.redirect('back');
   }

   const channel = guild.channels.cache.find(
      (channel) => channel.id == req.body.channel_id
   );

   if (!channel) {
      req.flash('error', 'Channel ID not found.');
      return res.redirect('back');
   }

   try {
      const webhook = await TwitchWebhook.findOne({
         type: 'stream.online',
         url: req.body.url,
      });

      if (webhook) {
         req.flash('error', 'Error: That channel already has a notification.');
         return res.redirect('back');
      }

      const twitchInstance = axios.create({
         headers: {
            Authorization: `Bearer ${process.env.TWITCH_CLIENT_SECRET}`,
            'Client-Id': `${process.env.TWITCH_CLIENT_ID}`,
         },
      });

      await twitchInstance
         .get(
            `https://api.twitch.tv/helix/users?login=${req.body.url.replace(
               'https://www.twitch.tv/',
               ''
            )}`
         )
         .then(async (data) => {
            const broadcaster_user_id = data.data.data[0].id;

            await twitchInstance
               .post('https://api.twitch.tv/helix/eventsub/subscriptions', {
                  type: 'stream.online',
                  version: '1',
                  condition: {
                     broadcaster_user_id,
                  },
                  transport: {
                     method: 'webhook',
                     callback:
                        (process.env.BASE_URL || 'https://better-bot.com') +
                        '/webhooks/twitch/callback',
                     secret: process.env.SECRET_KEY,
                  },
               })
               .then((resp) => {
                  if (
                     resp.data.data[0].status ==
                     'webhook_callback_verification_pending'
                  ) {
                     TwitchWebhook.create({
                        user: req.user._id,
                        id: resp.data.data[0].id,
                        type: resp.data.data[0].type,
                        url: req.body.url,
                        broadcaster_user_id,
                        profile_image_url: data.data.data[0].profile_image_url,
                        guild_id: req.body.guild_id,
                        channel_id: req.body.channel_id,
                        message: req.body.message,
                     });

                     req.flash(
                        'successfull',
                        'Operation completed successfully.'
                     );
                     return res.redirect('back');
                  }
               });
         });
   } catch (error) {
      console.error(error);
      req.flash('error', 'Error: Something went wrong.');
      return res.redirect('back');
   }
};

const twitchDelete = async (req, res) => {
   await TwitchWebhook.deleteOne({
      id: req.body.notification_id,
      user: req.user._id,
   })
      .then((response) => {
         if (response.deletedCount != 1) return;

         axios.delete('https://api.twitch.tv/helix/eventsub/subscriptions', {
            params: {
               id: req.body.notification_id,
            },
            headers: {
               Authorization: `Bearer ${process.env.TWITCH_CLIENT_SECRET}`,
               'Client-Id': `${process.env.TWITCH_CLIENT_ID}`,
            },
         });

         req.flash('successfull', 'Operation completed successfully.');
         return res.redirect('back');
      })
      .catch((err) => {
         req.flash('error', 'Error: Something went wrong.');
         res.redirect('back');
      });
};

module.exports = {
   presencePost,
   announcementPost,
   suggestionPost,
   twitchPost,
   twitchDelete,
};
