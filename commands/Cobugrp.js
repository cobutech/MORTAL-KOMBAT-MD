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

    if (!verifGroupe) { repondre("✋🏿 ✋🏿 This command is reserved for groups ❌"); return; }
    let mess = arg && arg !== ' ' ? arg.join(' ') : 'No Message';

    let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
    let tag = `========================\n  
        🌟 *Xforce-Md* 🌟
========================\n
👥 Group: ${nomGroupe} 🚀 
👤 Author: *${nomAuteurMessage}* 👋 
📜 Message: *${mess}* 📝
========================\n\n`;

    let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
    let random = Math.floor(Math.random() * (emoji.length - 1));

    for (const membre of membresGroupe) {
        tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`;
    }

    if (verifAdmin || superUser) {
        zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms });
    } else { repondre('Command reserved for admins'); }
});

xforcemd({ nomCom: "lien", categorie: "Group", reaction: "🙋" }, async (dest, zk, commandeOptions) => {
    const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
    if (!verifGroupe) { repondre("Wait bro, do you want my DM link?"); return; }

    const link = await zk.groupInviteCode(dest);
    const lien = `https://chat.whatsapp.com/${link}`;
    let mess = `Hi ${nomAuteurMessage}, here is the group link for ${nomGroupe} \n\nLink: ${lien}`;
    repondre(mess);
});

/** *nommer un membre comme admin */
xforcemd({ nomCom: "nommer", categorie: "Group", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
    let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
    let membresGroupe = verifGroupe ? await infosGroupe.participants : "";

    if (!verifGroupe) { return repondre("This is for group use only"); }

    const met = await zk.groupMetadata(dest);

    if (await recupevents(dest, 'antipromote') === 'yes' && met.author !== auteurMessage) {
        repondre('You cannot promote participants as the antipromote is active');
        return;
    }

    const verifMember = (user) => membresGroupe.some(m => m.id === user);
    const memberAdmin = (membresGroupe) => membresGroupe.filter(m => m.admin != null).map(m => m.id);

    let admin = verifGroupe ? memberAdmin(membresGroupe).includes(auteurMsgRepondu) : false;
    let membre = verifMember(auteurMsgRepondu);
    let autAdmin = verifGroupe ? memberAdmin(membresGroupe).includes(auteurMessage) : false;
    let zkad = verifGroupe ? memberAdmin(membresGroupe).includes(idBot) : false;

    try {
        if (autAdmin || superUser) {
            if (msgRepondu) {
                if (zkad) {
                    if (membre) {
                        if (!admin) {
                            const txt = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} has been promoted to group administrator.`;
                            await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
                            zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] });
                        } else { return repondre("This member is already an admin."); }
                    } else { return repondre("This user is not part of the group."); }
                } else { return repondre("Sorry, I cannot perform this action because I am not an admin."); }
            } else { repondre("Please tag the member to promote"); }
        } else { return repondre("Sorry, you cannot perform this action because you are not an admin."); }
    } catch (e) { repondre("Oops " + e); }
});

// Continue translating other commands similarly...
