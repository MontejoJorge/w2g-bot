const fetch = require('node-fetch');

async function w2gRoom(videoLink = '') {
   const res = await fetch('https://w2g.tv/rooms/create.json', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         w2g_api_key: process.env.W2G_API_KEY,
         share: videoLink,
         bg_color: '#404040',
         bg_opacity: '100',
      }),
   }).then((response) => {
      return response.json();
   });

   return `https://w2g.tv/rooms/${res.streamkey}`;
}

module.exports = {
   w2gRoom,
};
