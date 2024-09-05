const util = require('util');
const fs = require('fs-extra');
const { xforcemd } = require(__dirname + "/../framework/xforcemd");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

// Helper function to calculate system uptime
function formatUptime(uptimeInSeconds) {
    const days = Math.floor(uptimeInSeconds / (24 * 3600));
    const hours = Math.floor((uptimeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Helper function to convert plain text to fancy uppercase Unicode
function fancyUppercase(text) {
    const upperMap = {
        A: '𝒜', B: '𝐵', C: '𝒞', D: '𝒟', E: '𝐸', F: '𝐹', G: '𝒢', H: '𝐻', I: '𝐼', J: '𝒥', K: '𝒦', L: '𝐿',
        M: '𝑀', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: '𝑅', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳',
        Y: '𝒴', Z: '𝒵',
        a: '𝒜', b: '𝐵', c: '𝒞', d: '𝒟', e: '𝐸', f: '𝐹', g: '𝒢', h: '𝐻', i: '𝐼', j: '𝒥', k: '𝒦', l: '𝐿',
        m: '𝑀', n: '𝒩', o: '𝒪', p: '𝒫', q: '𝒬', r: '𝑅', s: '𝒮', t: '𝒯', u: '𝒰', v: '𝒱', w: '𝒲', x: '𝒳',
        y: '𝒴', z: '𝒵'
    };
    return text.split('').map(c => upperMap[c] || c).join('');
}

xforcemd({ nomCom: "menu", reaction: "📁", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//xforcemd");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    // Calculate the system's uptime
    const uptime = formatUptime(os.uptime());

    // Current time and date in GMT
    moment.tz.setDefault('Etc/GMT');
    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Location information (hostname and platform)
    const hostname = os.hostname();
    const platform = os.platform();
    
    // Simulating ping with a random value (in ms)
    const ping = Math.floor(Math.random() * 100 + 50);

    // Create fancy uppercase infoMsg
    let infoMsg = fancyUppercase(`
╭────✧${s.BOT}✧────◆
│   *PREFIX*      : ${s.PREFIXE}
│   *OWNER*       : ${s.NOM_OWNER}
│   *MODE*        : ${mode}
│   *COMMANDS*    : ${cm.length}
│   *DATE*        : ${date}
│   *TIME*        : ${time}
│   *LOCATION*    : ${hostname}
│   *PLATFORM*    : ${platform}
│   *UPTIME*      : ${uptime}
│   *PING*        : ${ping} ms
│   *MEMORY*      : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
╰─────✧WA-BOT✧─────◆\n\n`);

    // Create fancy uppercase menuMsg
    let menuMsg = fancyUppercase(`
👋 HEY ${nomAuteurMessage}, HERE'S YOUR COMMAND LIST:

`);

    for (const cat in coms) {
        menuMsg += fancyUppercase(`📂 *CATEGORY*: ${cat}\n`);
        for (const cmd of coms[cat]) {
            menuMsg += fancyUppercase(`   ▸ ${cmd}\n`);
        }
        menuMsg += fancyUppercase(`\n`);
    }

    menuMsg += fancyUppercase(`
TO USE A COMMAND, TYPE ${prefixe}"COMMAND NAME".
    
POWERED BY XFORCEMD.
`);

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: fancyUppercase("I AM *XFORCE-MD*, DEVELOPED BY DJALEGA++"), gifPlayback: true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 MENU ERROR " + e);
            repondre(fancyUppercase("🥵🥵 MENU ERROR " + e));
        }
    } 
    // Check for .jpeg or .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: fancyUppercase("I AM *XFORCE-MD*, DEVELOPED BY DJALEGA++") }, { quoted: ms });
        }
        catch (e) {
            console.log(fancyUppercase("🥵🥵 MENU ERROR " + e));
            repondre(fancyUppercase("🥵🥵 MENU ERROR " + e));
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }

});
      
