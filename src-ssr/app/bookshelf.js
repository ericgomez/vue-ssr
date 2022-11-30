require('dotenv').config();
const dbConnection = require('./config').dbConnection;

const knex = require('knex')({
  debug: process.env.DEBUG === true,
  client: 'mysql',
  connection: dbConnection,
});

module.exports = require('bookshelf')(knex); // add in bookshelf the knex configuration
