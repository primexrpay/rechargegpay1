// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

/*
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
*/

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,  // Necessary for most cloud-hosted databases (like Vercel)
  }
});


async function connectDatabase() {
  try {
    await pool.connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

module.exports = pool;
