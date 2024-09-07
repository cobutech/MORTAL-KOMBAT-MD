require("dotenv").config();
const { Pool } = require("pg");
let s = require("../set");

var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";

const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

// Function to create the "antilien" table
async function createAntilienTable() {
  const client = await pool.connect();
  try {
    // Execute a SQL query to create the "antilien" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS antilien (
        jid text PRIMARY KEY,
        state text,
        action text
      );
    `);
    console.log("The 'antilien' table was created successfully.");
  } catch (error) {
    console.error("An error occurred while creating the 'antilien' table:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the "antilien" table
createAntilienTable();

// Function to add or update JID in the "antilien" table
async function addOrUpdateJid(jid, state) {
  const client = await pool.connect();
  try {
    // Check if the JID already exists in the 'antilien' table
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExists = result.rows.length > 0;

    if (jidExists) {
      // If the JID exists, update the state
      await client.query('UPDATE antilien SET state = $1 WHERE jid = $2', [state, jid]);
    } else {
      // If the JID doesn't exist, add it with the state and default action 'remove'
      await client.query('INSERT INTO antilien (jid, state, action) VALUES ($1, $2, $3)', [jid, state, 'remove']);
    }
    console.log(`JID ${jid} added or updated successfully in the 'antilien' table.`);
  } catch (error) {
    console.error('Error adding or updating JID in the table:', error);
  } finally {
    client.release();
  }
};

// Function to update action for a JID
async function updateJidAction(jid, action) {
  const client = await pool.connect();
  try {
    // Check if the JID already exists in the 'antilien' table
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExists = result.rows.length > 0;

    if (jidExists) {
      // If the JID exists, update the action (keep state unchanged)
      await client.query('UPDATE antilien SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // If the JID doesn't exist, add it with default state 'no' and provided action
      await client.query('INSERT INTO antilien (jid, state, action) VALUES ($1, $2, $3)', [jid, 'no', action]);
    }
    console.log(`Action updated successfully for JID ${jid} in the 'antilien' table.`);
  } catch (error) {
    console.error('Error updating action for JID in the table:', error);
  } finally {
    client.release();
  }
};

// Export functions
module.exports = {
  addOrUpdateJid,
  updateJidAction,
};
