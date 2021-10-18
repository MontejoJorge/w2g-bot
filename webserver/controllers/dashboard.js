const client = require('../../bot');
const Activity = require('../models/activity');
const TwitchWebhook = require('../models/twitchWebhook');

const presenceGet = async (req, res) => {
   const activities = await Activity.find({}, '-_id -__v');

   res.render('presence', {
      activities,
   });
};

const announcementGet = (req, res) => {
   res.render('announcement');
};

const suggestionGet = (req, res) => {
   res.render('suggestion');
};

const twitchGet = async (req, res) => {
   const notification = await TwitchWebhook.findOne({ user: req.user._id });

   if (notification) {
      var guild = client.guilds.cache.find(
         (guild) => guild.id == notification.guild_id
      );

      var channel = guild.channels.cache.find(
         (channel) => channel.id == notification.channel_id
      );
   }

   res.render('twitch', {
      notification,
      guild_name: guild ? guild.name : '',
      channel_name: channel ? channel.name : '',
   });
};

module.exports = {
   presenceGet,
   announcementGet,
   suggestionGet,
   twitchGet,
};
