const { xforcemd } = require("../framework/xforcemd");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid, atbmettreAJourAction } = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const axios = require('axios');
const fs = require("fs-extra");
const { recupevents } = require('../bdd/welcome');
const { exec } = require("child_process");

xforcemd({ nomCom: "appel", categorie: "Group", reaction: "📣" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 This command is only for groups ❌");
    return;
  }
  const mess = arg && arg !== ' ' ? arg.join(' ') : 'No message provided';
  let membersGroup = verifGroupe ? await infosGroupe.participants : "";
  let tag = `
========================
        🌟 *xforcemd* 🌟
========================
👥 Group: ${nomGroupe} 🚀 
👤 Author: *${nomAuteurMessage}* 👋 
📜 Message: *${mess}* 📝
========================\n`;

  let emojis = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$','😟','🥵','🐅'];
  let randomEmoji = Math.floor(Math.random() * emojis.length);

  for (const member of membersGroup) {
    tag += `${emojis[randomEmoji]} @${member.id.split("@")[0]}\n`;
  }

  if (verifAdmin || superUser) {
    zk.sendMessage(dest, { text: tag, mentions: membersGroup.map((i) => i.id) }, { quoted: ms });
  } else {
    repondre('This command is for admins only');
  }
});

xforcemd({ nomCom: "lien", categorie: "Group", reaction: "🙋" }, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
  if (!verifGroupe) {
    repondre("This command is only for groups.");
    return;
  }

  var link = await zk.groupInviteCode(dest);
  var inviteLink = `https://chat.whatsapp.com/${link}`;
  repondre(`Hello ${nomAuteurMessage}, here is the invite link for the group ${nomGroupe}:\n\nLink: ${inviteLink}`);
});

/** Promote a member to admin */
xforcemd({ nomCom: "nommer", categorie: "Group", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membersGroup = verifGroupe ? await infosGroupe.participants : "";
  if (!verifGroupe) {
    return repondre("This command is for groups only.");
  }

  const groupMeta = await zk.groupMetadata(dest);

  if (await recupevents(dest, 'antipromote') === 'yes' && (groupMeta.author !== auteurMessage)) {
    repondre("You are not allowed to promote participants due to active antipromote settings.");
    return;
  }

  const verifyMember = (user) => membersGroup.some(m => m.id === user);
  const getAdmins = (membersGroup) => membersGroup.filter(m => m.admin).map(m => m.id);

  let adminList = getAdmins(membersGroup);
  let isAdmin = adminList.includes(auteurMsgRepondu);
  let isMember = verifyMember(auteurMsgRepondu);
  let isBotAdmin = adminList.includes(idBot);
  let isAuthorAdmin = adminList.includes(auteurMessage);

  try {
    if (isAuthorAdmin || superUser) {
      if (msgRepondu) {
        if (isBotAdmin) {
          if (isMember) {
            if (!isAdmin) {
              var msg = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} has been promoted to group admin.`;
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: msg, mentions: [auteurMsgRepondu] });
            } else {
              return repondre("This member is already an admin.");
            }
          } else {
            return repondre("This user is not part of the group.");
          }
        } else {
          return repondre("Sorry, I cannot perform this action as I am not an admin of the group.");
        }
      } else {
        repondre("Please tag the member you want to promote.");
      }
    } else {
      return repondre("Sorry, you cannot perform this action as you are not an admin of the group.");
    }
  } catch (e) {
    repondre("Oops, " + e);
  }
});

/** Demote an admin */
xforcemd({ nomCom: "demettre", categorie: "Group", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membersGroup = verifGroupe ? await infosGroupe.participants : "";
  if (!verifGroupe) {
    return repondre("This command is for groups only.");
  }

  const groupMeta = await zk.groupMetadata(dest);

  if (await recupevents(dest, 'antidemote') === 'yes' && (groupMeta.author !== auteurMessage)) {
    repondre("You are not allowed to demote participants due to active antidemote settings.");
    return;
  }

  const verifyMember = (user) => membersGroup.some(m => m.id === user);
  const getAdmins = (membersGroup) => membersGroup.filter(m => m.admin).map(m => m.id);

  let adminList = getAdmins(membersGroup);
  let isAdmin = adminList.includes(auteurMsgRepondu);
  let isMember = verifyMember(auteurMsgRepondu);
  let isBotAdmin = adminList.includes(idBot);
  let isAuthorAdmin = adminList.includes(auteurMessage);

  try {
    if (isAuthorAdmin || superUser) {
      if (msgRepondu) {
        if (isBotAdmin) {
          if (isMember) {
            if (isAdmin) {
              var msg = `@${auteurMsgRepondu.split("@")[0]} has been demoted from group admin.`;
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              zk.sendMessage(dest, { text: msg, mentions: [auteurMsgRepondu] });
            } else {
              return repondre("This member is not an admin.");
            }
          } else {
            return repondre("This user is not part of the group.");
          }
        } else {
          return repondre("Sorry, I cannot perform this action as I am not an admin of the group.");
        }
      } else {
        repondre("Please tag the member you want to demote.");
      }
    } else {
      return repondre("Sorry, you cannot perform this action as you are not an admin of the group.");
    }
  } catch (e) {
    repondre("Oops, " + e);
  }
});

/** Remove a member */
xforcemd({ nomCom: "retirer", categorie: "Group", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membersGroup = verifGroupe ? await infosGroupe.participants : "";
  if (!verifGroupe) {
    return repondre("This command is for groups only.");
  }

  const verifyMember = (user) => membersGroup.some(m => m.id === user);
  const getAdmins = (membersGroup) => membersGroup.filter(m => m.admin).map(m => m.id);

  let adminList = getAdmins(membersGroup);
  let isAdmin = adminList.includes(auteuMsgRepondu);
  let isMember = verifyMember(auteurMsgRepondu);
  let isAuthorAdmin = adminList.includes(auteurMessage);
  let isBotAdmin = adminList.includes(idBot);

  try {
    if (isAuthorAdmin || superUser) {
      if (msgRepondu) {
        if (isBotAdmin) {
          if (isMember) {
            if (!isAdmin) {
              const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif";
              var sticker = new Sticker(gifLink, {
                pack: 'xforcemd', // Changed to xforcemd
                author: nomAuteurMessage, // The author's name
                type: StickerTypes.FULL, // Sticker type
                categories: ['🤩', '🎉'], // Sticker category
                id: '12345', // Sticker ID
                quality: 50, // Quality
                background: '#000000'
              });

              await sticker.toFile("st.webp");
              var txt = `@${auteurMsgRepondu.split("@")[0]} has been removed from the group.`;
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] });

            } else {
              repondre("This member cannot be removed because they are an admin.");
            }
          } else {
            repondre("This user is not part of the group.");
          }
        } else {
          repondre("Sorry, I cannot perform this action as I am not an admin of the group.");
        }
      } else {
        repondre("Please tag the member you want to remove.");
      }
    } else {
      repondre("Sorry, you cannot perform this action as you are not an admin of the group.");
    }
  } catch (e) {
    repondre("Oops, " + e);
  }
});

/** Delete a message */
xforcemd({ nomCom: "supp", categorie: "Group", reaction: "🧹" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, auteurMsgRepondu, idBot, msgRepondu, verifAdmin, superUser } = commandeOptions;

  if (!msgRepondu) {
    repondre("Please tag the message you want to delete.");
    return;
  }

  if (superUser && auteurMsgRepondu === idBot) {
    const key = {
      remoteJid: dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId
    };
    await zk.sendMessage(dest, { delete: key });
    return;
  }

  if (verifGroupe) {
    if (verifAdmin || superUser) {
      try {
        const key = {
          remoteJid: dest,
          id: ms.message.extendedTextMessage.contextInfo.stanzaId,
          fromMe: false,
          participant: ms.message.extendedTextMessage.contextInfo.participant
        };
        await zk.sendMessage(dest, { delete: key });
        return;
      } catch (e) {
        repondre("I need admin rights to delete the message.");
      }
    } else {
      repondre("Sorry, you are not an admin of the group.");
    }
  }
});

/** Group Information */
xforcemd({ nomCom: "info", categorie: "Group" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, mybotpic } = commandeOptions;
  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  try {
    var ppgroup = await zk.profilePictureUrl(dest, 'image');
  } catch {
    ppgroup = mybotpic();
  }

  const info = await zk.groupMetadata(dest);

  let mess = {
    image: { url: ppgroup },
    caption: `*━━━━『Group Info』━━━━*\n\n*🎐 Name:* ${info.subject}\n\n*🔩 Group ID:* ${dest}\n\n*🔍 Description:* \n\n${info.desc}`
  };

  zk.sendMessage(dest, mess, { quoted: ms });
});

/** Group Open/Close */
xforcemd({ nomCom: "groupe", categorie: "Group" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  if (superUser || verifAdmin) {
    if (!arg[0]) {
      repondre('Instructions:\n\nType "groupe ouvrir" to open or "groupe fermer" to close the group.');
      return;
    }

    const option = arg.join(' ');
    switch (option) {
      case "ouvrir":
        await zk.groupSettingUpdate(dest, 'not_announcement');
        repondre('Group is now open.');
        break;
      case "fermer":
        await zk.groupSettingUpdate(dest, 'announcement');
        repondre('Group is now closed.');
        break;
      default:
        repondre("Please choose a valid option.");
    }
  } else {
    repondre("You do not have permission for this command.");
  }
});
  xforcemd({ nomCom: "auto-admin", categorie: "Group", reaction: "🤖" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  if (superUser || verifAdmin) {
    if (!arg[0]) {
      repondre('Instructions:\n\nType "!auto-admin on" to enable or "!auto-admin off" to disable auto-promotion of new members.');
      return;
    }

    const option = arg[0].toLowerCase();
    switch (option) {
      case "on":
        await mettreAJourAction(dest, "autoAdmin", "on");
        repondre("✅ Auto-admin for new members enabled.");
        break;
      case "off":
        await mettreAJourAction(dest, "autoAdmin", "off");
        repondre("❌ Auto-admin for new members disabled.");
        break;
      default:
        repondre("Please choose a valid option.");
    }
  } else {
    repondre("You do not have permission for this command.");
  }
});
xforcemd({ nomCom: "antilink", categorie: "Group", reaction: "⛔" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  if (superUser || verifAdmin) {
    if (!arg[0]) {
      repondre('Instructions:\n\nType "!antilink on" to enable or "!antilink off" to disable anti-link protection.');
      return;
    }

    const option = arg[0].toLowerCase();
    switch (option) {
      case "on":
        await mettreAJourAction(dest, "antilink", "on");
        repondre("✅ Anti-link protection enabled.");
        break;
      case "off":
        await mettreAJourAction(dest, "antilink", "off");
        repondre("❌ Anti-link protection disabled.");
        break;
      default:
        repondre("Please choose a valid option.");
    }
  } else {
    repondre("You do not have permission for this command.");
  }
});
xforcemd({ nomCom: "welcome", categorie: "Group", reaction: "👋" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  if (superUser || verifAdmin) {
    if (!arg[0]) {
      repondre('Instructions:\n\nType "!welcome on" to enable or "!welcome off" to disable the welcome message.\nTo set a custom message, type "!welcome set YourMessageHere".');
      return;
    }

    const option = arg[0].toLowerCase();
    switch (option) {
      case "on":
        await mettreAJourAction(dest, "welcome", "on");
        repondre("✅ Welcome message enabled.");
        break;
      case "off":
        await mettreAJourAction(dest, "welcome", "off");
        repondre("❌ Welcome message disabled.");
        break;
      case "set":
        const customMessage = arg.slice(1).join(" ");
        await mettreAJourAction(dest, "customWelcomeMessage", customMessage);
        repondre(`✅ Welcome message set to:\n\n"${customMessage}"`);
        break;
      default:
        repondre("Please choose a valid option.");
    }
  } else {
    repondre("You do not have permission for this command.");
  }
});
xforcemd({ nomCom: "poll", categorie: "Group", reaction: "📊" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomAuteurMessage } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  const [question, ...options] = arg;
  if (!question || options.length < 2) {
    repondre("Please provide a question and at least two options for the poll.\n\nExample: !poll 'Favorite color?' 'Red' 'Blue' 'Green'");
    return;
  }

  let pollMessage = `📊 *Poll:* ${question}\n👤 Created by: ${nomAuteurMessage}\n\n`;

  options.forEach((option, index) => {
    pollMessage += `${index + 1}. ${option}\n`;
  });

  pollMessage += "\nPlease reply with the number of your choice!";
  zk.sendMessage(dest, { text: pollMessage }, { quoted: ms });
});
xforcemd({ nomCom: "silence", categorie: "Group", reaction: "🔇" }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command is reserved for groups only.");
    return;
  }

  if (superUser || verifAdmin) {
    if (!arg[0]) {
      repondre('Instructions:\n\nType "silence on" to mute or "silence off" to unmute the group.');
      return;
    }

    const option = arg.join(' ');
    switch (option) {
      case "on":
        await zk.groupSettingUpdate(dest, 'announcement');
        repondre('🔇 Group has been muted (Only admins can send messages).');
        break;
      case "off":
        await zk.groupSettingUpdate(dest, 'not_announcement');
        repondre('🔊 Group has been unmuted (All members can send messages).');
        break;
      default:
        repondre("Please choose a valid option.");
    }
  } else {
    repondre("You do not have permission for this command.");
  }
});
