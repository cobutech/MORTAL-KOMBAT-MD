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
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtDUTdBU3VkWmg3VW5KS0ZNeTcxUTRoUzFWZWhOdTJaYjFOVFpMdmgxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTCttdDhzT1NNT3gyeHpQSWQvMGVGWDNaK1RDUmFVUGxkTHk3bW5xZVN6QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1TGIvSUl5KzFvbUpOZDJ4Ly9ITWpPNlZLcVplTkQ2VVlCejl5bWM5ajIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMT0VmaUtueHcySnNMSnR2dkV2UjE1WmkxcmUvMGFoVTF0ZDRLeXRmODBRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9GdVgvNHcwWTZ4RTFnbEFwMFVVZzZRK2NhMXdHTitVMkVtUENPcGNtbms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhzdmxKVlIySnNFeWw5OE9CZjROeWZUL3dJQjgwQzV3Y2ducENLRDBla3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEpXWHVIYzgzZHNUaUU1aG1hY2dRaE1UVUVzSlJCZ3N2T0h4aGVlZU1XVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1c5Vmtnd3FZbFgvQnE1ZVZsRFFjQi9GZG9kNVNmZW90VHZkQzR3UEVuMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxtVGFha1BoZ1lRK1FjSmhSNVgwNjd0dENoUDJxVkFQcWNWOUtIVjI4OEx1b0dKcFJnazRkSjg3K2JuaGxML1Y4OXd6Q05NMTAwMG83eXE3TjBhbkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzgsImFkdlNlY3JldEtleSI6ImNNcm9RMGpRSVZRbC9YMGI0SHp6eVdTOGsrcHQ2ZGxRWERQTnMxMTRhR009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImR4UjJBODF4UWZ1NlR6djlma1AzMmciLCJwaG9uZUlkIjoiNGFlMjRjMzYtMTgzZS00YmE2LWJlN2QtZjUyMzE1OGJmNDUxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5ocVhpbTE1NnE2N0hqS1lXVlFWN1BoSjBpdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5U2t3ZjRHS1lLbDNzeC9GOStrSTc2T1ptVTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjVORTY2QVkiLCJtZSI6eyJpZCI6IjI1NDc5NjI4MTc3NjozM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHpra3JjR0VQenFtcmNHR0NRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaWQ2VWp2NzV2QzBUSVdCcUVSV1ZxRkxHMXQxbzArc1FmZDhPbXMvYlZoVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZThZR3JSZnNHNSt6RGRPcHNaVGtLZEJrYUlreGdYQ0ZJbTFnZW5Jb09lcFlrUGZ2Y3FvdVczbm1GNzRKV0VjYU5HT2t6bGhZMldjeXpkTmgwQWh1QVE9PSIsImRldmljZVNpZ25hdHVyZSI6Im4weS92Ym4yUDZINGNKb09FbzFYS3YyWU8yUWVjSkhYVDVRbjF3WjVtNENib0VVYUpDOFBFMmtseEo4TU0ya3dhbEc0UmZwY0doRUErT3lUdWpuRkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk2MjgxNzc2OjMzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlluZWxJNysrYnd0RXlGZ2FoRVZsYWhTeHRiZGFOUHJFSDNmRHByUDIxWVYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjYzOTU3ODYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBREdwIn0=', // paste your setion id here 
    STATE: process.env.ETAT||'', // Translated to English
    PREFIX: process.env.PREFIXE||'@', // Command prefix
    OWNER_NAME: process.env.NOM_OWNER || "xforcemd-Md", // Bot owner name
    OWNER_NUMBER: process.env.NUMERO_OWNER||'' ,// Bot owner's contact number
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
