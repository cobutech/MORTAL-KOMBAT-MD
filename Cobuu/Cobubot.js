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

// Function to create the "antibot" table
async function createAntibotTable() {
  const client = await pool.connect();
  try {
    // Execute a SQL query to create the "antibot" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS antibot (
        jid text PRIMARY KEY,
        state text,
        action text
      );
    `);
    console.log("The 'antibot' table was created successfully.");
  } catch (error) {
    console.error("An error occurred while creating the 'antibot' table:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the "antibot" table
createAntibotTable();

// Function to add or update JID in the "antibot" table
async function addOrUpdateJid(jid, state) {
  const client = await pool.connect();
  try {
    // Check if the JID already exists in the 'antibot' table
    const result = await client.query('SELECT * FROM antibot WHERE jid = $1', [jid]);
    const jidExists = result.rows.length > 0;

    if (jidExists) {
      // If the JID exists, update the state
      await client.query('UPDATE antibot SET state = $1 WHERE jid = $2', [state, jid]);
    } else {
      // If the JID doesn't exist, add it with the state and default action 'remove'
      await client.query('INSERT INTO antibot (jid, state, action) VALUES ($1, $2, $3)', [jid, state, 'remove']);
    }
        console.log(`JID ${jid} added or updated successfully in the 'antibot' table.`);
  } catch (error) {
    console.error('Error adding or updating JID in the antibot table:', error);
  } finally {
    client.release();
  }
};

// Function to update action for a JID in the "antibot" table
async function updateJidAction(jid, action) {
  const client = await pool.connect();
  try {
    // Check if the JID already exists in the 'antibot' table
    const result = await client.query('SELECT * FROM antibot WHERE jid = $1', [jid]);
    const jidExists = result.rows.length > 0;

    if (jidExists) {
      // If the JID exists, update the action (keep state unchanged)
      await client.query('UPDATE antibot SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // If the JID doesn't exist, add it with default state 'no' and the provided action
      await client.query('INSERT INTO antibot (jid, state, action) VALUES ($1, $2, $3)', [jid, 'no', action]);
    }
    console.log(`Action updated successfully for JID ${jid} in the 'antibot' table.`);
  } catch (error) {
    console.error('Error updating action for JID in the antibot table:', error);
  } finally {
    client.release();
  }
};

// Function to verify the state of a JID
async function verifyJidState(jid) {
  const client = await pool.connect();
  try {
    // Search for the JID in the "antibot" table and retrieve its state
    const result = await client.query('SELECT state FROM antibot WHERE jid = $1', [jid]);

    if (result.rows.length > 0) {
      const state = result.rows[0].state;
      return state === 'yes'; // Return true if the state is "yes"
    } else {
      // If the JID does not exist in the table, it's not registered as "yes"
      return false;
    }
  } catch (error) {
    console.error('Error verifying JID state in the antibot table:', error);
    return false;
  } finally {
    client.release();
  }
};

// Function to retrieve the action for a JID
async function getJidAction(jid) {
  const client = await pool.connect();
  try {
    // Search for the JID in the "antibot" table and retrieve its action
    const result = await client.query('SELECT action FROM antibot WHERE jid = $1', [jid]);

    if (result.rows.length > 0) {
      const action = result.rows[0].action;
      return action;
    } else {
      // If the JID doesn't exist, return the default action 'remove'
      return 'remove';
    }
  } catch (error) {
    console.error('Error retrieving action for JID in the antibot table:', error);
    return 'remove'; // Return default action on error
  } finally {
    client.release();
  }
};

// Export functions for use in other modules
module.exports = {
  updateJidAction,
  addOrUpdateJid,
  verifyJidState,
  getJidAction,
};
  
