const dbConnection = require('./app/config').dbConnection;

module.exports = {
  // entorno de desarrollo: development
  development: {
    client: 'mysql',
    connection: dbConnection,
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
