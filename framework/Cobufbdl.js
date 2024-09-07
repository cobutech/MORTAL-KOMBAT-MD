// fbdl-core.js
const fbDownloader = require('fb-video-downloader');
const fs = require('fs');

/* function to download Facebook videos */
async function fbDownload(url) {
  try {
    const videoInfo = await fbDownloader.getInfo(url);
    const videoStream = await fbDownloader.download(videoInfo.url);
    
    // Save the video to a file (optional)
    const writeStream = fs.createWriteStream('facebook_video.mp4');
    videoStream.pipe(writeStream);
    console.log('Video is being downloaded...');
    
    return videoStream;
  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    return null;
  }
}

module.exports = fbDownload;
