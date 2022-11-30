module.exports = {
  saltRounds: 10,
  dbConnection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET,
    // ssl: { rejectUnauthorized: false }
  },
};
