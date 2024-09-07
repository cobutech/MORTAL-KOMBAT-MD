require("dotenv").config();
const { Pool } = require("pg");
let s = require("../set");

// Set the database URL (or use the default)
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";

const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

// Function to create the "cron" table
async function createCronTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS cron (
        group_id text PRIMARY KEY,
        mute_at text DEFAULT NULL,
        unmute_at text DEFAULT NULL
      );
    `);
    console.log("The 'cron' table was created successfully.");
  } catch (error) {
    console.error("Error creating the 'cron' table:", error);
  } finally {
    client.release();
  }
}

createCronTable();

// Function to get all entries from the "cron" table
async function getCron() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM cron');
    return result.rows;
  } catch (error) {
    console.error('Error fetching data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

// Function to add or update a cron entry
async function addCron(group_id, rows, value) {
  const client = await pool.connect();
  try {
    let response = await client.query(`SELECT * FROM cron WHERE group_id = $1`, [group_id]);
    let exist = response.rows.length > 0;

    if (exist) {
      await client.query(`UPDATE cron SET ${rows} = $1 WHERE group_id = $2`, [value, group_id]);
    } else {
      const query = `INSERT INTO cron (group_id, ${rows}) VALUES ($1, $2)`;
      await client.query(query, [group_id, value]);
    }
  } catch (error) {
    console.error('Error adding/updating data in the "cron" table:', error);
  } finally {
    client.release();
  }
}

// Function to get a specific cron entry by group_id
async function getCronById(group_id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM cron WHERE group_id = $1', [group_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

// Function to delete a cron entry
async function deleteCron(group_id) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM cron WHERE group_id = $1', [group_id]);
  } catch (error) {
    console.error('Error deleting data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

module.exports = {
  getCron,
  addCron,

 // Function to delete a cron entry (continued)
async function deleteCron(group_id) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM cron WHERE group_id = $1', [group_id]);
  } catch (error) {
    console.error('Error deleting data from the "cron" table:', error);
  } finally {
    client.release();
  }
}

module.exports = {
  getCron,
  addCron,
  deleteCron,
  getCronById,
};
  
