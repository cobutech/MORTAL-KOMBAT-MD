const { xforcemd } = require('../framework/zokou');
const translate = require("../framework/traduction");
const axios = require('axios');

// bot command
xforcemd({ commandName: "bot", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, msg, arg } = commandOptions;

  if (!arg || !arg[0]) {
    return respond("Yes, I am listening.");
  }

  try {
    const message = await translate(arg.join(' '), { to: 'en' });
    console.log(message);

    fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
      .then(response => response.json())
      .then(data => {
        const botResponse = data.cnt;
        console.log(botResponse);

        translate(botResponse, { to: 'fr' })
          .then(translatedResponse => {
            respond(translatedResponse);
          })
          .catch(error => {
            console.error('Error during translation to French:', error);
            respond('Error during translation to French');
          });
      })
      .catch(error => {
        console.error('Error during request to BrainShop:', error);
        respond('Error during request to BrainShop');
      });

  } catch (e) {
    respond("Oops, an error occurred: " + e);
  }
});

// dalle command
xforcemd({ commandName: "dalle", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please enter the necessary information to generate the image.`);
    }

    // Combine arguments into a single string
    const image = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/photoleap?q=${image}`);
    
    const data = response.data;
    let caption = '*Powered by ZOKOU-MD*';
    
    if (data.status && data.owner && data.data) {
      // Use the data returned by the service
      const imageUrl = data.data;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: msg });
    } else {
      respond("Error generating the image");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while processing your request.");
  }
});

// gpt command
xforcemd({ commandName: "gpt", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please ask a question.`);
    }

    // Combine arguments into a single string
    const question = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/chatgpt4?q=${question}`);
    
    const data = response.data;
    if (data) {
      respond(data.data);
    } else {
      respond("Error generating the response");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while processing your request.");
  }
});

// image recognition command
xforcemd({ commandName: "recognize", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please upload an image for recognition.`);
    }

    // Use image recognition API
    const image = arg.join(' ');
    const response = await axios.post(`https://api.imagga.com/v2/tags`, { image });
    
    const data = response.data;
    if (data && data.result) {
      respond(`Here are the tags I found: ${data.result.tags.map(tag => tag.tag.en).join(', ')}`);
    } else {
      respond("Error recognizing the image");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while processing the image.");
  }
});

// speech-to-text command
xforcemd({ commandName: "speech", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please upload an audio file for speech-to-text conversion.`);
    }

    // Send the audio file to a speech-to-text API
    const audio = arg.join(' ');
    const response = await axios.post(`https://api.speechapi.com/v1/convert`, { audio });
    
    const data = response.data;
    if (data && data.transcription) {
      respond(`Here is the transcription: ${data.transcription}`);
    } else {
      respond("Error converting speech to text");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while processing the audio.");
  }
});

// text summarization command
xforcemd({ commandName: "summarize", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please provide the text you want to summarize.`);
    }

    // Summarize the provided text
    const text = arg.join(' ');
    const response = await axios.post(`https://api.summarization.com/v1/summarize`, { text });
    
    const data = response.data;
    if (data && data.summary) {
      respond(`Here is the summary: ${data.summary}`);
    } else {
      respond("Error summarizing the text");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while summarizing the text.");
  }
});
// keyword extraction command
xforcemd({ commandName: "keywords", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please provide the text for keyword extraction.`);
    }

    // Extract keywords from the text
    const text = arg.join(' ');
    const response = await axios.post(`https://api.keywordextraction.com/v1/extract`, { text });
    
    const data = response.data;
    if (data && data.keywords) {
      respond(`Extracted keywords: ${data.keywords.join(', ')}`);
    } else {
      respond("Error extracting keywords");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while extracting keywords.");
  }
});
  
// sentiment analysis command
xforcemd({ commandName: "sentiment", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please provide the text for sentiment analysis.`);
    }

    // Analyze sentiment in the text
    const text = arg.join(' ');
    const response = await axios.post(`https://api.sentimentanalysis.com/v1/analyze`, { text });
    
    const data = response.data;
    if (data && data.sentiment) {
      respond(`Sentiment: ${data.sentiment}`);
    } else {
      respond("Error analyzing sentiment");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while analyzing sentiment.");
  }
});
// language detection command
xforcemd({ commandName: "detectlang", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please provide the text for language detection.`);
    }

    // Detect language
    const text = arg.join(' ');
    const response = await axios.post(`https://api.languagedetection.com/v1/detect`, { text });
    
    const data = response.data;
    if (data && data.language) {
      respond(`Detected language: ${data.language}`);
    } else {
      respond("Error detecting language");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while detecting language.");
  }
});

// emotion detection command
xforcemd({ commandName: "emotion", reaction: "📡", category: "AI" }, async (dest, zk, commandOptions) => {
  const { respond, arg, msg } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return respond(`Please provide the text for emotion detection.`);
    }

    // Detect emotions in the text
    const text = arg.join(' ');
    const response = await axios.post(`https://api.emotiondetection.com/v1/detect`, { text });
    
    const data = response.data;
    if (data && data.emotions) {
      respond(`Detected emotions: ${data.emotions.join(', ')}`);
    } else {
      respond("Error detecting emotions");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    respond("Oops, an error occurred while detecting emotions.");
  }
});
