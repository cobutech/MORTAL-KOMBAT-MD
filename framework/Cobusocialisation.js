// Importing required modules
const fbDownloader = require('fb-video-downloader');
const instagramSave = require('instagram-save');
const TikTokScraper = require('tiktok-scraper');
const ytdl = require('ytdl-core');
const fs = require('fs');
const https = require('https');

// Facebook Downloader
async function fbDownload(url) {
  try {
    const videoInfo = await fbDownloader.getInfo(url);
    const videoStream = await fbDownloader.download(videoInfo.url);

    const writeStream = fs.createWriteStream('facebook_video.mp4');
    videoStream.pipe(writeStream);
    console.log('Facebook video is being downloaded...');

    return videoStream;
  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    return null;
  }
}

// Instagram Downloader
async function igDownload(url) {
  try {
    const mediaData = await instagramSave(url);
    const videoUrl = mediaData.url;

    const videoStream = fs.createWriteStream('instagram_video.mp4');
    https.get(videoUrl, (response) => {
      response.pipe(videoStream);
      console.log('Instagram video is being downloaded...');
    });

    return videoStream;
  } catch (error) {
    console.error('Error downloading Instagram video:', error);
    return null;
  }
}

// TikTok Downloader
async function tiktokDownload(url) {
  try {
    const videoMeta = await TikTokScraper.getVideoMeta(url);
    const videoUrl = videoMeta.collector[0].videoUrl;

    const videoStream = fs.createWriteStream('tiktok_video.mp4');
    https.get(videoUrl, (response) => {
      response.pipe(videoStream);
      console.log('TikTok video is being downloaded...');
    });

    return videoStream;
  } catch (error) {
    console.error('Error downloading TikTok video:', error);
    return null;
  }
}

// YouTube Downloader
async function ytDownload(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: '18' });

    const videoStream = fs.createWriteStream('youtube_video.mp4');
    ytdl.downloadFromInfo(info, format).pipe(videoStream);
    console.log('YouTube video is being downloaded...');

    return videoStream;
  } catch (error) {
    console.error('Error downloading YouTube video:', error);
    return null;
  }
}

// Exporting all download functions
module.exports = {
  fbDownload,
  igDownload,
  tiktokDownload,
  ytDownload
};
