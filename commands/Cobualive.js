const { xforcemd } = require('../framework/xforcemd');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

xforcemd(
    {
        nomCom: 'alive',
        categorie: 'General'
    }, async (dest, zk, commandeOptions) => {

        const { ms, arg, repondre, superUser } = commandeOptions;

        const data = await getDataFromAlive();

        if (!arg || !arg[0] || arg.join('') === '') {
            if (data) {
                const { message, lien } = data;
                var mode = "public";
                if (s.MODE != "yes") {
                    mode = "private";
                }

                moment.tz.setDefault('Etc/GMT');

                const time = moment().format('HH:mm:ss');
                const date = moment().format('DD/MM/YYYY');

                const alivemsg = `
*Owner*: ${s.NOM_OWNER}
*Mode*: ${mode}
*Date*: ${date}
*Time*: ${time}

${message}

*Xforcemd_MD version 2.0*`;

                if (lien.match(/\.(mp4|gif)$/i)) {
                    try {
                        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
                    } catch (e) {
                        console.log("🥵🥵 Menu error " + e);
                        repondre("🥵🥵 Menu error " + e);
                    }
                } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
                    try {
                        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
                    } catch (e) {
                        console.log("🥵🥵 Menu error " + e);
                        repondre("🥵🥵 Menu error " + e);
                    }
                } else {
                    repondre(alivemsg);
                }

            } else {
                if (!superUser) { repondre("No alive record found for this bot"); return; }
                await repondre("You haven't registered your alive message yet; to do so, enter the message and your image or video link in the following format: .alive message;link");
                repondre("Take your time to understand; it's on you if you mess up");
            }
        } else {
            if (!superUser) { repondre("Only the owner has the right to modify the alive message"); return; }

            const texte = arg.join(' ').split(';')[0];
            const tlien = arg.join(' ').split(';')[1];

            await addOrUpdateDataInAlive(texte, tlien);

            repondre('Alive message updated successfully');
        }
    });
