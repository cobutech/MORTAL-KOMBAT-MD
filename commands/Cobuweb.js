const axios = require('axios');
const fs = require('fs');
const { xforcemd } = require("../framework/zokou");
const { writeFile } = require('fs/promises');

// waifu command
xforcemd({
  commandName: "waifu",
  category: "Weeb",
  reaction: "😏"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.waifu.pics/sfw/waifu';

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    respond('Error while fetching waifu images:', error);
  }
});

// neko command
xforcemd({
  commandName: "neko",
  category: "Weeb",
  reaction: "😺"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.waifu.pics/sfw/neko';

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    respond('Error while fetching neko images:', error);
  }
});

// shinobu command
xforcemd({
  commandName: "shinobu",
  category: "Weeb",
  reaction: "🦋"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.waifu.pics/sfw/shinobu';

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    respond('Error while fetching Shinobu images:', error);
  }
});

// megumin command
xforcemd({
  commandName: "megumin",
  category: "Weeb",
  reaction: "💥"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.waifu.pics/sfw/megumin';

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    respond('Error while fetching Megumin images:', error);
  }
});

// cosplay command
xforcemd({
  commandName: "cosplay",
  category: "Weeb",
  reaction: "😏"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  try {
    for (let i = 0; i < 5; i++) {
      let url = 'https://fantox-cosplay-api.onrender.com/';
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const image = response.data;
      await writeFile('./cosplay.jpg', image);

      zk.sendMessage(origineMessage, { image: { url: './cosplay.jpg' } }, { quoted: ms });
    }
  } catch (error) {
    respond("Error while fetching cosplay images:", error);
  }
});

// couplepp command
xforcemd({
  commandName: "couplepp",
  category: "Weeb",
  reaction: "💞"
}, async (dest, zk, commandOptions) => {
  const { respond, ms } = commandOptions;
  const api = 'https://smiling-hosiery-bear.cyclic.app/weeb/couplepp';

  try {
    respond("Fetching couple profile pictures...");

    const result = await axios.get(api);
    zk.sendMessage(dest, { image: { url: result.data.male }, caption: `_For him_` }, { quoted: ms });
    zk.sendMessage(dest, { image: { url: result.data.female }, caption: `_For her_` }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching couple profile pictures:", error);
  }
});

// anime quote command (New)
xforcemd({
  commandName: "animequote",
  category: "Weeb",
  reaction: "🎌"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://animechan.vercel.app/api/random';

  try {
    const response = await axios.get(url);
    const quote = response.data;

    zk.sendMessage(origineMessage, { text: `*"${quote.quote}"*\n- ${quote.character} (${quote.anime})` }, { quoted: ms });
  } catch (error) {
    respond("Error fetching anime quote:", error);
  }
});

// anime trivia command (New)
xforcemd({
  commandName: "animetrivia",
  category: "Weeb",
  reaction: "🤓"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const trivia = [
    "Did you know? The anime series 'One Piece' has over 1000 episodes!",
    "Attack on Titan was inspired by Hajime Isayama's childhood experience.",
    "Naruto's character design was influenced by ramen, the favorite dish of the creator Masashi Kishimoto.",
    "Studio Ghibli’s Spirited Away won the Academy Award for Best Animated Feature in 2003.",
    "The longest-running anime series is Sazae-san, with over 7,000 episodes!"
  ];

  try {
    const randomTrivia = trivia[Math.floor(Math.random() * trivia.length)];
    zk.sendMessage(origineMessage, { text: randomTrivia }, { quoted: ms });
  } catch (error) {
    respond("Error fetching anime trivia:", error);
  }
});
    // anime recommendation command (New)
xforcemd({
  commandName: "animerec",
  category: "Weeb",
  reaction: "🎥"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.jikan.moe/v4/recommendations/anime';

  try {
    const response = await axios.get(url);
    const recommendations = response.data.data.slice(0, 5); // Get the first 5 recommendations

    let recommendationText = "Here are some anime recommendations for you:\n";
    recommendations.forEach((anime, index) => {
      recommendationText += `${index + 1}. ${anime.title} - ${anime.recommendation_count} recommendations\n`;
    });

    zk.sendMessage(origineMessage, { text: recommendationText }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching anime recommendations:", error);
  }
});

// anime character search command (New)
xforcemd({
  commandName: "charsearch",
  category: "Weeb",
  reaction: "🎎"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, arg, ms } = commandOptions;

  if (!arg || arg.length === 0) {
    return respond("Please provide the name of the anime character you want to search for.");
  }

  const characterName = arg.join(' ');
  const url = `https://api.jikan.moe/v4/characters?q=${characterName}&limit=1`;

  try {
    const response = await axios.get(url);
    const character = response.data.data[0];

    if (character) {
      const characterInfo = `Found: *${character.name}*\n\nAnime: ${character.anime[0].name}\nManga: ${character.manga[0].name || "N/A"}\nFavorites: ${character.favorites}`;
      zk.sendMessage(origineMessage, { text: characterInfo }, { quoted: ms });
    } else {
      respond(`No character found with the name "${characterName}".`);
    }
  } catch (error) {
    respond("Error while searching for the character:", error);
  }
});

// anime meme command (New)
xforcemd({
  commandName: "animememe",
  category: "Weeb",
  reaction: "😂"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.imgflip.com/get_memes';

  try {
    const response = await axios.get(url);
    const memes = response.data.data.memes.filter(meme => meme.name.toLowerCase().includes('anime')).slice(0, 5);

    for (let meme of memes) {
      zk.sendMessage(origineMessage, { image: { url: meme.url }, caption: meme.name }, { quoted: ms });
    }
  } catch (error) {
    respond("Error while fetching anime memes:", error);
  }
});

// anime news command (New)
xforcemd({
  commandName: "animenews",
  category: "Weeb",
  reaction: "📰"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.jikan.moe/v4/news/anime';

  try {
    const response = await axios.get(url);
    const newsList = response.data.data.slice(0, 5); // Get the first 5 news articles

    let newsText = "Latest Anime News:\n";
    newsList.forEach((news, index) => {
      newsText += `${index + 1}. ${news.title}\nSource: ${news.source}\nPublished: ${news.date}\n\n`;
    });

    zk.sendMessage(origineMessage, { text: newsText }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching anime news:", error);
  }
});

// random anime fact command (New)
xforcemd({
  commandName: "animefact",
  category: "Weeb",
  reaction: "📚"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const animeFacts = [
    "The longest-running anime series, Sazae-san, began in 1969 and still continues today!",
    "Naruto's iconic headband was designed to make animation easier by avoiding the need to draw complex goggles in every scene.",
    "The word 'anime' is an abbreviation of 'animation' in Japanese.",
    "One Piece is one of the highest-grossing media franchises in history, surpassing even major Western franchises!",
    "The anime industry in Japan is estimated to be worth over 20 billion USD annually."
  ];

  try {
    const randomFact = animeFacts[Math.floor(Math.random() * animeFacts.length)];
    zk.sendMessage(origineMessage, { text: randomFact }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching an anime fact:", error);
  }
});
   // waifu of the day command (New)
xforcemd({
  commandName: "waifuofday",
  category: "Weeb",
  reaction: "💖"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://api.waifu.pics/sfw/waifu';

  try {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: "Your Waifu of the Day 💖" }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching Waifu of the Day:", error);
  }
});

// anime battle command (New)
xforcemd({
  commandName: "animebattle",
  category: "Weeb",
  reaction: "⚔️"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, arg, ms } = commandOptions;

  if (!arg || arg.length < 2) {
    return respond("Please provide the names of two anime characters to battle!");
  }

  const [character1, character2] = arg;
  const battleOutcomes = [
    `${character1} unleashes a devastating attack and defeats ${character2}!`,
    `${character2} dodges all attacks and claims victory over ${character1}!`,
    `${character1} and ${character2} fight fiercely, but it's a draw!`,
    `${character1} surprises ${character2} with an unexpected technique and wins the battle!`,
    `${character2} uses ultimate power and defeats ${character1} in an epic showdown!`
  ];

  const randomOutcome = battleOutcomes[Math.floor(Math.random() * battleOutcomes.length)];
  zk.sendMessage(origineMessage, { text: randomOutcome }, { quoted: ms });
});

// anime playlist command (New)
xforcemd({
  commandName: "animeplaylist",
  category: "Weeb",
  reaction: "🎶"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const playlists = [
    { title: "Chill Anime Vibes", url: "https://open.spotify.com/playlist/chill-anime-vibes" },
    { title: "Epic Anime OST", url: "https://open.spotify.com/playlist/epic-anime-ost" },
    { title: "Sad Anime Songs", url: "https://open.spotify.com/playlist/sad-anime-songs" },
    { title: "Anime Opening Themes", url: "https://open.spotify.com/playlist/anime-opening-themes" },
    { title: "Anime Lo-Fi Beats", url: "https://open.spotify.com/playlist/anime-lofi-beats" }
  ];

  try {
    let playlistText = "Here's an anime playlist for you:\n";
    const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
    playlistText += `${randomPlaylist.title}\n${randomPlaylist.url}`;

    zk.sendMessage(origineMessage, { text: playlistText }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching anime playlist:", error);
  }
});

// anime quiz command (New)
xforcemd({
  commandName: "animequiz",
  category: "Weeb",
  reaction: "🧠"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const quizQuestions = [
    { question: "What year did the anime 'Naruto' first air?", answer: "2002" },
    { question: "Who is the main protagonist in 'Attack on Titan'?", answer: "Eren Yeager" },
    { question: "What is the name of the school in 'My Hero Academia'?", answer: "U.A. High School" },
    { question: "Which anime features a character named Light Yagami?", answer: "Death Note" },
    { question: "In 'Dragon Ball Z', who is Goku's arch-rival?", answer: "Vegeta" }
  ];

  const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  zk.sendMessage(origineMessage, { text: randomQuestion.question }, { quoted: ms });

  zk.on('message', async (responseMessage) => {
    const userAnswer = responseMessage.body.toLowerCase().trim();
    const correctAnswer = randomQuestion.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      zk.sendMessage(origineMessage, { text: "Correct! 🎉" }, { quoted: ms });
    } else {
      zk.sendMessage(origineMessage, { text: `Incorrect! The correct answer is: ${randomQuestion.answer}` }, { quoted: ms });
    }
  });
});

// anime fan art command (New)
xforcemd({
  commandName: "animefanart",
  category: "Weeb",
  reaction: "🎨"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, ms } = commandOptions;

  const url = 'https://some-anime-fanart-api.com/random';

  try {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: "Here's some cool anime fan art 🎨" }, { quoted: ms });
  } catch (error) {
    respond("Error while fetching anime fan art:", error);
  }
});

// anime episode finder command (New)
xforcemd({
  commandName: "animepisode",
  category: "Weeb",
  reaction: "📺"
}, async (origineMessage, zk, commandOptions) => {
  const { respond, arg, ms } = commandOptions;

  if (!arg || arg.length === 0) {
    return respond("Please provide the name of the anime you want to find episodes for.");
  }

  const animeTitle = arg.join(' ');
  const url = `https://api.jikan.moe/v4/anime?q=${animeTitle}&limit=1`;

  try {
    const response = await axios.get(url);
    const anime = response.data.data[0];

    if (anime) {
      const episodeInfo = `Anime: *${anime.title}*\nTotal Episodes: ${anime.episodes}\nScore: ${anime.score}\nType: ${anime.type}`;
      zk.sendMessage(origineMessage, { text: episodeInfo }, { quoted: ms });
    } else {
      respond(`No anime found with the name "${animeTitle}".`);
    }
  } catch (error) {
    respond("Error while searching for anime episodes:", error);
  }
});
      
