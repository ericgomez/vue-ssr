require('dotenv').config();

const knex = require('knex')({
  debug: process.env.DEBUG === true,
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET,
    // ssl: { rejectUnauthorized: false }
  },
});

const bookshelf = require('bookshelf')(knex); // in bookshelf add knex configuration

// const User = bookshelf.model('User', {
//   tableName: 'users',
//   posts() {
//     return this.hasMany(Posts);
//   }
// });
