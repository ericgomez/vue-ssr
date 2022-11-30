/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments(); // default add id
      table.string('name', 100).notNullable();
      table.string('email', 128).notNullable();
      table.text('biography');
      table.string('password', 128).notNullable();
      table.timestamps(); // timestamps agrega las columnas created_at y updated_at en la base de datos,
    })
    .createTable('categories', function (table) {
      table.increments(); // default add id
      table.string('name').notNullable();
      table.timestamps(); // timestamps agrega las columnas created_at y updated_at en la base de datos,
    })
    .createTable('posts', function (table) {
      table.increments(); // default add id
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.integer('category_id').unsigned().notNullable().references('id').inTable('categories');
      table.string('title', 100).notNullable();
      table.string('picture', 100);
      table.text('body');
      table.timestamps(); // timestamps agrega las columnas created_at y updated_at en la base de datos,
    })
    .createTable('tags', function (table) {
      table.increments(); // default add id
      table.string('name');
      table.timestamps(); // timestamps agrega las columnas created_at y updated_at en la base de datos,
    })
    .createTable('posts_tags', function (table) {
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts');
      table.integer('tag_id').unsigned().notNullable().references('id').inTable('tags');
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // para no tener problemas de integridad referencial la ultima tabla que se crea en caso de ser necesario
  // eliminarla sera la primera que se elimnara, esa sera la secuencua correcta con todas las demas tablas.
  return knex.schema
    .dropTableIfExists('posts_tags')
    .dropTableIfExists('tags')
    .dropTableIfExists('posts')
    .dropTableIfExists('categories')
    .dropTableIfExists('users');
};
