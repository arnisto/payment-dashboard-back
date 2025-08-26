/**
 * Sequelize database configuration module
 3  * 
 4  * This module initializes and exports a Sequelize instance configured for MySQL database connection.
 5  * Configuration is loaded from environment variables via dotenv.
 6  */
const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Create a new Sequelize instance with MySQL configuration
 * @type {Sequelize}
13  */
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name from environment variables
  process.env.DB_USER, // Database username from environment variables
  process.env.DB_PASS, // Database password from environment variables
  {
    host: process.env.DB_HOST, // Database host from environment variables
    dialect: "mysql", // Specify MySQL dialect
    port: process.env.DB_PORT, // Database port from environment variables
    logging: false, // Disable SQL query logging
  }
);

/**
 * Exported Sequelize instance for use in other modules
28  * @module sequelize
29  */
module.exports = sequelize;
