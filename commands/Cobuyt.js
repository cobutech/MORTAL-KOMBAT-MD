const { xforcemd } = require("../framework/xforcemd");
const { getytlink, ytdwn } = require("../framework/ytdl-core");
const yts = require("yt-search");
const ytdl = require('ytdl-core');
const fs = require('fs');

// YouTube search command
xforcemd({ nomCom: "yts", categorie: "Search", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please enter a search term.");
    return;
  }

  try {
    const info = await yts(query);
    const resultat = info.videos;

    let captions = "";
    for (let i = 0; i < 10; i++) {
      captions += `----------------\nTitle: ${resultat[i].title}\nDuration: ${resultat[i].timestamp}\nLink: ${resultat[i].url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*"; // Changed from Zokou-Md to xforcemd

    zk.sendMessage(dest, { image: { url: resultat[0].thumbnail }, caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred during the process: " + error);
  }
});

// YouTube MP4 Download
xforcemd({
  nomCom: "ytmp4",
  categorie: "Download",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Please enter a YouTube link.");
    return;
  }

  const topo = arg.join(" ");
  try {
    const videoInfo = await ytdl.getInfo(topo);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
    const videoStream = ytdl.downloadFromInfo(videoInfo, { format });
    const filename = 'video.mp4';

    const fileStream = fs.createWriteStream(filename);
    videoStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "Powered by *xforcemd*", gifPlayback: false }, { quoted: ms });
    });

    fileStream.on('error', (error) => {
      console.error('Error while writing the video file:', error);
      repondre('An error occurred while writing the video file.');
    });

  } catch (error) {
    console.error('Error while searching or downloading the video:', error);
    repondre('An error occurred while searching or downloading the video.' + error);
  }
});

// YouTube MP3 Download
xforcemd({
  nomCom: "ytmp3",
  categorie: "Download",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please enter a YouTube link.");
    return;
  }

  try {
    let topo = arg.join(" ");
    const audioStream = ytdl(topo, { filter: 'audioonly', quality: 'highestaudio' });
    const filename = 'audio.mp3';

    const fileStream = fs.createWriteStream(filename);
    audioStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(origineMessage, { audio: { url: `./${filename}` }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
      console.log("Audio file sent successfully!");
    });

    fileStream.on('error', (error) => {
      console.error('Error while writing the audio file:', error);
      repondre('An error occurred while writing the audio file.');
    });

  } catch (error) {
    console.error('Error while searching or downloading the video:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});

// YouTube Playlist Search
xforcemd({
  nomCom: "ytplaylist",
  categorie: "Search",
  reaction: "🎵"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please enter a search term for the playlist.");
    return;
  }

  try {
    const info = await yts(query);
    const playlists = info.playlists;

    let captions = "";
    for (let i = 0; i < 5; i++) {
      captions += `----------------\nPlaylist: ${playlists[i].title}\nVideos: ${playlists[i].videoCount}\nLink: ${playlists[i].url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*";

    zk.sendMessage(dest, { caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while searching for playlists: " + error);
  }
});

// YouTube Video Info
xforcemd({
  nomCom: "ytinfo",
  categorie: "Info",
  reaction: "ℹ️"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please enter a YouTube link for detailed information.");
    return;
  }

  const videoURL = arg.join(" ");

  try {
    const videoInfo = await ytdl.getInfo(videoURL);

    const videoDetails = `
    ----------------
    Title: ${videoInfo.videoDetails.title}
    Author: ${videoInfo.videoDetails.author.name}
    Views: ${videoInfo.videoDetails.viewCount}
    Likes: ${videoInfo.videoDetails.likes}
    Duration: ${videoInfo.videoDetails.lengthSeconds} seconds
    Description: ${videoInfo.videoDetails.shortDescription}
    Link: ${videoURL}
    ----------------
    *Powered by xforcemd*
    `;

    zk.sendMessage(dest, { text: videoDetails }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while retrieving the video information: " + error);
  }
});

// YouTube Channel Search
xforcemd({
  nomCom: "ytchannel",
  categorie: "Search",
  reaction: "📺"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please enter a search term for the channel.");
    return;
  }

  try {
    const info = await yts(query);
    const channels = info.channels;

    let captions = "";
    for (let i = 0; i < 5; i++) {
      captions += `----------------\nChannel: ${channels[i].name}\nSubscribers: ${channels[i].subCountLabel}\nLink: ${channels[i].url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*";

    zk.sendMessage(dest, { caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while searching for channels: " + error);
  }
});

// YouTube Trending Videos
xforcemd({
  nomCom: "yttrending",
  categorie: "Trending",
  reaction: "🔥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const region = arg[0] ? arg[0].toUpperCase() : 'US'; // Default region is 'US'

  try {
    const info = await yts({ query: '', hl: region, gl: region });
    const trending = info.videos;

    let captions = "🔥 Trending on YouTube:\n";
    for (let i = 0; i < 10; i++) {
      captions += `----------------\nTitle: ${trending[i].title}\nViews: ${trending[i].views}\nDuration: ${trending[i].timestamp}\nLink: ${trending[i].url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*";

    zk.sendMessage(dest, { text: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while retrieving trending videos: " + error);
  }
});

// YouTube Related Videos
xforcemd({
  nomCom: "ytrelated",
  categorie: "Related",
  reaction: "🔗"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

    if (!arg[0]) {
    repondre("Please provide a YouTube link to find related videos.");
    return;
  }

  const videoURL = arg.join(" ");

  try {
    const videoInfo = await ytdl.getInfo(videoURL);
    const relatedVideos = videoInfo.related_videos;

    let captions = "🔗 Related Videos:\n";
    for (let i = 0; i < 5; i++) {
      captions += `----------------\nTitle: ${relatedVideos[i].title}\nViews: ${relatedVideos[i].short_view_count_text}\nLink: ${relatedVideos[i].video_url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*";

    zk.sendMessage(dest, { text: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while fetching related videos: " + error);
  }
});
xforcemd({
  nomCom: "ytrandom",
  categorie: "Search",
  reaction: "🎲"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please enter a search term to get a random YouTube video.");
    return;
  }

  try {
    const info = await yts(query);
    const videos = info.videos;
    const randomIndex = Math.floor(Math.random() * videos.length);

    const randomVideo = videos[randomIndex];
    const message = `
🎲 Random Video 🎲
----------------
Title: ${randomVideo.title}
Views: ${randomVideo.views}
Duration: ${randomVideo.timestamp}
Link: ${randomVideo.url}
======\n*powered by xforcemd*
    `;

    zk.sendMessage(dest, { text: message }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while fetching a random video: " + error);
  }
});
  xforcemd({
  nomCom: "ytthumbnail",
  categorie: "Download",
  reaction: "🖼️"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please enter a YouTube link to download its thumbnail.");
    return;
  }

  const videoURL = arg.join(" ");

  try {
    const videoInfo = await ytdl.getInfo(videoURL);
    const thumbnail = videoInfo.videoDetails.thumbnails.pop().url;

    zk.sendMessage(dest, { image: { url: thumbnail }, caption: "🖼️ Thumbnail downloaded by xforcemd" }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while retrieving the thumbnail: " + error);
  }
});
 xforcemd({
  nomCom: "ytshorts",
  categorie: "Search",
  reaction: "📱"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please enter a search term for YouTube shorts.");
    return;
  }

  try {
    const info = await yts({ query, type: 'short' });
    const shorts = info.videos;

    let captions = "📱 YouTube Shorts:\n";
    for (let i = 0; i < shorts.length && i < 5; i++) {
      captions += `----------------\nTitle: ${shorts[i].title}\nViews: ${shorts[i].views}\nDuration: ${shorts[i].timestamp}\nLink: ${shorts[i].url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*";

    zk.sendMessage(dest, { text: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while searching for YouTube shorts: " + error);
  }
});
xforcemd({
  nomCom: "ytlive",
  categorie: "Search",
  reaction: "🔴"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please enter a search term for live videos.");
    return;
  }

  try {
    const info = await yts({ query, type: 'live' });
    const liveVideos = info.videos;

    let captions = "🔴 Live Videos:\n";
    for (let i = 0; i < liveVideos.length && i < 5; i++) {
      captions += `----------------\nTitle: ${liveVideos[i].title}\nViews: ${liveVideos[i].views}\nLink: ${liveVideos[i].url}\n`;
    }
    captions += "\n======\n*powered by xforcemd*";

    zk.sendMessage(dest, { text: captions }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while searching for live videos: " + error);
  }
});

    
