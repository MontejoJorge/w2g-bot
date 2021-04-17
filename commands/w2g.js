const { w2gRoom } = require("../helpers/w2gRoom");

module.exports = {
    name: 'w2g',
    description: 'Creates an empty room or a room with a video. If the video is not specified, an empty room will be created.',
    usage: "[video link]",
    execute(message, args) {

        const videoLink = args[0];

        w2gRoom(message, videoLink);
    },
};