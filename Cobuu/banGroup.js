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

// Function to create the "banGroup" table
const createBanGroupTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banGroup (
        groupJid text PRIMARY KEY
      );
    `);
    console.log("The 'banGroup' table was created successfully.");
  } catch (error) {
    console.error("Error creating the 'banGroup' table:", error);
  }
};

// Call the function to create the "banGroup" table
createBanGroupTable();

// Function to add a group to the banned list
async function addGroupToBanList(groupJid) {
  const client = await pool.connect();
  try {
    const query = "INSERT INTO banGroup (groupJid) VALUES ($1)";
    const values = [groupJid];
    await client.query(query, values);
    console.log(`Group JID ${groupJid} added to the ban list.`);
  } catch (error) {
    console.error("Error adding the banned group:", error);
  } finally {
    client.release();
  }
}

// Function to check if a group is banned
async function isGroupBanned(groupJid) {
  const client = await pool.connect();
  try {
    const query = "SELECT EXISTS (SELECT 1 FROM banGroup WHERE groupJid = $1)";
    const values = [groupJid];
    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking if the group is banned:", error);
    return false;
  } finally {
    client.release();
  }
}

// Function to remove a group from the ban list
async function removeGroupFromBanList(groupJid) {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM banGroup WHERE groupJid = $1";
    const values = [groupJid];
    await client.query(query, values);
    console.log(`Group JID ${groupJid} removed from the ban list.`);
  } catch (error) {
    console.error("Error removing the banned group:", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList,
};
                  
