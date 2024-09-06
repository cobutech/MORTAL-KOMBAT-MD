const { xforcemd } = require('../framework/xforcemd');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../bdd/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("../bdd/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../bdd/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo } = require("../bdd/sudo");

const sleep = (ms) => {
  return new Promise((resolve) => { setTimeout(resolve, ms) });
};

// Command: Telegram Sticker Downloader
xforcemd({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Command reserved for the bot owner'); return;
  }

  if (!arg[0]) {
    repondre("Please insert a Telegram sticker link");
    return;
  }

  let lien = arg.join(' ');
  let name = lien.split('/addstickers/')[1];
  let api = 'https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=' + encodeURIComponent(name);

  try {
    let stickers = await axios.get(api);
    let type = stickers.data.result.is_animated || stickers.data.result.is_video ? 'Animated Stickers' : 'Non-animated Stickers';
    let msg = `Xforce-Stickers-dl\n\n*Name:* ${stickers.data.result.name}\n*Type:* ${type}\n*Sticker count:* ${stickers.data.result.stickers.length}\nDownloading...`;

    await repondre(msg);

    for (let i = 0; i < stickers.data.result.stickers.length; i++) {
      let file = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${stickers.data.result.stickers[i].file_id}`);
      let buffer = await axios({
        method: 'get',
        url: `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file.data.result.file_path}`,
        responseType: 'arraybuffer'
      });

      const sticker = new Sticker(buffer.data, {
        pack: nomAuteurMessage,
        author: "Xforce-Md",
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer();
      await zk.sendMessage(dest, { sticker: stickerBuffer }, { quoted: ms });
    }

  } catch (e) {
    repondre("Error during the procedure \n", e);
  }
});

// Command: Create a new group
xforcemd({ nomCom: "crew", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) { repondre("Reserved for moderators"); return };

  if (!arg[0]) { repondre('Please enter the group name to create'); return };
  if (!msgRepondu) { repondre('Please mention a member to add'); return; }

  const name = arg.join(" ");
  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu]);
  zk.sendMessage(group.id, { text: `Welcome to ${name}` });
});

// Command: Leave group
xforcemd({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, superUser } = commandeOptions;
  if (!verifGroupe) { repondre("Command reserved for groups only"); return };
  if (!superUser) {
    repondre("Command reserved for the owner");
    return;
  }
  await zk.groupLeave(dest);
});

// Command: Join group
xforcemd({ nomCom: "rejoindre", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { arg, repondre, superUser } = commandeOptions;

  if (!superUser) {
    repondre("Command reserved for the bot owner");
    return;
  }
  let result = arg[0].split('https://chat.whatsapp.com/')[1];
  await zk.groupAcceptInvite(result);
  repondre('Success');
});

// Command: Get JID (WhatsApp ID)
xforcemd({ nomCom: "jid", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, msgRepondu, dest: destination } = commandeOptions;

  if (!superUser) {
    repondre("Command reserved for the bot owner");
    return;
  }
  const jid = msgRepondu ? msgRepondu.sender : destination;
  zk.sendMessage(dest, { text: jid }, { quoted: ms });
});

// Add similar changes and translations for all other commands...
// Command: Save media or text messages
xforcemd({ nomCom: "save", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, msgRepondu, auteurMessage } = commandeOptions;
  
  if (superUser) {
    if (msgRepondu) {
      let msg;

      if (msgRepondu.imageMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = { image: { url: media }, caption: msgRepondu.imageMessage.caption };
      } else if (msgRepondu.videoMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = { video: { url: media }, caption: msgRepondu.videoMessage.caption };
      } else if (msgRepondu.audioMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = { audio: { url: media }, mimetype: 'audio/mp4' };
      } else if (msgRepondu.stickerMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        let stickerMess = new Sticker(media, {
          pack: 'Xforce-Tag',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else {
        msg = { text: msgRepondu.conversation };
      }

      zk.sendMessage(auteurMessage, msg);
    } else {
      repondre('Please mention the message to save.');
    }
  } else {
    repondre('Command reserved for moderators.');
  }
});

// Command: Block a user
xforcemd({ nomCom: "block", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, msgRepondu, dest: destination } = commandeOptions;

  if (!superUser) {
    repondre("Command reserved for the bot owner");
    return;
  }

  const jid = msgRepondu ? msgRepondu.sender : destination;
  await zk.updateBlockStatus(jid, "block");
  repondre('Success');
});

// Command: Unblock a user
xforcemd({ nomCom: "deblock", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, msgRepondu, dest: destination } = commandeOptions;

  if (!superUser) {
    repondre("Command reserved for the bot owner");
    return;
  }

  const jid = msgRepondu ? msgRepondu.sender : destination;
  await zk.updateBlockStatus(jid, "unblock");
  repondre('Success');
});

// Command: Purge group (remove non-admin members)
xforcemd({ nomCom: "purge", categorie: "Group", reaction: "📣" }, async (dest, zk, commandeOptions) => {
  const { auteurMessage, repondre, verifGroupe, superUser, nomGroupe, infosGroupe } = commandeOptions;
  const metadata = await zk.groupMetadata(dest);

  if (!verifGroupe) {
    repondre("This command is reserved for groups only");
    return;
  }

  if (superUser || auteurMessage === metadata.owner) {
    repondre('Non-admin members will be removed from the group. You have 5 seconds to cancel by restarting the bot.');
    await sleep(5000);
    let groupMembers = verifGroupe ? await infosGroupe.participants : "";
    try {
      let nonAdmins = groupMembers.filter((member) => !member.admin);
      for (const member of nonAdmins) {
        await zk.groupParticipantsUpdate(dest, [member.id], "remove");
        await sleep(500);
      }
    } catch (e) {
      repondre("I need admin rights to perform this action.");
    }
  } else {
    repondre("Command reserved for the group owner for security reasons.");
  }
});

// Command: Ban or unban a user from using the bot
xforcemd({ nomCom: "ban", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, msgRepondu, superUser } = commandeOptions;

  if (!superUser) {
    repondre('This command is only allowed for the bot owner');
    return;
  }

  if (!arg[0]) {
    repondre(`Mention the victim by typing ${prefixe}ban add/del to ban/unban the user`);
    return;
  }

  if (msgRepondu) {
    switch (arg.join(' ')) {
      case 'add':
        let isBanned = await isUserBanned(msgRepondu.sender);
        if (isBanned) {
          repondre('This user is already banned');
          return;
        }
        addUserToBanList(msgRepondu.sender);
        repondre('This user has been banned from using the bot.');
        break;
      case 'del':
        let isUserAlreadyBanned = await isUserBanned(msgRepondu.sender);
        if (isUserAlreadyBanned) {
          removeUserFromBanList(msgRepondu.sender);
          repondre('This user is now unbanned.');
        } else {
          repondre('This user is not banned.');
        }
        break;
      default:
        repondre('Invalid option.');
    }
  } else {
    repondre('Please mention the victim');
  }
});

// Command: Ban or unban a group from using the bot
xforcemd({ nomCom: "bangroup", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, superUser, verifGroupe } = commandeOptions;

  if (!superUser) {
    repondre('This command is only allowed for the bot owner');
    return;
  }

  if (!verifGroupe) {
    repondre('This command is reserved for groups');
    return;
  }

  if (!arg[0]) {
    repondre(`Type ${prefixe}bangroup add/del to ban/unban the group`);
    return;
  }

  const isGroupAlreadyBanned = await isGroupBanned(dest);
  switch (arg.join(' ')) {
    case 'add':
      if (isGroupAlreadyBanned) {
        repondre('This group is already banned');
        return;
      }
      addGroupToBanList(dest);
      repondre('This group has been banned.');
      break;
    case 'del':
      if (isGroupAlreadyBanned) {
        removeGroupFromBanList(dest);
        repondre('This group is now unbanned.');
      } else {
        repondre('This group is not banned.');
      }
      break;
    default:
      repondre('Invalid option.');
  }
});

// Continue adding translations and changing 'zokou' to 'xforcemd' for all other commands...
   // Command: Enable or disable only admin mode for a group
xforcemd({ nomCom: 'onlyadmin', categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, superUser, verifGroupe, verifAdmin } = commandeOptions;

  if (superUser || verifAdmin) {
    if (!verifGroupe) {
      repondre('This command is reserved for groups');
      return;
    }

    if (!arg[0]) {
      repondre(`Type ${prefixe}onlyadmin add/del to enable/disable only admin mode`);
      return;
    }

    const isGroupAdminOnly = await isGroupOnlyAdmin(dest);
    switch (arg.join(' ')) {
      case 'add':
        if (isGroupAdminOnly) {
          repondre('This group is already in only admin mode');
          return;
        }
        addGroupToOnlyAdminList(dest);
        repondre('Only admin mode is now enabled for this group');
        break;
      case 'del':
        if (isGroupAdminOnly) {
          removeGroupFromOnlyAdminList(dest);
          repondre('This group is no longer in only admin mode');
        } else {
          repondre('This group is not in only admin mode');
        }
        break;
      default:
        repondre('Invalid option');
    }
  } else {
    repondre('You do not have permission for this command');
  }
});

// Command: Sudo management (add or remove sudo users)
xforcemd({ nomCom: 'sudo', categorie: 'Mods' }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, msgRepondu, superUser } = commandeOptions;

  if (!superUser) {
    repondre('This command is only allowed for the bot owner');
    return;
  }

  if (!arg[0]) {
    repondre(`Mention the user by typing ${prefixe}sudo add/del`);
    return;
  }

  if (msgRepondu) {
    switch (arg.join(' ')) {
      case 'add':
        let isSudo = await issudo(msgRepondu.sender);
        if (isSudo) {
          repondre('This user is already a sudo user');
          return;
        }
        addSudoNumber(msgRepondu.sender);
        repondre('Success');
        break;
      case 'del':
        let isSudoUser = await issudo(msgRepondu.sender);
        if (isSudoUser) {
          removeSudoNumber(msgRepondu.sender);
          repondre('This user is no longer a sudo user');
        } else {
          repondre('This user is not a sudo user');
        }
        break;
      default:
        repondre('Invalid option');
    }
  } else {
    repondre('Please mention the user');
  }
});

// Command: Mention management
xforcemd({ nomCom: 'mention', categorie: 'Mods' }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, superUser } = commandeOptions;

  if (!superUser) {
    repondre('You do not have permission for this command');
    return;
  }

  const mbdd = require('../bdd/mention');
  let allData = await mbdd.recupererToutesLesValeurs();
  let data = allData[0];

  if (!arg || arg.length < 1) {
    let status;
    if (allData.length === 0) {
      repondre(`*Instructions:*
      - To enable or modify mention, follow this syntax: mention link type message
      The different types are audio, video, image, sticker
      
      Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hello, I am Luffy`);
      return;
    }

    status = data.status === 'no' ? 'Disabled' : 'Enabled';
    let messageType = data.type || 'No data';
    let url = data.url || 'No data';

    let msg = `*Status:* ${status}
    *Type:* ${messageType}
    *Link:* ${url}
    
    *Instructions:*
    - To enable or modify mention, follow this syntax: mention link type message
    The different types are audio, video, image, sticker
    
    Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hello, I am Luffy
    
    - To stop the mention, use mention stop`;

    repondre(msg);
    return;
  }

  if (arg.length >= 2) {
    if (arg[0].startsWith('http') && (arg[1] === 'image' || arg[1] === 'audio' || arg[1] === 'video' || arg[1] === 'sticker')) {
      let messageArgs = [];
      for (let i = 2; i < arg.length; i++) {
        messageArgs.push(arg[i]);
      }
      let message = messageArgs.join(' ') || '';
      await mbdd.addOrUpdateDataInMention(arg[0], arg[1], message);
      await mbdd.modifierStatusId1('yes').then(() => {
        repondre('Mention saved');
      });
    } else {
      repondre('*Instructions:* To enable or modify mention, follow this syntax: *mention link type*; The different types are audio, video, image, sticker');
    }
  } else if (arg.length === 1 && arg[0] === 'stop') {
    await mbdd.modifierStatusId1('no').then(() => {
      repondre('Mention stopped');
    });
  } else {
    repondre('Please follow the instructions');
  }
});
// Anti-delete feature: Prevent users from deleting messages
xforcemd({ nomCom: "antidelete", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, arg, verifGroupe } = commandeOptions;
  
  if (!verifGroupe) {
    repondre("This command is only available in groups.");
    return;
  }

  if (!superUser) {
    repondre("Command reserved for the bot owner.");
    return;
  }

  if (!arg[0] || (arg[0] !== "on" && arg[0] !== "off")) {
    repondre("Please specify 'on' or 'off' to enable or disable the antidelete feature.");
    return;
  }

  // Turn antidelete on or off
  if (arg[0] === "on") {
    zk.setAntidelete(dest, true);  // Assuming there is a method setAntidelete in the bot framework
    repondre("Antidelete is now active. Users cannot delete their messages.");
  } else {
    zk.setAntidelete(dest, false);
    repondre("Antidelete is now deactivated.");
  }
});

// Anti-call feature: Automatically blocks users who try to call the bot
xforcemd({ nomCom: "anticall", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, arg } = commandeOptions;
  
  if (!superUser) {
    repondre("Command reserved for the bot owner.");
    return;
  }

  if (!arg[0] || (arg[0] !== "on" && arg[0] !== "off")) {
    repondre("Please specify 'on' or 'off' to enable or disable the anticall feature.");
    return;
  }

  // Turn anticall on or off
  if (arg[0] === "on") {
    zk.setAnticall(true);  // Assuming there is a method setAnticall in the bot framework
    repondre("Anticall is now active. Users who call the bot will be blocked.");
  } else {
    zk.setAnticall(false);
    repondre("Anticall is now deactivated.");
  }
});

// Ping command: Check the bot's response time
xforcemd({ nomCom: "ping", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  const start = Date.now();
  await repondre("Pong!");
  const end = Date.now();
  
  const ping = end - start;
  repondre(`Response time: ${ping} ms`);
});

// Info command: Display bot's system information (memory usage, uptime, etc.)
xforcemd({ nomCom: "info", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const os = require('os');
  const moment = require('moment');

  const uptime = moment.duration(os.uptime(), "seconds").humanize();
  const memoryUsage = `${Math.round(os.freemem() / 1024 / 1024)} MB free / ${Math.round(os.totalmem() / 1024 / 1024)} MB total`;

  const msg = `
  *Bot Information*:
  - Uptime: ${uptime}
  - Memory Usage: ${memoryUsage}
  - Platform: ${os.platform()}
  - Release: ${os.release()}
  - CPU: ${os.cpus()[0].model}
  `;

  repondre(msg);
});

// Clean command: Delete all bot messages in the chat
xforcemd({ nomCom: "clean", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe } = commandeOptions;

  if (!superUser) {
    repondre("This command is only for the bot owner.");
    return;
  }

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  const botMessages = await zk.fetchAllBotMessages(dest);  // Assuming a method exists to fetch bot messages
  for (const msg of botMessages) {
    await zk.deleteMessage(dest, { id: msg.id });
  }

  repondre("All bot messages have been cleaned from the chat.");
});
         
// Kick command: Remove a user from the group
xforcemd({ nomCom: "kick", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe, msgRepondu } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  if (!msgRepondu) {
    repondre("Please mention the user to kick.");
    return;
  }

  const userId = msgRepondu.sender;
  await zk.groupParticipantsUpdate(dest, [userId], "remove");
  repondre(`User ${userId.split('@')[0]} has been kicked from the group.`);
});

// Mute command: Mute the group for a specific duration
xforcemd({ nomCom: "mute", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  const duration = parseInt(arg[0], 10) || 0;
  if (duration === 0) {
    repondre("Please specify a valid duration in minutes.");
    return;
  }

  const muteUntil = Date.now() + duration * 60 * 1000;  // Convert minutes to milliseconds
  await zk.groupSettingUpdate(dest, "announcement", true);  // Mute the group (announcement mode)
  repondre(`The group has been muted for ${duration} minutes.`);

  setTimeout(async () => {
    await zk.groupSettingUpdate(dest, "announcement", false);  // Unmute the group after the duration
    zk.sendMessage(dest, { text: "The group has been unmuted." });
  }, duration * 60 * 1000);  // Automatically unmute after the specified duration
});

// Unmute command: Unmute the group
xforcemd({ nomCom: "unmute", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  await zk.groupSettingUpdate(dest, "announcement", false);  // Unmute the group (disable announcement mode)
  repondre("The group has been unmuted.");
});

// Set Welcome Message: Set a custom welcome message for new members
xforcemd({ nomCom: "setwelcome", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, arg, verifGroupe } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  if (!arg[0]) {
    repondre("Please specify a welcome message.");
    return;
  }

  const welcomeMessage = arg.join(' ');
  await zk.setWelcomeMessage(dest, welcomeMessage);  // Assuming there is a method to set welcome messages
  repondre(`The welcome message has been set to: "${welcomeMessage}"`);
});

// Temporary Ban command: Temporarily ban a user for a specified duration
xforcemd({ nomCom: "tempban", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe, msgRepondu, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  if (!msgRepondu) {
    repondre("Please mention the user to ban.");
    return;
  }

  const userId = msgRepondu.sender;
  const duration = parseInt(arg[0], 10) || 0;

  if (duration === 0) {
    repondre("Please specify a valid ban duration in minutes.");
    return;
  }

  await zk.groupParticipantsUpdate(dest, [userId], "remove");  // Temporarily remove the user from the group
  repondre(`User ${userId.split('@')[0]} has been temporarily banned for ${duration} minutes.`);

  setTimeout(async () => {
    await zk.groupParticipantsUpdate(dest, [userId], "add");  // Re-add the user to the group after the duration
    zk.sendMessage(dest, { text: `User ${userId.split('@')[0]} has been unbanned and rejoined the group.` });
  }, duration * 60 * 1000);  // Automatically unban after the specified duration
});
 // Warn command: Add a warning to a user
xforcemd({ nomCom: "warn", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe, msgRepondu } = commandeOptions;
  const { addWarning, getWarnings } = require("../bdd/warnings");  // Assuming a warnings database exists

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  if (!msgRepondu) {
    repondre("Please mention the user to warn.");
    return;
  }

  const userId = msgRepondu.sender;
  await addWarning(userId);  // Add a warning to the user in the database
  const warnings = await getWarnings(userId);  // Get the user's total warnings

  repondre(`User ${userId.split('@')[0]} has been warned. They now have ${warnings} warnings.`);
});

// Check Warnings command: Check how many warnings a user has
xforcemd({ nomCom: "checkwarn", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe, msgRepondu } = commandeOptions;
  const { getWarnings } = require("../bdd/warnings");

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  if (!msgRepondu) {
    repondre("Please mention the user to check their warnings.");
    return;
  }

  const userId = msgRepondu.sender;
  const warnings = await getWarnings(userId);  // Get the user's total warnings
  repondre(`User ${userId.split('@')[0]} has ${warnings} warnings.`);
});

// Reset Warnings command: Reset a user's warnings
xforcemd({ nomCom: "resetwarn", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, superUser, verifGroupe, msgRepondu } = commandeOptions;
  const { resetWarnings } = require("../bdd/warnings");

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  if (!superUser) {
    repondre("This command is only allowed for the bot owner.");
    return;
  }

  if (!msgRepondu) {
    repondre("Please mention the user to reset their warnings.");
    return;
  }

  const userId = msgRepondu.sender;
  await resetWarnings(userId);  // Reset the user's warnings in the database
  repondre(`User ${userId.split('@')[0]}'s warnings have been reset.`);
});

// Greet All command: Send a greeting message to all group members
xforcemd({ nomCom: "greetall", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, infosGroupe, nomAuteurMessage } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups.");
    return;
  }

  let groupMembers = verifGroupe ? await infosGroupe.participants : "";

  let message = `👋 Hello everyone! This is ${nomAuteurMessage} welcoming all of you! 😊`;

  let tag = `${message}\n\n`;
  for (const member of groupMembers) {
    tag += `@${member.id.split("@")[0]}\n`;
  }

  zk.sendMessage(dest, { text: tag, mentions: groupMembers.map((m) => m.id) });
});
// Translate command: Translate text to a specified language
xforcemd({ nomCom: "translate", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, superUser } = commandeOptions;
  const translate = require('translate-google');  // Use translate-google npm package or an API like Google Translate
  
  if (!superUser) {
    repondre("This command is reserved for the bot owner.");
    return;
  }

  if (!arg[0]) {
    repondre("Please specify the text you want to translate.");
    return;
  }

  if (!arg[1]) {
    repondre("Please specify the target language (e.g., en for English, es for Spanish).");
    return;
  }

  const textToTranslate = arg.slice(1).join(' ');
  const targetLanguage = arg[0];

  try {
    const translatedText = await translate(textToTranslate, { to: targetLanguage });
    repondre(`Translation: ${translatedText}`);
  } catch (e) {
    repondre("An error occurred while translating. Please try again.");
  }
});

// Reverse Text command: Reverse the given text
xforcemd({ nomCom: "reverse", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please provide the text you want to reverse.");
    return;
  }

  const textToReverse = arg.join(' ');
  const reversedText = textToReverse.split('').reverse().join('');
  repondre(`Reversed Text: ${reversedText}`);
});

// Weather command: Fetch the current weather for a location
xforcemd({ nomCom: "weather", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, superUser } = commandeOptions;
  const axios = require('axios');  // Axios to make API calls

  if (!arg[0]) {
    repondre("Please specify a city to get the weather.");
    return;
  }

  const city = arg.join(' ');
  const apiKey = "YOUR_WEATHER_API_KEY";  // Replace with your actual weather API key from a provider like OpenWeatherMap

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = response.data;

    const weatherInfo = `
    Weather in ${weatherData.name}:
    - Temperature: ${weatherData.main.temp}°C
    - Description: ${weatherData.weather[0].description}
    - Humidity: ${weatherData.main.humidity}%
    - Wind Speed: ${weatherData.wind.speed} m/s
    `;

    repondre(weatherInfo);
  } catch (e) {
    repondre("Unable to fetch weather data. Please try again.");
  }
});

// Quote command: Get a random motivational quote
xforcemd({ nomCom: "quote", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;
  const axios = require('axios');

  try {
    const response = await axios.get("https://api.quotable.io/random");  // Random quote API
    const quote = response.data;

    repondre(`"${quote.content}" — ${quote.author}`);
  } catch (e) {
    repondre("Unable to fetch a quote. Please try again.");
  }
});

// Math command: Perform basic math operations (addition, subtraction, multiplication, division)
xforcemd({ nomCom: "math", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please provide a math expression to calculate (e.g., 5 + 5, 10 * 2).");
    return;
  }

  try {
    const mathExpression = arg.join(' ');
    const result = eval(mathExpression);  // Use eval to calculate basic math expressions (e.g., 2 + 2, 5 * 3)
    
    repondre(`Result: ${result}`);
  } catch (e) {
    repondre("Invalid math expression. Please try again.");
  }
});

// Dice Roll command: Simulate rolling a dice
xforcemd({ nomCom: "roll", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  const diceRoll = Math.floor(Math.random() * 6) + 1;  // Random number between 1 and 6
  repondre(`🎲 You rolled a ${diceRoll}`);
});
                                                           
