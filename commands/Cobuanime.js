const axios = require("axios");
const { xforcemd } = require("../framework/xforcemd");
const translate = require("../framework/translation");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

xforcemd({
  nomCom: "ranime",
  categorie: "Fun",
  reaction: "📺"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Replace with your JSON URL

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const translatedText = await translate(synopsis, { to: 'en' });

    const message = `📺 Title: ${title}\n🎬 Episodes: ${episodes}\n📡 Status: ${status}\n📝 Synopsis: ${translatedText}\n🔗 URL: ${data.url}`;

    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error fetching data from JSON:', error);
    repondre('Error fetching data from JSON.');
  }
});

// Repeat this for other `zokou` commands within the file
                   
