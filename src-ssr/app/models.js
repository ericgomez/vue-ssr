// importamos el modulo pero el que hemos definido con la configuration de knex
const bookshelf = require('./bookshelf');

// Registering already defined models
const User = bookshelf.Model.extend({
  tableName: 'users',
  posts() {
    return this.belongsTo(Post);
  }
});

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  tags() {
    return this.belongsToMany(Tag);
  },
  category() {
    return this.belongsTo(Category);
  },
  owner() {
    return this.belongsTo(User);
  }
});

const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  posts() {
    return this.belongsToMany(Post);
  }
});

const Category = bookshelf.Model.extend({
  tableName: 'category'
});

module.exports = {
  User,
  Post,
  Tag,
  Category
};
