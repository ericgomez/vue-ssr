// importamos el modulo pero el que hemos definido con la configuration de knex
const bookshelf = require('./bookshelf');

const User = bookshelf.model('User', {
  tableName: 'users',
  posts() {
    return this.belongsTo(Post);
  }
});

const Post = bookshelf.model('Post', {
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

const Tag = bookshelf.model('Tag', {
  tableName: 'tags',
  posts() {
    return this.belongsToMany(Post);
  }
});

const Category = bookshelf.model('Category', {
  tableName: 'category'
});

module.exports = {
  User,
  Post,
  Tag,
  Category
};
