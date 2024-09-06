const axios = require('axios');
const { xforcemd } = require("../framework/zokou"); // Replaced zokou with xforcemd
const fs = require("fs-extra");
const { exec } = require("child_process");
const child_process = require('child_process');
const { unlink } = require('fs').promises;

// Sleep function to delay execution
const sleep = (ms) => {
    return new Promise((resolve) => { setTimeout(resolve, ms) });
};

// Function to convert GIF to video and retrieve the video buffer
const GIFBufferToVideoBuffer = async (image) => {
    const filename = `${Math.random().toString(36)}`;
    await fs.writeFileSync(`./${filename}.gif`, image);
    child_process.exec(
        `ffmpeg -i ./${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./${filename}.mp4`
    );
    await sleep(4000);

    const buffer5 = await fs.readFileSync(`./${filename}.mp4`);
    Promise.all([unlink(`./${filename}.mp4`), unlink(`./${filename}.gif`)]);
    return buffer5;
};

// Function to generate reaction commands
const generateReactionCommand = (reactionName, reactionEmoji, commandName, action) => {
    xforcemd({
        nomCom: commandName,
        category: "Reaction",
        reaction: reactionEmoji,
    },
        async (originMessage, zk, commandOptions) => {
            const { authorMessage, authorMsgReplied, reply, ms, msgReplied } = commandOptions;

            const url = `https://api.waifu.pics/sfw/${reactionName}`;
            try {
                const response = await axios.get(url);
                const imageUrl = response.data.url;

                // Get the GIF buffer using the getBuffer function
                const gifBufferResponse = await axios.get(imageUrl, {
                    responseType: 'arraybuffer'
                });
                const gifBuffer = await gifBufferResponse.data;

                // Convert the GIF to video and get the video buffer
                const videoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

                // Send the video with xforcemd
                if (msgReplied) {
                    const txt = `@${authorMessage.split("@")[0]} ${action} @${authorMsgReplied.split("@")[0]}`;
                    zk.sendMessage(originMessage, { video: videoBuffer, gifPlayback: true, caption: txt, mentions: [authorMessage, authorMsgReplied] }, { quoted: ms });
                } else {
                    const videoMessage = {
                        video: videoBuffer,
                        gifPlayback: true,
                        caption: `@${authorMessage.split("@")[0]} ${action} themselves.`,
                        mentions: [authorMessage]
                    };
                    zk.sendMessage(originMessage, videoMessage, { quoted: ms });
                }
            } catch (error) {
                reply('Error retrieving data: ' + error);
                console.log(error);
            }
        });
};

// Existing reaction commands
generateReactionCommand("bully", "👊", "tease", "teased");
generateReactionCommand("cuddle", "🤗", "cuddle", "cuddled");
generateReactionCommand("cry", "😢", "cry", "cried for");
generateReactionCommand("hug", "😊", "hug", "gave a hug to");
generateReactionCommand("awoo", "🐺", "awoo", "awoo");
generateReactionCommand("kiss", "😘", "kiss", "kissed");
generateReactionCommand("lick", "👅", "lick", "licked");
generateReactionCommand("pat", "👋", "pat", "patted");
generateReactionCommand("smug", "😏", "smug", "gave a smug smile to");
generateReactionCommand("bonk", "🔨", "bonk", "bonked");
generateReactionCommand("yeet", "🚀", "throw", "thrown");
generateReactionCommand("blush", "😊", "blush", "blushed at");
generateReactionCommand("smile", "😄", "smile", "smiled at");
generateReactionCommand("wave", "👋", "wave", "waved at");
generateReactionCommand("highfive", "✋", "high-five", "high-fived");
generateReactionCommand("handhold", "🤝", "hold hands", "held hands with");
generateReactionCommand("nom", "🍴", "eat", "ate");
generateReactionCommand("bite", "🦷", "bite", "bit");
generateReactionCommand("glomp", "🤗", "glomp", "glomped");
generateReactionCommand("slap", "👋", "slap", "slapped");
generateReactionCommand("kill", "💀", "kill", "killed");
generateReactionCommand("kick", "🦵", "kick", "kicked");
generateReactionCommand("happy", "😄", "happy", "looks happy for");
generateReactionCommand("wink", "😉", "wink", "winked at");
generateReactionCommand("poke", "👉", "poke", "poked");
generateReactionCommand("dance", "💃", "dance", "danced for");
generateReactionCommand("cringe", "😬", "cringe", "looks cringe at");

// New playful and suggestive reactions
generateReactionCommand("punch", "🥊", "punch", "punched");
generateReactionCommand("blowkiss", "😘", "blow a kiss", "blew a kiss to");
generateReactionCommand("spank", "🍑", "spank", "spanked");
generateReactionCommand("snuggle", "🤗", "snuggle", "snuggled with");
generateReactionCommand("tickle", "😜", "tickle", "tickled");
generateReactionCommand("love", "❤️", "love", "loved");
generateReactionCommand("seduce", "🔥", "seduce", "seduced");
generateReactionCommand("boop", "👃", "boop", "booped on the nose");
generateReactionCommand("bite", "🦷", "bite gently", "gently bit");
generateReactionCommand("spoon", "🍯", "spoon", "spooned");
generateReactionCommand("biteLip", "😏", "bite lip", "bit their lip at");
generateReactionCommand("whisper", "🗣️", "whisper", "whispered to");
generateReactionCommand("striptease", "🕺", "tease", "teased with a strip");
generateReactionCommand("lapdance", "💃", "lap dance", "gave a lap dance to");
generateReactionCommand("massage", "💆", "massage", "massaged");
generateReactionCommand("tease", "😉", "tease", "teased");
generateReactionCommand("sensual", "🔥", "sensual touch", "sensually touched");
generateReactionCommand("twerk", "🍑", "twerk", "twerked for");
generateReactionCommand("grind", "🍆", "grind", "grinded on");
generateReactionCommand("moan", "😏", "moan", "moaned for");
generateReactionCommand("lickLips", "👅", "lick lips", "licked their lips at");
generateReactionCommand("pant", "😮‍💨", "pant", "panted heavily for");
generateReactionCommand("strip", "🩲", "strip", "stripped for");
generateReactionCommand("nibble", "🍬", "nibble", "nibbled on");
// Additional playful and expressive reactions
generateReactionCommand("tickle", "😂", "tickle", "tickled");
generateReactionCommand("shy", "😳", "shy", "became shy in front of");
generateReactionCommand("blow", "💨", "blow", "blew air at");
generateReactionCommand("facepalm", "🤦", "facepalm", "facepalmed");
generateReactionCommand("peck", "🐥", "peck", "pecked lightly");
generateReactionCommand("lovebite", "🦷", "love bite", "gave a love bite to");
generateReactionCommand("spit", "💦", "spit", "spat at");
generateReactionCommand("giggle", "😆", "giggle", "giggled at");
generateReactionCommand("smirk", "😏", "smirk", "smirked at");
generateReactionCommand("eyebrowRaise", "🤨", "raise eyebrow", "raised an eyebrow at");
generateReactionCommand("blowraspberry", "😛", "blow raspberry", "blew a raspberry at");
generateReactionCommand("pout", "😡", "pout", "pouted at");
generateReactionCommand("blowkiss", "😘", "blow kiss", "blew a kiss to");
generateReactionCommand("yawn", "🥱", "yawn", "yawned at");
generateReactionCommand("seduce", "🔥", "seduce", "seduced playfully");
generateReactionCommand("twirl", "💃", "twirl", "twirled gracefully");
generateReactionCommand("nuzzle", "🤭", "nuzzle", "nuzzled");
generateReactionCommand("rub", "🤲", "rub", "rubbed affectionately");
generateReactionCommand("flick", "✋", "flick", "flicked playfully");
generateReactionCommand("wiggle", "🕺", "wiggle", "wiggled around");
generateReactionCommand("shiver", "🥶", "shiver", "shivered from excitement");
generateReactionCommand("poke", "👉", "poke", "poked playfully");
generateReactionCommand("grin", "😁", "grin", "grinned widely at");
generateReactionCommand("melt", "🌸", "melt", "melted in front of");
generateReactionCommand("tickleFight", "🤪", "tickle fight", "started a tickle fight with");
generateReactionCommand("mock", "😈", "mock", "mocked teasingly");
generateReactionCommand("dare", "😎", "dare", "dared boldly");
generateReactionCommand("compliment", "🥰", "compliment", "complimented");
generateReactionCommand("nuzzle", "🤗", "nuzzle", "nuzzled gently");
generateReactionCommand("glare", "😠", "glare", "glared fiercely at");
generateReactionCommand("scare", "👻", "scare", "scared playfully");
generateReactionCommand("flirt", "😋", "flirt", "flirted with");
generateReactionCommand("bellyRub", "🐾", "belly rub", "rubbed belly gently");
generateReactionCommand("whistle", "🎶", "whistle", "whistled at");
generateReactionCommand("smooch", "💋", "smooch", "smooched passionately");
generateReactionCommand("chuckle", "😅", "chuckle", "chuckled softly at");
generateReactionCommand("tempt", "🍑", "tempt", "tempted seductively");
generateReactionCommand("grumble", "😤", "grumble", "grumbled in annoyance at");
generateReactionCommand("purr", "🐱", "purr", "purred softly for");
generateReactionCommand("stare", "👀", "stare", "stared intensely at");
generateReactionCommand("noseBoop", "👃", "nose boop", "booped on the nose");
generateReactionCommand("tickleAttack", "🤪", "tickle attack", "launched a tickle attack on");
generateReactionCommand("headpat", "👋", "headpat", "patted on the head");
generateReactionCommand("gasp", "😯", "gasp", "gasped in surprise");
generateReactionCommand("sniff", "👃", "sniff", "sniffed curiously");
generateReactionCommand("hug", "🤗", "hug", "hugged tightly");
generateReactionCommand("groan", "😩", "groan", "groaned loudly");
                        
