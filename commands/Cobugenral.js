const { xforcemd } = require("../framework/zokou"); // Make sure this import corresponds to the actual module after replacing zokou
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

xforcemd({ nomCom: "owner", category: "General", reaction: "💞" }, async (dest, zk, commandOptions) => {
    const { ms, mybotpic } = commandOptions;

    const thsudo = await isSudoTableNotEmpty();

    if (thsudo) {
        let msg = `*Xforce Super-User*\n
        *Owner Number*:
        - 🌟 @${conf.NUMERO_OWNER}

        ------ *Other Super-Users* -----\n`;

        let sudos = await getAllSudoNumbers();

        for (const sudo of sudos) {
            if (sudo) { // Stricter verification to eliminate empty or undefined values
                sudonumero = sudo.replace(/[^0-9]/g, '');
                msg += `- 💼 @${sudonumero}\n`;
            } else { return; }
        }
        const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
        const mentionedJid = sudos.concat([ownerjid]);
        console.log(sudos);
        console.log(mentionedJid);
        zk.sendMessage(
            dest,
            {
                image: { url: 'https://furansujapon.com/wp-content/uploads/2023/03/Saitama-dans-One-Punch-Man-1052x592.jpg' },
                caption: msg,
                mentions: mentionedJid
            }
        );
    } else {
        const vcard =
            'BEGIN:VCARD\n' + // Metadata of the contact card
            'VERSION:3.0\n' +
            'FN:' + conf.NOM_OWNER + '\n' + // Full name
            'ORG:undefined;\n' + // Organization of the contact
            'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
            'END:VCARD';
        zk.sendMessage(dest, {
            contacts: {
                displayName: conf.NOM_OWNER,
                contacts: [{ vcard }],
            },
        }, { quoted: ms });
    }
});

xforcemd({ nomCom: "dev", category: "General", reaction: "💞" }, async (dest, zk, commandOptions) => {
    const { ms, mybotpic } = commandOptions;

    const devs = [
        { name: "Djalega++", number: "22559763447" },
        { name: "᚛Monkey D Luffy᚜", number: "22891733300" },
        // Add more developers here with their name and number
    ];

    let message = "👋 Welcome to Xforce! Here are the developers:\n\n";
    for (const dev of devs) {
        message += `----------------\n• ${dev.name} : https://wa.me/${dev.number}\n`;
    }
    var link = mybotpic();
    if (link.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: link }, caption: message }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu error " + e);
            reply("🥵🥵 Menu error " + e);
        }
    }
    // Check for .jpeg or .png
    else if (link.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: link }, caption: message }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu error " + e);
            reply("🥵🥵 Menu error " + e);
        }
    }
    else {
        reply(link);
        reply("The link does not end with .mp4, .gif, .jpeg, .jpg, or .png");
    }
});

xforcemd({ nomCom: "support", category: "General" }, async (dest, zk, commandOptions) => {
    const { ms, reply, authorMessage } = commandOptions;

    reply("Please check the private chat for the link.");
    await zk.sendMessage(authorMessage, { text: `https://chat.whatsapp.com/H6oeuhfSMtV1Orjmf2NVnl` }, { quoted: ms });
});

// New Ping Uptime Command
xforcemd({ nomCom: "ping", category: "General", reaction: "🟢" }, async (dest, zk, commandOptions) => {
    const { ms, reply } = commandOptions;
    
    try {
        // Getting bot uptime in a readable format
        const uptime = process.uptime(); // Get uptime in seconds
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeMessage = `Bot is online! 🟢\nUptime: ${hours}h ${minutes}m ${seconds}s`;

        // Send uptime status message
        reply(uptimeMessage);
    } catch (error) {
        console.error("Error fetching bot uptime:", error);
        reply("Unable to fetch uptime status, please try again later.");
    }
});
// Help Command: Lists all available commands
xforcemd({ nomCom: "help", category: "General", reaction: "🆘" }, async (dest, zk, commandOptions) => {
    const { reply } = commandOptions;

    const helpMessage = `
🆘 *Help Menu* 🆘
Here are the available commands:
- *owner*: Shows the bot owner's information.
- *dev*: Lists the developers.
- *support*: Provides support contact link.
- *ping*: Shows the bot's uptime.
- *status*: Shows current bot status including memory and CPU usage.
- *broadcast*: Sends a message to all subscribers.
- *restart*: Restarts the bot (Admin only).
- *mute*: Disables bot responses in the current chat (Admin only).
- *unmute*: Re-enables bot responses (Admin only).
- *ban*: Bans a user from using the bot (Admin only).
- *unban*: Unbans a previously banned user (Admin only).
- *weather [location]*: Provides current weather for a specified location.
- *joke*: Sends a random joke.
    `;

    reply(helpMessage);
});

// Status Command: Provides system status details
xforcemd({ nomCom: "status", category: "General", reaction: "📊" }, async (dest, zk, commandOptions) => {
    const { reply } = commandOptions;
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const statusMessage = `
📊 *Bot Status* 📊
- Memory Usage: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB
- CPU Usage: User ${(cpuUsage.user / 1000).toFixed(2)}ms, System ${(cpuUsage.system / 1000).toFixed(2)}ms
- Uptime: ${(process.uptime() / 3600).toFixed(2)} hours
    `;

    reply(statusMessage);
});
   // Broadcast Command: Sends a message to all subscribers (Admin only)
xforcemd({ nomCom: "broadcast", category: "Admin", reaction: "📢" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getAllUsers } = commandOptions; // Assuming getAllUsers fetches all user contacts
    const message = ms.body.replace("/broadcast", "").trim(); // Extract message after the command

    if (!message) {
        reply("Please provide a message to broadcast.");
        return;
    }

    try {
        const users = await getAllUsers(); // Fetch all users
        for (const user of users) {
            zk.sendMessage(user, { text: message });
        }
        reply("📢 Broadcast sent successfully.");
    } catch (error) {
        console.error("Error broadcasting message:", error);
        reply("Failed to send broadcast. Please try again.");
    }
});

// Restart Command: Allows admins to restart the bot
xforcemd({ nomCom: "restart", category: "Admin", reaction: "🔄" }, async (dest, zk, commandOptions) => {
    const { reply, isAdmin } = commandOptions;

    if (!isAdmin) {
        reply("You do not have permission to restart the bot.");
        return;
    }

    reply("🔄 Restarting bot... Please wait.");
    process.exit(0); // Exits the process, assuming a supervisor restarts the bot
});

// Mute Command: Disables bot responses in the current chat
xforcemd({ nomCom: "mute", category: "Admin", reaction: "🤐" }, async (dest, zk, commandOptions) => {
    const { reply, muteChat, isAdmin } = commandOptions; // Assuming muteChat mutes the chat

    if (!isAdmin) {
        reply("You do not have permission to mute this chat.");
        return;
    }

    try {
        await muteChat(dest);
        reply("🤐 Bot has been muted in this chat.");
    } catch (error) {
        console.error("Error muting chat:", error);
        reply("Failed to mute chat. Please try again.");
    }
});

// Unmute Command: Re-enables bot responses in a previously muted chat
xforcemd({ nomCom: "unmute", category: "Admin", reaction: "🔊" }, async (dest, zk, commandOptions) => {
    const { reply, unmuteChat, isAdmin } = commandOptions; // Assuming unmuteChat unmutes the chat

    if (!isAdmin) {
        reply("You do not have permission to unmute this chat.");
        return;
    }

    try {
        await unmuteChat(dest);
        reply("🔊 Bot has been unmuted in this chat.");
    } catch (error) {
        console.error("Error unmuting chat:", error);
        reply("Failed to unmute chat. Please try again.");
    }
});

// Ban Command: Restricts a user from interacting with the bot
xforcemd({ nomCom: "ban", category: "Admin", reaction: "🚫" }, async (dest, zk, commandOptions) => {
    const { ms, reply, banUser, isAdmin } = commandOptions; // Assuming banUser bans the user
    const userToBan = ms.body.split(" ")[1]; // Extract the user ID to ban

    if (!isAdmin) {
        reply("You do not have permission to ban users.");
        return;
    }

    if (!userToBan) {
        reply("Please specify a user to ban.");
        return;
    }

    try {
        await banUser(userToBan);
        reply(`🚫 User ${userToBan} has been banned.`);
    } catch (error) {
        console.error("Error banning user:", error);
        reply("Failed to ban the user. Please try again.");
    }
});

// Unban Command: Removes a user from the ban list
xforcemd({ nomCom: "unban", category: "Admin", reaction: "✅" }, async (dest, zk, commandOptions) => {
    const { ms, reply, unbanUser, isAdmin } = commandOptions; // Assuming unbanUser unbans the user
    const userToUnban = ms.body.split(" ")[1]; // Extract the user ID to unban

    if (!isAdmin) {
        reply("You do not have permission to unban users.");
        return;
    }

    if (!userToUnban) {
        reply("Please specify a user to unban.");
        return;
    }

    try {
        await unbanUser(userToUnban);
        reply(`✅ User ${userToUnban} has been unbanned.`);
    } catch (error) {
        console.error("Error unbanning user:", error);
        reply("Failed to unban the user. Please try again.");
    }
});

// Weather Command: Fetches the current weather for a specified location
xforcemd({ nomCom: "weather", category: "General", reaction: "☀️" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getWeather } = commandOptions; // Assuming getWeather fetches weather data
    const location = ms.body.split(" ")[1]; // Extract location from command

    if (!location) {
        reply("Please specify a location to get the weather.");
        return;
    }

    try {
        const weatherInfo = await getWeather(location); // Fetch weather info
        reply(`☀️ Weather in ${location}: ${weatherInfo}`);
    } catch (error) {
        console.error("Error fetching weather:", error);
        reply("Failed to fetch weather data. Please try again.");
    }
});

// Joke Command: Sends a random joke to the user
xforcemd({ nomCom: "joke", category: "Fun", reaction: "😂" }, async (dest, zk, commandOptions) => {
    const { reply, getJoke } = commandOptions; // Assuming getJoke fetches a random joke

    try {
        const joke = await getJoke(); // Fetch a random joke
        reply(`😂 Here's a joke for you:\n\n${joke}`);
    } catch (error) {
        console.error("Error fetching joke:", error);
        reply("Failed to fetch a joke. Please try again.");
    }
});
    // Quote Command: Sends a random motivational quote
xforcemd({ nomCom: "quote", category: "Fun", reaction: "📜" }, async (dest, zk, commandOptions) => {
    const { reply, getQuote } = commandOptions; // Assuming getQuote fetches a random quote

    try {
        const quote = await getQuote(); // Fetch a random motivational quote
        reply(`📜 Here's a quote to inspire you:\n\n"${quote}"`);
    } catch (error) {
        console.error("Error fetching quote:", error);
        reply("Failed to fetch a quote. Please try again.");
    }
});

// Time Command: Provides current time for a specified timezone
xforcemd({ nomCom: "time", category: "General", reaction: "⏰" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getTime } = commandOptions; // Assuming getTime fetches current time for a timezone
    const timezone = ms.body.split(" ")[1]; // Extract timezone from command

    if (!timezone) {
        reply("Please specify a timezone to get the current time.");
        return;
    }

    try {
        const time = await getTime(timezone); // Fetch time for specified timezone
        reply(`⏰ The current time in ${timezone} is: ${time}`);
    } catch (error) {
        console.error("Error fetching time:", error);
        reply("Failed to fetch the time. Please try again.");
    }
});

// Reminder Command: Sets a reminder for the user
xforcemd({ nomCom: "reminder", category: "Utility", reaction: "⏳" }, async (dest, zk, commandOptions) => {
    const { ms, reply, setReminder } = commandOptions; // Assuming setReminder schedules a reminder
    const [time, ...messageArray] = ms.body.split(" ").slice(1); // Extract time and message
    const message = messageArray.join(" ");

    if (!time || !message) {
        reply("Please specify the time and message for the reminder, e.g., /reminder 10m Check the oven.");
        return;
    }

    try {
        await setReminder(time, message, dest); // Schedule the reminder
        reply(`⏳ Reminder set for ${time} from now: "${message}"`);
    } catch (error) {
        console.error("Error setting reminder:", error);
        reply("Failed to set reminder. Please try again.");
    }
});

// Poll Command: Creates a poll in the chat
xforcemd({ nomCom: "poll", category: "General", reaction: "📊" }, async (dest, zk, commandOptions) => {
    const { ms, reply, createPoll } = commandOptions; // Assuming createPoll handles poll creation
    const pollData = ms.body.replace("/poll", "").trim(); // Extract poll question and options

    if (!pollData) {
        reply("Please provide a question and options for the poll.");
        return;
    }

    try {
        await createPoll(pollData, dest); // Initiate the poll in the chat
        reply("📊 Poll created successfully.");
    } catch (error) {
        console.error("Error creating poll:", error);
        reply("Failed to create poll. Please try again.");
    }
});

// Translate Command: Translates text into the specified language
xforcemd({ nomCom: "translate", category: "Utility", reaction: "🌐" }, async (dest, zk, commandOptions) => {
    const { ms, reply, translateText } = commandOptions; // Assuming translateText handles text translation
    const [lang, ...textArray] = ms.body.split(" ").slice(1); // Extract language and text to translate
    const text = textArray.join(" ");

    if (!lang || !text) {
        reply("Please specify the language code and the text to translate, e.g., /translate es Hello.");
        return;
    }

    try {
        const translated = await translateText(text, lang); // Perform the translation
        reply(`🌐 Translated text (${lang}): ${translated}`);
    } catch (error) {
        console.error("Error translating text:", error);
        reply("Failed to translate the text. Please try again.");
    }
});

// News Command: Fetches the latest news headlines
xforcemd({ nomCom: "news", category: "General", reaction: "📰" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getNews } = commandOptions; // Assuming getNews fetches news headlines
    const category = ms.body.split(" ")[1] || "general"; // Extract news category

    try {
        const headlines = await getNews(category); // Fetch news headlines
        reply(`📰 Latest news in ${category}:\n\n${headlines.join("\n")}`);
    } catch (error) {
        console.error("Error fetching news:", error);
        reply("Failed to fetch news. Please try again.");
    }
});

// Define Command: Provides the definition of a word
xforcemd({ nomCom: "define", category: "Utility", reaction: "📚" }, async (dest, zk, commandOptions) => {
    const { ms, reply, defineWord } = commandOptions; // Assuming defineWord fetches word definition
    const word = ms.body.split(" ")[1]; // Extract the word to define

    if (!word) {
        reply("Please specify a word to define.");
        return;
    }

    try {
        const definition = await defineWord(word); // Fetch the definition
        reply(`📚 Definition of "${word}": ${definition}`);
    } catch (error) {
        console.error("Error fetching definition:", error);
        reply("Failed to fetch the definition. Please try again.");
    }
});

// Math Command: Solves basic math expressions
xforcemd({ nomCom: "math", category: "Utility", reaction: "➗" }, async (dest, zk, commandOptions) => {
    const { ms, reply, solveMath } = commandOptions; // Assuming solveMath evaluates the math expression
    const expression = ms.body.split(" ").slice(1).join(" "); // Extract the math expression

    if (!expression) {
        reply("Please specify a math expression to solve, e.g., /math 2 + 2.");
        return;
    }

    try {
        const result = await solveMath(expression); // Solve the math expression
        reply(`➗ The result of "${expression}" is: ${result}`);
    } catch (error) {
        console.error("Error solving math expression:", error);
        reply("Failed to solve the math expression. Please try again.");
    }
});
  // WhoAmI Command: Provides information about the user
xforcemd({ nomCom: "whoami", category: "General", reaction: "🧍" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getUserInfo } = commandOptions; // Assuming getUserInfo fetches user details

    try {
        const userInfo = await getUserInfo(ms.author); // Fetch user info
        reply(`🧍 You are:\n- ID: ${userInfo.id}\n- Name: ${userInfo.name}\n- Status: ${userInfo.status}`);
    } catch (error) {
        console.error("Error fetching user info:", error);
        reply("Failed to retrieve user information. Please try again.");
    }
});

// Convert Command: Converts units of measurement
xforcemd({ nomCom: "convert", category: "General", reaction: "🔄" }, async (dest, zk, commandOptions) => {
    const { ms, reply, convertUnits } = commandOptions; // Assuming convertUnits handles unit conversion
    const [from, to, value] = ms.body.split(" ").slice(1); // Extract units and value

    if (!from || !to || !value) {
        reply("Please specify the conversion in the format: /convert [from] [to] [value], e.g., /convert kg lb 10.");
        return;
    }

    try {
        const result = await convertUnits(from, to, value); // Perform the conversion
        reply(`🔄 ${value} ${from} is equal to ${result} ${to}.`);
    } catch (error) {
        console.error("Error converting units:", error);
        reply("Failed to convert units. Please try again.");
    }
});

// Weather Alert Command: Sets up a weather alert for severe conditions
xforcemd({ nomCom: "weather alert", category: "General", reaction: "⚠️" }, async (dest, zk, commandOptions) => {
    const { ms, reply, setWeatherAlert } = commandOptions; // Assuming setWeatherAlert configures weather alerts
    const location = ms.body.split(" ").slice(2).join(" "); // Extract location from command

    if (!location) {
        reply("Please specify a location to set up weather alerts.");
        return;
    }

    try {
        await setWeatherAlert(location); // Set up weather alerts for the location
        reply(`⚠️ Weather alerts set up for ${location}. You will be notified of severe weather conditions.`);
    } catch (error) {
        console.error("Error setting weather alert:", error);
        reply("Failed to set weather alert. Please try again.");
    }
});

// Currency Command: Converts currencies based on latest rates
xforcemd({ nomCom: "currency", category: "General", reaction: "💱" }, async (dest, zk, commandOptions) => {
    const { ms, reply, convertCurrency } = commandOptions; // Assuming convertCurrency handles currency conversion
    const [amount, from, to] = ms.body.split(" ").slice(1); // Extract amount and currency codes

    if (!amount || !from || !to) {
        reply("Please specify the currency conversion in the format: /currency [amount] [from] [to], e.g., /currency 100 USD EUR.");
        return;
    }

    try {
        const result = await convertCurrency(amount, from, to); // Convert the currency
        reply(`💱 ${amount} ${from} is equal to ${result} ${to}.`);
    } catch (error) {
        console.error("Error converting currency:", error);
        reply("Failed to convert currency. Please try again.");
    }
});

// Shorten Command: Shortens long URLs
xforcemd({ nomCom: "shorten", category: "General", reaction: "🔗" }, async (dest, zk, commandOptions) => {
    const { ms, reply, shortenUrl } = commandOptions; // Assuming shortenUrl shortens the given URL
    const url = ms.body.split(" ")[1]; // Extract the URL to shorten

    if (!url) {
        reply("Please provide a URL to shorten.");
        return;
    }

    try {
        const shortUrl = await shortenUrl(url); // Shorten the URL
        reply(`🔗 Shortened URL: ${shortUrl}`);
    } catch (error) {
        console.error("Error shortening URL:", error);
        reply("Failed to shorten the URL. Please try again.");
    }
});

// Dice Command: Rolls a virtual dice
xforcemd({ nomCom: "dice", category: "General", reaction: "🎲" }, async (dest, zk, commandOptions) => {
    const { reply } = commandOptions;
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    reply(`🎲 You rolled a ${diceRoll}.`);
});

// Flip Command: Flips a coin
xforcemd({ nomCom: "flip", category: "General", reaction: "🪙" }, async (dest, zk, commandOptions) => {
    const { reply } = commandOptions;
    const result = Math.random() < 0.5 ? "Heads" : "Tails"; // Randomly chooses heads or tails
    reply(`🪙 The coin landed on ${result}.`);
});

// GIF Command: Searches and sends a random GIF
xforcemd({ nomCom: "gif", category: "General", reaction: "🎥" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getGif } = commandOptions; // Assuming getGif fetches a GIF based on keywords
    const keyword = ms.body.split(" ").slice(1).join(" "); // Extract keyword for GIF search

    if (!keyword) {
        reply("Please provide a keyword to search for a GIF.");
        return;
    }

    try {
        const gifUrl = await getGif(keyword); // Fetch a GIF based on the keyword
        zk.sendMessage(dest, { image: { url: gifUrl }, caption: `🎥 Here's a GIF for "${keyword}"` });
    } catch (error) {
        console.error("Error fetching GIF:", error);
        reply("Failed to fetch a GIF. Please try again.");
    }
});
  // RemindMe Command: Sets a one-time reminder for the user
xforcemd({ nomCom: "remindme", category: "General", reaction: "⏰" }, async (dest, zk, commandOptions) => {
    const { ms, reply, setOneTimeReminder } = commandOptions; // Assuming setOneTimeReminder schedules a reminder
    const [time, ...messageArray] = ms.body.split(" ").slice(1); // Extract time and message
    const message = messageArray.join(" ");

    if (!time || !message) {
        reply("Please specify the time and message for the reminder, e.g., /remindme 15:30 Meeting with John.");
        return;
    }

    try {
        await setOneTimeReminder(time, message, dest); // Schedule the reminder
        reply(`⏰ Reminder set for ${time}: "${message}"`);
    } catch (error) {
        console.error("Error setting reminder:", error);
        reply("Failed to set the reminder. Please try again.");
    }
});

// Fact Command: Sends a random interesting fact
xforcemd({ nomCom: "fact", category: "General", reaction: "🧠" }, async (dest, zk, commandOptions) => {
    const { reply, getRandomFact } = commandOptions; // Assuming getRandomFact fetches a random fact

    try {
        const fact = await getRandomFact(); // Fetch a random fact
        reply(`🧠 Did you know? ${fact}`);
    } catch (error) {
        console.error("Error fetching fact:", error);
        reply("Failed to fetch a fact. Please try again.");
    }
});

// Calculate Age Command: Calculates the user's age based on birth date
xforcemd({ nomCom: "calculate age", category: "General", reaction: "🎂" }, async (dest, zk, commandOptions) => {
    const { ms, reply, calculateAge } = commandOptions; // Assuming calculateAge calculates age from a birth date
    const birthDate = ms.body.split(" ").slice(2).join(" "); // Extract the birth date

    if (!birthDate) {
        reply("Please provide your birth date in the format: /calculate age YYYY-MM-DD.");
        return;
    }

    try {
        const age = await calculateAge(birthDate); // Calculate age
        reply(`🎂 You are ${age} years old.`);
    } catch (error) {
        console.error("Error calculating age:", error);
        reply("Failed to calculate age. Please ensure the date format is correct and try again.");
    }
});

// Random Number Command: Generates a random number within a specified range
xforcemd({ nomCom: "random number", category: "General", reaction: "🎲" }, async (dest, zk, commandOptions) => {
    const { ms, reply } = commandOptions;
    const [min, max] = ms.body.split(" ").slice(2).map(Number); // Extract min and max values

    if (isNaN(min) || isNaN(max) || min >= max) {
        reply("Please provide a valid range in the format: /random number [min] [max], e.g., /random number 1 100.");
        return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    reply(`🎲 Your random number between ${min} and ${max} is: ${randomNumber}`);
});

// Emojify Command: Converts text into emoji-styled message
xforcemd({ nomCom: "emojify", category: "General", reaction: "😊" }, async (dest, zk, commandOptions) => {
    const { ms, reply, emojifyText } = commandOptions; // Assuming emojifyText converts text into emoji format
    const text = ms.body.split(" ").slice(1).join(" "); // Extract text to emojify

    if (!text) {
        reply("Please provide some text to emojify.");
        return;
    }

    try {
        const emojified = await emojifyText(text); // Convert text into emoji format
        reply(`😊 ${emojified}`);
    } catch (error) {
        console.error("Error emojifying text:", error);
        reply("Failed to emojify the text. Please try again.");
    }
});

// Lyrics Command: Fetches lyrics of a specified song
xforcemd({ nomCom: "lyrics", category: "General", reaction: "🎵" }, async (dest, zk, commandOptions) => {
    const { ms, reply, fetchLyrics } = commandOptions; // Assuming fetchLyrics retrieves song lyrics
    const song = ms.body.split(" ").slice(1).join(" "); // Extract song title and artist

    if (!song) {
        reply("Please provide the song title and artist, e.g., /lyrics Shape of You Ed Sheeran.");
        return;
    }

    try {
        const lyrics = await fetchLyrics(song); // Fetch lyrics
        reply(`🎵 Lyrics of "${song}":\n\n${lyrics}`);
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        reply("Failed to fetch lyrics. Please check the song details and try again.");
    }
});

// Profile Command: Displays the user’s profile information
xforcemd({ nomCom: "profile", category: "General", reaction: "📝" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getUserProfile } = commandOptions; // Assuming getUserProfile fetches user profile details

    try {
        const profile = await getUserProfile(ms.author); // Fetch user profile
        reply(`📝 Your Profile:\n- Name: ${profile.name}\n- Status: ${profile.status}\n- Joined: ${profile.joinDate}`);
    } catch (error) {
        console.error("Error fetching profile:", error);
        reply("Failed to fetch your profile. Please try again.");
    }
});

// Quote of the Day Command: Sends a daily motivational quote
xforcemd({ nomCom: "quote of the day", category: "General", reaction: "🌅" }, async (dest, zk, commandOptions) => {
    const { reply, getDailyQuote } = commandOptions; // Assuming getDailyQuote fetches the daily quote

    try {
        const quote = await getDailyQuote(); // Fetch the quote of the day
        reply(`🌅 Quote of the Day:\n\n"${quote}"`);
    } catch (error) {
        console.error("Error fetching the quote of the day:", error);
        reply("Failed to fetch the quote of the day. Please try again.");
    }
});
  // ToDo Command: Manages a personal to-do list
xforcemd({ nomCom: "todo", category: "General", reaction: "📝" }, async (dest, zk, commandOptions) => {
    const { ms, reply, manageTodo } = commandOptions; // Assuming manageTodo handles the to-do list
    const [action, ...taskArray] = ms.body.split(" ").slice(1); // Extract action and task
    const task = taskArray.join(" ");

    if (action === "add" && task) {
        try {
            await manageTodo.add(task, ms.author); // Add task to the user's to-do list
            reply(`📝 Task added: "${task}"`);
        } catch (error) {
            console.error("Error adding task:", error);
            reply("Failed to add the task. Please try again.");
        }
    } else if (action === "view") {
        try {
            const tasks = await manageTodo.view(ms.author); // View user's to-do list
            reply(`📝 Your To-Do List:\n\n${tasks.join("\n")}`);
        } catch (error) {
            console.error("Error viewing to-do list:", error);
            reply("Failed to retrieve your to-do list. Please try again.");
        }
    } else if (action === "remove" && task) {
        try {
            await manageTodo.remove(task, ms.author); // Remove task from the user's to-do list
            reply(`📝 Task removed: "${task}"`);
        } catch (error) {
            console.error("Error removing task:", error);
            reply("Failed to remove the task. Please try again.");
        }
    } else {
        reply("Invalid command. Use /todo add [task], /todo view, or /todo remove [task].");
    }
});

// Weather Forecast Command: Provides a 7-day weather forecast
xforcemd({ nomCom: "weather forecast", category: "General", reaction: "☁️" }, async (dest, zk, commandOptions) => {
    const { ms, reply, getWeatherForecast } = commandOptions; // Assuming getWeatherForecast fetches the forecast
    const location = ms.body.split(" ").slice(2).join(" "); // Extract location

    if (!location) {
        reply("Please specify a location for the weather forecast.");
        return;
    }

    try {
        const forecast = await getWeatherForecast(location); // Fetch the 7-day forecast
        reply(`☁️ 7-Day Weather Forecast for ${location}:\n\n${forecast}`);
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
        reply("Failed to fetch the weather forecast. Please try again.");
    }
});

// Roll Command: Rolls multiple dice with specified sides
xforcemd({ nomCom: "roll", category: "General", reaction: "🎲" }, async (dest, zk, commandOptions) => {
    const { ms, reply } = commandOptions;
    const [dice, sides] = ms.body.split(" ").slice(1).map(Number); // Extract number of dice and sides

    if (isNaN(dice) || isNaN(sides) || dice < 1 || sides < 2) {
        reply("Please specify the number of dice and sides, e.g., /roll 2 6.");
        return;
    }

    const rolls = Array.from({ length: dice }, () => Math.floor(Math.random() * sides) + 1);
    reply(`🎲 You rolled: ${rolls.join(", ")}`);
});

// Riddle Command: Sends a random riddle
xforcemd({ nomCom: "riddle", category: "General", reaction: "🤔" }, async (dest, zk, commandOptions) => {
    const { reply, getRiddle } = commandOptions; // Assuming getRiddle fetches a random riddle

    try {
        const riddle = await getRiddle(); // Fetch a random riddle
        reply(`🤔 Here's a riddle for you:\n\n${riddle.question}`);
    } catch (error) {
        console.error("Error fetching riddle:", error);
        reply("Failed to fetch a riddle. Please try again.");
    }
});

// Translate Text Command: Translates text between languages
xforcemd({ nomCom: "translate text", category: "General", reaction: "🈵" }, async (dest, zk, commandOptions) => {
    const { ms, reply, translateText } = commandOptions; // Assuming translateText handles the translation
    const [fromLang, toLang, ...textArray] = ms.body.split(" ").slice(2); // Extract source, target language, and text
    const text = textArray.join(" ");

    if (!fromLang || !toLang || !text) {
        reply("Please provide the languages and text, e.g., /translate text en es Hello world.");
        return;
    }

    try {
        const translated = await translateText(text, fromLang, toLang); // Translate the text
        reply(`🈵 Translated text (${fromLang} to ${toLang}):\n\n${translated}`);
    } catch (error) {
        console.error("Error translating text:", error);
        reply("Failed to translate the text. Please try again.");
    }
});

// Ping Website Command: Checks the availability of a website
xforcemd({ nomCom: "ping website", category: "General", reaction: "🌐" }, async (dest, zk, commandOptions) => {
    const { ms, reply, pingWebsite } = commandOptions; // Assuming pingWebsite checks the website's availability
    const url = ms.body.split(" ")[2]; // Extract the website URL

    if (!url) {
        reply("Please provide a website URL to ping.");
        return;
    }

    try {
        const responseTime = await pingWebsite(url); // Check the website's availability
        reply(`🌐 Website ${url} is online. Response time: ${responseTime} ms.`);
    } catch (error) {
        console.error("Error pinging website:", error);
        reply("Failed to ping the website. Please check the URL and try again.");
    }
});

// Meme Command: Fetches a random meme
xforcemd({ nomCom: "meme", category: "General", reaction: "😂" }, async (dest, zk, commandOptions) => {
    const { reply, getMeme } = commandOptions; // Assuming getMeme fetches a random meme

    try {
        const meme = await getMeme(); // Fetch a random meme
        zk.sendMessage(dest, { image: { url: meme.url }, caption: `😂 ${meme.title}` });
    } catch (error) {
        console.error("Error fetching meme:", error);
        reply("Failed to fetch a meme. Please try again.");
    }
});

// Countdown Command: Sets up a countdown timer
xforcemd({ nomCom: "countdown", category: "General", reaction: "⏳" }, async (dest, zk, commandOptions) => {
    const { ms, reply, setCountdown } = commandOptions; // Assuming setCountdown sets a countdown timer
    const duration = ms.body.split(" ").slice(1).join(" "); // Extract duration

    if (!duration) {
        reply("Please specify the duration for the countdown, e.g., /countdown 10s.");
        return;
    }

    try {
        await setCountdown(duration, dest); // Set up the countdown
        reply(`⏳ Countdown set for ${duration}.`);
    } catch (error) {
        console.error("Error setting countdown:", error);
        reply("Failed to set the countdown. Please try again");
    }
});
  
