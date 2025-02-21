// api/pool.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud",
  password: "toor",
  port: 5432,
});

module.exports = pool;
