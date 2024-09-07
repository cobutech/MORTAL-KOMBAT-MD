const yts =  require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');

/* function to get search results */
async function getytlink(key) {
  try {
    const result = await yts(key);
    const videos = result.videos;
    const choice = videos[0];
    return {
        link : choice.url ,
        thumbnail : choice.thumbnail,
        title : choice.title,
        duration : choice.timestamp,
        id : choice.videoId,
    };
  } catch (error) {
    console.error('Error while searching YouTube:', error);  // Translated "Erreur lors de la recherche YouTube"
    return null;
  }
}

module.exports = getytlink;

/* function to download videos using ytdl-core */
async function ytdwn(url) {
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: '18' });
  const video = ytdl.downloadFromInfo(info, format);

  return video;
}

module.exports = ytdwn;
