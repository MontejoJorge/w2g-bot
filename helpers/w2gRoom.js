const fetch = require('node-fetch');

const w2gApi = process.env.W2G_API_KEY;

function w2gRoom(message, videoLink) {
    fetch("https://w2g.tv/rooms/create.json", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "w2g_api_key": w2gApi,
            "share": videoLink,
            "bg_color": "#404040",
            "bg_opacity": "100"
        })
    })
        .then(response => response.json())
        .then(function (data) {
            message.delete();
            message.channel.send(`W2G: Here is your room, ${message.author}! \n https://w2g.tv/rooms/${data.streamkey}`);
        });
}

module.exports = {
    w2gRoom
}