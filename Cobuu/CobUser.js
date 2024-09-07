require("dotenv").config();
const { Pool } = require("pg");

// Get the database URL from the configurations
const s = require("../set");

// Set the database URL (or use the default)
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Create a PostgreSQL connection pool
const pool = new Pool(proConfig);

// Function to create the "banUser" table
const createBanUserTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banUser (
        jid text PRIMARY KEY
      );
    `);
    console.log("The 'banUser' table was created successfully.");
  } catch (error) {
    console.error("Error creating the 'banUser' table:", error);
  }
};

// Call the function to create the "banUser" table
createBanUserTable();

// Function to add a user to the ban list
async function addUserToBanList(jid) {
  const client = await pool.connect();
  try {
    const query = "INSERT INTO banUser (jid) VALUES ($1)";
    const values = [jid];
    await client.query(query, values);
    console.log(`JID ${jid} added to the ban list.`);
  } catch (error) {
    console.error("Error adding the banned user:", error);
  } finally {
    client.release();
  }
}

// Function to check if a user is banned
async function isUserBanned(jid) {
  const client = await pool.connect();
  try {
    const query = "SELECT EXISTS (SELECT 1 FROM banUser WHERE jid = $1)";
    const values = [jid];
    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking if the user is banned:", error);
    return false;
  } finally {
    client.release();
  }
}

// Function to remove a user from the ban list
async function removeUserFromBanList(jid) {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM banUser WHERE jid = $1";
    const values = [jid];
    await client.query(query, values);
    console.log(`JID ${jid} removed from the ban list.`);
  } catch (error) {
    console.error("Error removing the banned user:", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addUserToBanList,
  isUserBanned,
  removeUserFromBanList,
};
