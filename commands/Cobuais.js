/*𝐗═𝐅𝐎𝐑𝐂𝐄═𝐌𝐃{𝐕𝐎𝐋²}
           𝑰
𝑨𝑴 𝑪𝑹𝑨𝑻𝑬𝑫 𝑩𝒀 𝑪𝑶𝑩𝑼_𝑻𝑬𝑪𝑯*/















const { xforcemd } = require('../framework/xforcemd');
const translate = require("../framework/translation");
const axios = require('axios');

// Bot response command
xforcemd({nomCom:"bot",reaction:"📡",categorie:"AI"},async(dest,zk,commandeOptions)=>{
  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0]) { return repondre("Yes, I'm listening."); }

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
          repondre(translatedResponse);
        })
        .catch(error => {
          console.error('Error translating to French:', error);
          repondre('Error translating to French.');
        });
    })
    .catch(error => {
      console.error('Error with BrainShop request:', error);
      repondre('Error with BrainShop request.');
    });
  } catch (e) { repondre("Oops, an error occurred: " + e); }
});

// DALL-E image generation command
xforcemd({ nomCom: "dalle", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre(`Please provide the information needed to generate the image.`);
    }

    const image = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/photoleap?q=${image}`);
    
    const data = response.data;
    let caption = '*Powered by XFORCE-MD*';
    
    if (data.status && data.owner && data.data) {
      const imageUrl = data.data;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
    } else {
      repondre("Error generating the image");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    repondre("Oops, an error occurred while processing your request.");
  }
});

// GPT command for chat responses
xforcemd({ nomCom: "gpt", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre(`Please ask a question.`);
    }

    const question = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/chatgpt4?q=${question}`);
    
    const data = response.data;
    if (data) {
      repondre(data.data);
    } else {
      repondre("Error generating the response");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    repondre("Oops, an error occurred while processing your request.");
  }
});

// New Command 1: Text Summarization
xforcemd({ nomCom: "summarize", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide text to summarize.");
    }

    const text = arg.join(' ');
    const response = await axios.post(`https://api.text-summarization.com/summarize`, { text });

    const summary = response.data.summary;
    repondre(`Summary: ${summary}`);
  } catch (error) {
    console.error('Error summarizing text:', error.message);
    repondre("Error summarizing the text.");
  }
});

// New Command 2: Sentiment Analysis
xforcemd({ nomCom: "sentiment", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide text for sentiment analysis.");
    }

    const text = arg.join(' ');
    const response = await axios.post(`https://api.sentiment-analysis.com/analyze`, { text });

    const sentiment = response.data.sentiment;
    repondre(`Sentiment: ${sentiment}`);
  } catch (error) {
    console.error('Error analyzing sentiment:', error.message);
    repondre("Error analyzing sentiment.");
  }
});

// New Command 3: Language Detection
xforcemd({ nomCom: "detectlang", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide text for language detection.");
    }

    const text = arg.join(' ');
    const response = await axios.post(`https://api.language-detection.com/detect`, { text });

    const language = response.data.language;
    repondre(`Detected Language: ${language}`);
  } catch (error) {
    console.error('Error detecting language:', error.message);
    repondre("Error detecting the language.");
  }
});

// New Command 4: Text Translation
xforcemd({ nomCom: "translate", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length < 2) {
      return repondre("Usage: .translate <language-code> <text>");
    }

    const lang = arg[0];
    const text = arg.slice(1).join(' ');
    const translatedText = await translate(text, { to: lang });

    repondre(`Translated Text: ${translatedText}`);
  } catch (error) {
    console.error('Error translating text:', error.message);
    repondre("Error translating the text.");
  }
});

// New Command 5: Text-to-Speech
xforcemd({ nomCom: "tts", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide text for text-to-speech.");
    }

    const text = arg.join(' ');
    const response = await axios.post(`https://api.text-to-speech.com/convert`, { text });

    const audioUrl = response.data.audio;
    zk.sendMessage(dest, { audio: { url: audioUrl }, mimetype: 'audio/mpeg' }, { quoted: ms });
  } catch (error) {
    console.error('Error converting text to speech:', error.message);
    repondre("Error converting text to speech.");
  }
});

// New Command 6: Wikipedia Search
xforcemd({ nomCom: "wiki", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a search query for Wikipedia.");
    }

    const query = arg.join(' ');
    const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);

    const title = response.data.title;
    const description = response.data.extract;
    const link = response.data.content_urls.desktop.page;

    const message = `📖 **${title}**\n\n${description}\n🔗 Read more: ${link}`;
    repondre(message);
  } catch (error) {
    console.error('Error fetching Wikipedia summary:', error.message);
    repondre("Error fetching Wikipedia summary.");
  }
});

// New Command 7: Weather Forecast
xforcemd({ nomCom: "weather", reaction: "📡", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
        if (!arg || arg.length === 0) {
      return repondre("Please provide a location for the weather forecast.");
    }

    const location = arg.join(' ');
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location}`);

    const weatherData = response.data;
    const locationName = weatherData.location.name;
    const region = weatherData.location.region;
    const country = weatherData.location.country;
    const temperature = weatherData.current.temp_c;
    const condition = weatherData.current.condition.text;
    const humidity = weatherData.current.humidity;
    const windSpeed = weatherData.current.wind_kph;

    const weatherMessage = `
🌍 Location: ${locationName}, ${region}, ${country}
🌡️ Temperature: ${temperature}°C
☁️ Condition: ${condition}
💧 Humidity: ${humidity}%
🌬️ Wind Speed: ${windSpeed} kph
`;

    repondre(weatherMessage);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    repondre("Error fetching the weather forecast.");
  }
});
// New Command 8: Map Location
xforcemd({ nomCom: "map", reaction: "🗺️", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a location to view the map.");
    }

    const location = arg.join(' ');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

    const message = `🗺️ **Map for:** ${location}\n\n🔗 [View Map](${mapUrl})`;
    repondre(message);
  } catch (error) {
    console.error('Error fetching map link:', error.message);
    repondre("Error fetching the map.");
  }
});

// New Command 9: Locate by Phone Number
xforcemd({ nomCom: "locate", reaction: "📍", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length !== 1) {
      return repondre("Please provide a phone number to locate.");
    }

    const phoneNumber = arg[0];
    const response = await axios.get(`https://api.numlookupapi.com/v1/locate?number=${phoneNumber}&apikey=YOUR_API_KEY`);

    if (response.data.success) {
      const location = response.data.location;
      const country = response.data.country_name;
      const carrier = response.data.carrier;

      const message = `
📞 **Phone Number:** ${phoneNumber}
🌍 **Location:** ${location ? location : "Not available"}
🇺🇸 **Country:** ${country ? country : "Not available"}
📡 **Carrier:** ${carrier ? carrier : "Not available"}
      `;
      repondre(message);
    } else {
      repondre("Sorry, location for this phone number is not available.");
    }
  } catch (error) {
    console.error('Error locating phone number:', error.message);
    repondre("Error locating the phone number.");
  }
});

// New Command 10: QR Code Generator
xforcemd({ nomCom: "qrcode", reaction: "📱", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a text or URL to generate a QR code.");
    }

    const text = arg.join(' ');
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;

    const message = `📱 **QR Code for:** ${text}\n\n🔗 [View QR Code](${qrCodeUrl})`;
    zk.sendMessage(dest, { image: { url: qrCodeUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    repondre("Error generating the QR code.");
  }
});

// New Command 11: Barcode Scanner (image URL)
xforcemd({ nomCom: "barcode", reaction: "📦", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide an image URL of a barcode.");
    }

    const imageUrl = arg[0];
    const response = await axios.get(`https://api.barcodescannerapi.com/api/decode?image_url=${imageUrl}&apikey=YOUR_API_KEY`);

    const barcodeData = response.data;
    if (barcodeData && barcodeData.success) {
      repondre(`📦 **Barcode Content:** ${barcodeData.data}`);
    } else {
      repondre("Error decoding the barcode. Please check the image.");
    }
  } catch (error) {
    console.error('Error scanning barcode:', error.message);
    repondre("Error scanning the barcode.");
  }
});

// New Command 12: IP Address Lookup
xforcemd({ nomCom: "iplookup", reaction: "🌍", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide an IP address to look up.");
    }

    const ipAddress = arg[0];
    const response = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=YOUR_API_KEY`);

    const ipData = response.data;
    if (ipData) {
      const message = `
🌍 **IP Address:** ${ipAddress}
📍 **Location:** ${ipData.city}, ${ipData.region}, ${ipData.country}
📡 **ISP:** ${ipData.org}
      `;
      repondre(message);
    } else {
      repondre("Error looking up the IP address.");
    }
  } catch (error) {
    console.error('Error looking up IP address:', error.message);
    repondre("Error looking up the IP address.");
  }
});






    
    
