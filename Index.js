"use strict";
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k = k;
        o[k2] = m[k];
    }));
    var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    });
    var __importStar = (this && __importStar) || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
    var __importDefault = (this && __importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
    const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
    const logger = logger_1.default.child({});
    logger.level = 'silent';
    const pino = require("pino");
    const boom_1 = require("@hapi/boom");
    const conf = require("./set");
    const axios = require("axios");
    let fs = require("fs-extra");
    let path = require("path");
    const FileType = require('file-type');
    const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
    //import chalk from 'chalk'
    const { verifierEtatJid , recupererActionJid } = require("./bdd/antilien");
    const { atbverifierEtatJid , atbrecupererActionJid } = require("./bdd/antibot");
    let evt = require(__dirname + "/framework/xforcemd");
    const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("./bdd/banUser");
    const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("./bdd/banGroup");
    const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("./bdd/onlyAdmin");
    //const { constrainedMemory } = require("process");
    //const { co } = require("translatte/languages");
    const { recupevents } = require('./bdd/welcome');
    //const //{loadCmd}=require("/framework/mesfonctions")
    let { reagir } = require(__dirname + "/framework/app");
    var session = conf.session.replace(/xforcemd-MD-WHATSAPP-BOT;;;=>/g,"");
    const prefixe = conf.PREFIXE;
    
    async function authentification() {
        try {
            
            //console.log("the data "+data)
            if (!fs.existsSync(__dirname + "/auth/creds.json")) {
                console.log("connecting ...");
                await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
                //console.log(session)
            }
            else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
                await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
            }
        }
        catch (e) {
            console.log("Invalid session " + e );
            return;
        }
    }
    authentification();
    const store = (0, baileys_1.makeInMemoryStore)({
        logger: pino().child({ level: "silent", stream: "store" }),
    });
    setTimeout(() => {
        async function main() {
            const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
            const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/auth");
            const sockOptions = {
                version,
                logger: pino({ level: "silent" }),
                browser: ['xforcemd-Md', "safari", "1.0.0"],
                printQRInTerminal: true,
                fireInitQueries: false,
                shouldSyncHistoryMessage: true,
                downloadHistory: true,
                syncFullHistory: true,
                generateHighQualityLinkPreview: true,
                markOnlineOnConnect: false,
                keepAliveIntervalMs: 30_000,
                /* auth: state*/ auth: {
                    creds: state.creds,
                    /** caching makes the store faster to send/recv messages */
                    keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
                },
                //////////
                getMessage: async (key) => {
                    if (store) {
                        const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                        return msg.message || undefined;
                    }
                    return {
                        conversation: 'An Error Occurred, Repeat Command!'
                    };
                }
                ///////
            };
            const zk = (0, baileys_1.default)(sockOptions);
            store.bind(zk.ev);
            setInterval(() => { store.writeToFile(__dirname + "/store.json");  }, 3000);
           
            zk.ev.on("messages.upsert", async (m) => {
                const { messages } = m;
                const ms = messages[0];
              //  console.log(ms) ;
                if (!ms.message)
                    return;
                const decodeJid = (jid) => {
                    if (!jid)
                        return jid;
                    if (/:\d+@/gi.test(jid)) {
                        let decode = (0, baileys_1.jidDecode)(jid) || {};
                        return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                    }
                    else
                        return jid;
                };
                var mtype = (0, baileys_1.getContentType)(ms.message);
                var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
                    ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
                    ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
                    (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
                var origineMessage = ms.key.remoteJid;
                var idBot = decodeJid(zk.user.id);
                var servBot = idBot.split('@')[0];
                const verifGroupe = origineMessage?.endsWith("@g.us");
                var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
                var nomGroupe = verifGroupe ? infosGroupe.subject : "";
                var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
                var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
                var mr = ms.message?.extendedTextMessage?.contextInfo?.mentionedJid;
                var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
                var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
                if (ms.key.fromMe) {
                    auteurMessage = idBot;
                }
                
                var membreGroupe = verifGroupe ? ms.key.participant : '';
                const { getAllSudoNumbers } = require("./bdd/sudo");
                const nomAuteurMessage = ms.pushName;
                const dj = '22559763447';
                const dj2 = '22543343357';
                const dj3 = "22564297888";
                const luffy = '22891733300';
                const dj4 = '‪99393228‬';
                const sudo = await getAllSudoNumbers();
                const superUserNumbers = [servBot, dj, dj2, dj3,dj4, luffy, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
                const allAllowedNumbers = superUserNumbers.concat(sudo);
                const superUser = allAllowedNumbers.includes(auteurMessage);
                
                var dev = [dj, dj2, dj3, dj4, luffy].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
                function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
                console.log("\t [][]...{xforcemd-Md}...[][]");
                console.log("=========== New message ===========");
                if (verifGroupe) {
                    console.log("Message from group: " + nomGroupe);
                }
                console.log("Message sent by: " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
                console.log("Message type: " + mtype);
                console.log("------ Message content ------");
                console.log(texte);
                /**  */
                function groupeAdmin(membreGroupe) {
                    let admin = [];
                    for (m of membreGroupe) {
                        if (m.admin == null)
                            continue;
                        admin.push(m.id);
                    }
                    return admin;
                }
                
                const mbre = verifGroupe ? await infosGroupe.participants : '';
                let admins = verifGroupe ? groupeAdmin(mbre) : '';
                const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
                var verifXforcemdAdmin = verifGroupe ? admins.includes(idBot) : false;
                /** ** */
                var etat = conf.ETAT;
                if (etat == 1) {
                    await zk.sendPresenceUpdate("available", origineMessage);
                } else if (etat == 2) {
                    await zk.sendPresenceUpdate("composing", origineMessage);
                } else if (etat == 3) {
                    await zk.sendPresenceUpdate("recording", origineMessage);
                }
                /** ***** */
                const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
                const verifCom = texte ? texte.startsWith(prefixe) : false;
                const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
               
               const liens = conf.URL.split(',');
    
                function mybotpic() {
                    const indiceAleatoire = Math.floor(Math.random() * liens.length);
                    const lienAleatoire = liens[indiceAleatoire];
                    return lienAleatoire;
                }
                
                var commandeOptions = {
                    superUser, dev,
                    verifGroupe,
                    mbre,
                    membreGroupe,
                    verifAdmin,
                    infosGroupe,
                    nomGroupe,
                    auteurMessage,
                    nomAuteurMessage,
                    idBot,
                    verifXforcemdAdmin,
                    prefixe,
                    arg,
                    repondre,
                    mtype,
                    groupeAdmin,
                    msgRepondu,
                    auteurMsgRepondu,
                    ms,
                    mybotpic
                };

                // ************************ Anti-delete-message
                if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0 && (conf.ATD).toLocaleLowerCase() === 'yes') {
                    if (ms.key.fromMe || ms.message.protocolMessage.key.fromMe) {
                        console.log('Message deletion concerning me'); 
                        return;
                    }

                    console.log(`Message deleted`);
                    let key = ms.message.protocolMessage.key;
                    try {
                        let st = './store.json';
                        const data = fs.readFileSync(st, 'utf8');
                        const jsonData = JSON.parse(data);
                        let message = jsonData.messages[key.remoteJid];
                        let msg;

                        for (let i = 0; i < message.length; i++) {
                            if (message[i].key.id === key.id) {
                                msg = message[i];
                                break;
                            }
                        }

                        if (msg === 'undefined') {
                            console.log('Message not found');
                            return;
                        }

                        await zk.sendMessage(idBot, { image: { url: './media/deleted-message.jpg' }, caption: `😈Anti-delete-message😈\n Message from @${msg.key.participant.split('@')[0]}`, mentions: [msg.key.participant] });
                        await zk.sendMessage(idBot, { forward: msg }, { quoted: msg });
                    } catch (e) {
                        console.log(e);
                    }
                }

                // ****** Auto-status handling
                if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.LECTURE_AUTO_STATUS === "yes") {
                    await zk.readMessages([ms.key]);
                }
                if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.TELECHARGER_AUTO_STATUS === "yes") {
                    if (ms.message.extendedTextMessage) {
                        var stTxt = ms.message.extendedTextMessage.text;
                        await zk.sendMessage(idBot, { text: stTxt }, { quoted: ms });
                    }
                    else if (ms.message.imageMessage) {
                        var stMsg = ms.message.imageMessage.caption;
                        var stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                        await zk.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: ms });
                    }
                    else if (ms.message.videoMessage) {
                        var stMsg = ms.message.videoMessage.caption;
                        var stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                        await zk.sendMessage(idBot, {
                            video: { url: stVideo }, caption: stMsg
                        }, { quoted: ms });
                    }
                }

                // Rest of the code execution here...
                // Sticker Message Command Handling
                if (ms && ms.message.stickerMessage) {
                    const { addstickcmd, deleteCmd, getCmdById, inStickCmd } = require('./bdd/stickcmd');
                    let id = ms.message.stickerMessage.url;

                    if (!inStickCmd(id) || !superUser) {
                        return;
                    }

                    let cmd = await getCmdById(id);

                    const cd = evt.cm.find((xforcemd) => xforcemd.nomCom === (cmd));
                    if (cd) {
                        try {
                            reagir(origineMessage, zk, ms, cd.reaction);
                            cd.fonction(origineMessage, zk, commandeOptions);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                // Handle message events (Command Execution)
                if (verifCom) {
                    const cd = evt.cm.find((xforcemd) => xforcemd.nomCom === (com));
                    if (cd) {
                        if (conf.MODE !== 'yes' && !superUser) {
                            return;
                        }

                        // Prevent execution if non-super user is in a specific group
                        if (!dev && origineMessage == "120363158701337904@g.us") {
                            return;
                        }

                        // Handle private command permissions
                        if (!superUser && origineMessage === auteurMessage && conf.PM_PERMIT === "yes") {
                            return;
                        }

                        // Check if group is banned from using bot commands
                        if (verifCom && !superUser) {
                            let req = await isGroupBanned(origineMessage);
                            if (req) {
                                return;
                            }
                        }

                        // Only Admin Group Control
                        if (!verifAdmin && verifGroupe) {
                            let req = await isGroupOnlyAdmin(origineMessage);
                            if (req) {
                                return;
                            }
                        }

                        // User Ban Handling
                        if (!superUser) {
                            let req = await isUserBanned(auteurMessage);
                            if (req) {
                                repondre("You no longer have access to bot commands.");
                                return;
                            }
                        }

                        // Execute the matched command
                        try {
                            reagir(origineMessage, zk, ms, cd.reaction);
                            cd.fonction(origineMessage, zk, commandeOptions);
                        } catch (e) {
                            console.log("😡😡 " + e);
                            zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                        }
                    }
                }

                // End message event
            });

            // Group Events (e.g. Participant Update)
            zk.ev.on('group-participants.update', async (group) => {
                const decodeJid = (jid) => {
                    if (!jid) return jid;
                    if (/:\d+@/gi.test(jid)) {
                        let decode = (0, baileys_1.jidDecode)(jid) || {};
                        return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                    } else return jid;
                };

                console.log(group);

                let ppgroup;
                try {
                    ppgroup = await zk.profilePictureUrl(group.id, 'image');
                } catch {
                    ppgroup = 'https://telegra.ph/file/4cc2712eee93c105f6739.jpg';
                }

                try {
                    const metadata = await zk.groupMetadata(group.id);

                    if (group.action == 'add' && (await recupevents(group.id, "welcome") == 'yes')) {
                        let msg = `╔════◇◇◇═════╗
    ║ Let's welcome the new member(s)
    ║ *New Member(s):*
    `;
                        let members = group.participants;
                        for (let member of members) {
                            msg += `║ @${member.split("@")[0]}\n`;
                        }

                        msg += `║
    ╚════◇◇◇═════╝
    ◇ *Description*   ◇

    ${metadata.desc}`;

                        zk.sendMessage(group.id, { image: { url: ppgroup }, caption: msg, mentions: members });
                    } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye") == 'yes')) {
                        let msg = `A member(s) has left the group;\n`;
                        let members = group.participants;
                        for (let member of members) {
                            msg += `@${member.split("@")[0]}\n`;
                        }
                        zk.sendMessage(group.id, { text: msg, mentions: members });
                    }
                } catch (e) {
                    console.error(e);
                }
            });

            // Cron Job Setup
            async function activateCrons() {
                const cron = require('node-cron');
                const { getCron } = require('./bdd/cron');

                let crons = await getCron();
                console.log(crons);
                if (crons.length > 0) {
                    for (let i = 0; i < crons.length; i++) {
                        if (crons[i].mute_at != null) {
                            let set = crons[i].mute_at.split(':');
                            console.log(`Setting up auto-mute for ${crons[i].group_id} at ${set[0]}:${set[1]}`);
                            cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                                await zk.groupSettingUpdate(crons[i].group_id, 'announcement');
                                zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "It's time to mute the group; sayonara!" });
                            }, {
                                timezone: "Africa/Abidjan"
                            });
                        }

                        if (crons[i].unmute_at != null) {
                            let set = crons[i].unmute_at.split(':');
                            console.log(`Setting up auto-unmute for ${set[0]}:${set[1]}`);
                            cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                                await zk.groupSettingUpdate(crons[i].group_id, 'not_announcement');
                                zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "Good morning; it's time to unmute the group!" });
                            }, {
                                timezone: "Africa/Abidjan"
                            });
                        }
                    }
                } else {
                    console.log('No crons activated');
                }
            }

            // Contact Event Handling
            zk.ev.on("contacts.upsert", async (contacts) => {
                const insertContact = (newContact) => {
                    for (const contact of newContact) {
                        if (store.contacts[contact.id]) {
                            Object.assign(store.contacts[contact.id], contact);
                        } else {
                            store.contacts[contact.id] = contact;
                        }
                    }
                    return;
                };
                insertContact(contacts);
            });

            // Connection Event Handling
            zk.ev.on("connection.update", async (con) => {
                const { lastDisconnect, connection } = con;
                if (connection === "connecting") {
                    console.log("ℹ️ Connecting...");
                } else if (connection === 'open') {
                    console.log("✅ Successfully connected! 😊");
                    await activateCrons();

                    if ((conf.DP).toLowerCase() === 'yes') {
                        let cmsg = `╔════◇
    ║ 『𝛸-𝐹𝛩𝑅𝐶𝛯-𝛭𝐷 𝛻2』
    ║    Prefix: [ ${prefixe} ]
    ║    Mode: [ ${public} ]
    ║    Total Commands: ${evt.cm.length}
    ╚══════════════════╝

    ╔═════◇
    ║『𝑰 𝑨𝑴 𝑪𝑹𝑨𝑻𝑬𝑫 𝑩𝒀 𝑪𝑶𝑩𝑼_𝑻𝑬𝑪𝑯』
    ║
    ╚══════════════════╝`;

                        await zk.sendMessage(zk.user.id, { text: cmsg });
                    }
                } else if (connection == "close") {
                    let reason = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                    if (reason === baileys_1.DisconnectReason.badSession) {
                        console.log('Invalid session ID, please rescan QR code.');
                    } else if (reason === baileys_1.DisconnectReason.connectionClosed) {
                        console.log('Connection closed, reconnecting...');
                        main();
                    } else if (reason === baileys_1.DisconnectReason.connectionLost) {
                        console.log('Lost connection to the server, reconnecting...');
                        main();
                    } else if (reason === baileys_1.DisconnectReason.loggedOut) {
                        console.log('Logged out, please rescan QR code.');
                    } else {
                        console.log('Restarting due to error', reason);
                    }
                    main();
                }
            });

            zk.ev.on("creds.update", saveCreds);
        }

        let fichier = require.resolve(__filename);
        fs.watchFile(fichier, () => {
            fs.unwatchFile(fichier);
            console.log(`File updated: ${__filename}`);
            delete require.cache[fichier];
            require(fichier);
        });

        main();
    }, 5000);
                      
                     
