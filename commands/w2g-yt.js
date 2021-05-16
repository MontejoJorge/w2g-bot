var search = require('youtube-search');
const { w2gRoom } = require('../helpers/w2gRoom');

const { YOUTUBE_API_KEY } = require('../config.json');


module.exports = {
    name: 'w2g-yt',
    description: 'Search for a video on Youtube and create a w2g.tv room with that video.',
    usage: "[video name]",
    execute(message, args) {

        var opts = {
            maxResults: 1,
            type: "video",
            key: YOUTUBE_API_KEY
        };

        const searchTerm = args.join(" ");

        console.log(searchTerm);

        search(searchTerm, opts, function (err, results) {
            if (err) return console.log(err);

            const link = results[0].link;

            w2gRoom(message, link);

        });

    },
};