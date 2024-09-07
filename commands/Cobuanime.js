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

xforcemd({
  nomCom: "google",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;
  
  if (!arg[0] || arg === "") {
    repondre("Provide a query.\n*Example: .google Who is Suhail Tech.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Google search results for: ${arg}\n\n`;

    for (let result of results) {
      msg += `➣ Title: ${result.title}\n`;
      msg += `➣ Description: ${result.snippet}\n`;
      msg += `➣ Link: ${result.link}\n\n────────────────────────\n\n`;
    }

    const translatedMsg = await translate(msg, { to: 'en' });
    repondre(translatedMsg);
  } catch (error) {
    repondre("An error occurred during the Google search.");
  }
});

xforcemd({
  nomCom: "imdb",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("Please provide a series or movie name.");
    return;
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ```IMDB SEARCH```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += "🎬Title      : " + imdbData.Title + "\n";
    imdbInfo += "📅Year       : " + imdbData.Year + "\n";
    imdbInfo += "⭐Rating     : " + imdbData.Rated + "\n";
    imdbInfo += "📆Released  : " + imdbData.Released + "\n";
    imdbInfo += "⏳Duration   : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director  : " + imdbData.Director + "\n";
    imdbInfo += "✍Writer     : " + imdbData.Writer + "\n";
    imdbInfo += "👨Actors    : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Country   : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards    : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟Rating : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎Votes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: await translate(imdbInfo, { to: 'en' }),
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred during the IMDb search.");
  }
});

xforcemd({
  nomCom: "emomix",
  categorie: "Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect usage. Example: .emojimix 😀;🥰");
    return;
  }

  const emojis = arg.join(' ').split(';');

  if (emojis.length !== 2) {
    repondre("Please specify two emojis separated by a semicolon.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      let stickerMess = new Sticker(response.data.result, {
        pack: nomAuteurMessage,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

    } else {
      repondre("Unable to create the emoji mix.");
    }
  } catch (error) {
    repondre("An error occurred while creating the emoji mix: " + error );
  }
});
