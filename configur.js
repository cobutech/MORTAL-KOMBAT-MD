const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

// Load environment variables if 'set.env' exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const path = require("path");
const databasePath = path.join(__dirname, './database.db');

// Determine database URL
const DATABASE_URL = process.env.DATABASE_URL || databasePath;

module.exports = {
    // Configuration settings
    session: process.env.SESSION_ID || 'xforcemd', // paste your setion id here 
    STATE: process.env.ETAT,'', // Translated to English
    PREFIX: process.env.PREFIXE,'', // Command prefix
    OWNER_NAME: process.env.NOM_OWNER || "xforcemd-Md", // Bot owner name
    OWNER_NUMBER: process.env.NUMERO_OWNER,'' ,// Bot owner's contact number
    AUTO_READ_STATUS: process.env.LECTURE_AUTO_STATUS || "no", // Auto-read messages setting
    AUTO_DOWNLOAD_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'no', // Auto-download setting
    MODE: process.env.MODE_PUBLIC || 'private', // Mode (public or private)
    PM_PERMIT: process.env.PM_PERMIT || 'no', // Permit private messaging
    BOT: process.env.NOM_BOT || 'xforcemd_MD', // Bot name
    URL: process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg', // Default image URL
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME ||'',// Heroku app name
    HEROKU_API_KEY: process.env.HEROKU_APY_KEY||'', // Heroku API key
    WARN_COUNT: process.env.WARN_COUNT || '3', // Warning count limit before action
    // GPT: process.env.OPENAI_API_KEY, // OpenAI GPT key (optional)
    DP: process.env.STARTING_BOT_MESSAGE || 'yes', // Initial bot message status
    ATD: process.env.ANTI_DELETE_MESSAGE || 'no', // Anti-delete message setting
    DATABASE_URL, // Database URL configuration
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
        : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /*
     Uncomment and configure Sequelize based on your database setup:
     Use SQLite:
     new Sequelize({
         dialect: 'sqlite',
         storage: DATABASE_URL,
         logging: false,
     })
     Or use Postgres:
     new Sequelize(DATABASE_URL, {
         dialect: 'postgres',
         ssl: true,
         protocol: 'postgres',
         dialectOptions: {
             native: true,
             ssl: { require: true, rejectUnauthorized: false },
         },
         logging: false,
     }),
    */
};

// File watcher to reload configuration upon changes
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Updated: ${__filename}`); // Log when file is updated
    delete require.cache[file];
    require(file);
});
