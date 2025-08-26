/**
 2  * Database connection configuration module
 3  * This module sets up a MySQL connection pool using environment variables
 4  * for database credentials and configuration.
 5  */
const mysql = require("mysql2/promise");
require("dotenv").config();

/**
10  * MySQL connection pool configuration
11  * Uses environment variables for database connection parameters:
12  * - DB_HOST: Database host address
13  * - DB_USER: Database username
14  * - DB_PASS: Database password
15  * - DB_NAME: Database name
16  */
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Database server host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASS, // Database password
  database: process.env.DB_NAME, // Database name to connect to
});

/**
25  * Exports the MySQL connection pool instance
26  * @type {mysql.Pool}
27  */
module.exports = pool;
