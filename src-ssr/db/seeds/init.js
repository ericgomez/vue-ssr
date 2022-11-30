const bcrypt = require('bcrypt');
const saltRounds = require('./../../app/config').saltRounds;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('SET foreign_key_checks = 0'); // Disable all foreign keys to be able to do all the operations we need

  // table users
  await knex('users').del();  // Deletes ALL existing entries of table users
  const password = await bcrypt.hash('secret', saltRounds);
  await knex('users').insert([
    { name: 'admin', email: 'admin@m.com', password }
  ]);

  // table categories
  await knex('categories').del();  // Deletes ALL existing entries of table categories
  await knex('categories').insert([
    { name: 'Fútbol' },
    { name: 'Baloncesto' },
    { name: 'Formula 1' },
  ]);

  // table posts
  await knex('posts').del();  // Deletes ALL existing entries of table posts
  await knex('posts').insert([
    { user_id: 1, category_id: 1, title: 'Post 1', body: 'Contenido del post 1' },
    { user_id: 1, category_id: 2, title: 'Post 3', body: 'Contenido del post 2' },
    { user_id: 1, category_id: 3, title: 'Post 4', body: 'Contenido del post 3' },
  ]);

  // table tags
  await knex('tags').del();  // Deletes ALL existing entries of table tags
  await knex('tags').insert([
    { name: 'TAG 1' },
    { name: 'TAG 2' },
    { name: 'TAG 3' },
  ]);

  // table posts
  await knex('posts_tags').del();  // Deletes ALL existing entries of table posts
  await knex('posts_tags').insert([
    { tag_id: 1, post_id: 1 },
    { tag_id: 1, post_id: 2 },
    { tag_id: 1, post_id: 3 },
    { tag_id: 2, post_id: 3 },
  ]);

  await knex.raw('SET foreign_key_checks = 1'); // Enable all foreign_key
};
