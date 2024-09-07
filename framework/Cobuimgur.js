const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadImageToImgur(imagePath, clientId) {
  try {
    const data = new FormData();
    data.append('image', fs.createReadStream(imagePath)); // Append image from the file system

    const headers = {
      'Authorization': `Client-ID ${clientId}`, // Imgur API client ID
      ...data.getHeaders() // Add form-data specific headers
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity, // Allows large files to be uploaded
      url: 'https://api.imgur.com/3/image', // Imgur upload URL
      headers: headers,
      data: data
    };

    const response = await axios(config); // Send POST request to Imgur
    const imageUrl = response.data.data.link; // Retrieve the image link from Imgur
    return imageUrl;
  } catch (error) {
    console.error('Error during upload to Imgur:', error); // Log the error in English
    throw new Error('An error occurred while uploading to Imgur.'); // Throw a user-friendly error message
  }
}

module.exports = { uploadImageToImgur };
