"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reaction = exports.recept_message = exports.getBuffer = exports.zJson = exports.apiWaifu = exports.format = exports.fruit = exports.tabCmd = exports.police = exports.styletext = exports.xlab = exports.ajouterCommande = void 0;

const axios = require('axios');
const path = require("path");
const cheerio = require("cheerio");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const baileys_1 = require("@whiskeysockets/baileys");
const fs = require('fs-extra');
const util = require('util');
let { listall } = require('./stylish-font');

/* 
_________By Cobutech

Function zJson:
Fetches a JSON object
:parameters:
- url: the URL where the request is made
- option: optional request options
:returns:
- Data contained in the response of the request
*/

/** ********* */
module.exports.generateFileName = async (extension) => {
    var randomNum = Math.floor(Math.random() * 2000);
    var fileName = `XForce${randomNum}.${extension}`;
    return fileName;
};

/** ****** */

/** ************ */
module.exports.stick = async (buffer, author) => {
    var sticker = new Sticker(buffer, {
        pack: 'XForce-MD', // Sticker pack name
        author: author, // Sticker author
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'], // Emoji categories
        id: '12345',
        quality: 50, // Image quality
        background: '#000000' // Background color
    });
    return sticker;
};

/** ********** */
async function zJson(url, option) {
    try {
        option = option || {};
        const result = await axios({
            method: 'GET', 
            url: url,
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' 
            },
            ...option
        });
        return result.data;
    } catch (error) {
        return error;
    }
}
exports.zJson = zJson;

/* 
______Function getBuffer------
Fetches data in the form of an array buffer
:parameters:
- url: the URL for the request
- option: optional request settings
:returns:
- Array buffer containing the response data
*/
async function getBuffer(url, option) {
    try {
        option = option || {};
        const result = await axios({
            method: 'GET', 
            url: url, 
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...option, 
            responseType: "arrayBuffer"
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
}
exports.getBuffer = getBuffer;

/* 
--------Function recept_message

Function to retrieve meta-data from received messages
:parameters:
- xforcemd: waSocket object
- mess: IwaMessage (received message)
- store: conversation records
:returns:
- Returns an object containing the meta-data of the received message
*/
async function recept_message(xforcemd, mess, store) {
    if (!mess) return;
    if (mess.key) {
        mess.messageKey = mess.key;
        mess.messageId = mess.key.id;
        mess.messageOrigin = mess.key.remoteJid;
        mess.isFromMe = mess.key.fromMe;
        mess.isGroup = mess.messageOrigin.endsWith('@g.us');
        mess.isFromBot = mess.messageId.startsWith('BAE5') && mess.messageId.length === 16;
    }
    
    ///////////////////////////////
    if (mess.message) {
        mess.messageType = (0, baileys_1.getContentType)(mess.message);
        mess.ms = (mess.messageType == 'viewOnceMessage' ? mess.message[mess.messageType].message[(0, baileys_1.getContentType)(mess.message[mess.messageType].message)] : mess.message[mess.messageType]);
        
        try {
            switch (mess.messageType) {
                case 'conversation':
                    mess.messageBody = mess.message.conversation;
                    break;
                case 'imageMessage':
                    mess.messageBody = mess.message.imageMessage.caption;
                    break;
                case 'videoMessage':
                    mess.messageBody = mess.message.videoMessage.caption;
                    break;
                case 'extendedTextMessage':
                    mess.messageBody = mess.message.extendedTextMessage.text;
                    break;
                case 'buttonsResponseMessage':
                    mess.messageBody = mess.message.buttonsResponseMessage.selectedButtonId;
                    break;
                case 'listResponseMessage':
                    mess.messageBody = mess.message.listResponseMessage.singleSelectReply.selectedRowId;
                    break;
                case 'templateButtonReplyMessage':
                    mess.messageBody = mess.message.templateButtonReplyMessage.selectedId;
                    break;
                case 'messageContextInfo':
                    mess.messageBody = mess.message.buttonsResponseMessage.selectedButtonId || mess.message.listResponseMessage.singleSelectReply.selectedRowId || mess.text || '';
                    break;
                default:
                    mess.messageBody = false;
            }
        } catch {
            mess.messageBody = false;
        }
    }
    ///////////////////////////
    let quoted = mess.quoted = mess.ms.contextInfo ? mess.ms.contextInfo.quotedMessage : null;
    mess.mentionedJid = mess.ms.contextInfo ? mess.ms.contextInfo.mentionedJid : [];
    
    return mess;
}
exports.recept_message = recept_message;

function styletext(text) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text=' + text)
            .then(({ data }) => {
            let $ = cheerio.load(data);
            let result = [];
            $('table > tbody > tr').each(function (a, b) {
                result.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() });
            });
            resolve(result);
        });
    });
}
exports.styletext = styletext;

/* Function to fetch from the waifu API

by Cobutech 
*/
async function apiWaifu(theme) {
    var url = 'https://api.waifu.pics/nsfw/';
    if (theme === 'waifu' || theme === 'trap' || theme === 'neko' || theme === 'blowjob') {
        url += theme;
    } else {
        url = 'https://api.waifu.pics/nsfw/waifu';
    }
    
    try {
        const response = await axios.get(url);
        return response.data.url;
    } catch (e) {
        console.log(e);
    }
}
exports.apiWaifu = apiWaifu;

var tabCmd = {};
exports.tabCmd = tabCmd;

var reaction = {};
exports.reaction = reaction;

var fruit = {};
exports.fruit = fruit;

async function ajouterCommande() {
    fs.readdirSync(__dirname + "/../commandes").forEach((file) => {
        if (path.extname(file).toLowerCase() == ".js") {
            require(__dirname + "/../commandes/" + file.split(".js")[0]);
            console.log('File: ' + file);
        }
    });
}
exports.ajouterCommande = ajouterCommande;

async function xlab() {
    const readDir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    
    var path = './commandes/';
    var fileNames = await readDir(path);
    fileNames.forEach((file) => {
        if (file.endsWith(".js")) {
            var { command } = require(__dirname + '/../commandes/' + file.split(".js")[0]);
            var info;
            if (command) {
                info = command();
            } else {
                info = null;
            }
            if (info != null) {
                for (const cmd of info.commandNames) {
                    fruit[cmd] = info.execute;
                }
            }
        }
    });
}
exports.xlab = xlab;

const human_readable_1 = require("human-readable");
const format = (0, human_readable_1.sizeFormatter)({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});
exports.format = format;

function police(text, index) {
    index = index - 1;
    return listall(text)[index];
}
exports.police = police;
