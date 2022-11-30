require('dotenv').config({ path: '../.env' });

module.exports = {
  // entorno de desarrollo: development
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: process.env.DB_CHARSET,
      // ssl: { rejectUnauthorized: false }
    },
    // creamos un directorio de nombre: db donde se iran creando los seeds y migrations
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds',
    }
  }
};
