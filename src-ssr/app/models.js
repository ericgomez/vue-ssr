const bookshelf = require("./bookshelf");
const Models = {};

Models.User = bookshelf.Model.extend({
  tableName: "users",
  posts: function () {
    return this.belongsTo(Models.Post);
  }
});

Models.Post = bookshelf.Model.extend({
  tableName: "posts",
  tags: function () {
    return this.belongsToMany(Models.Tag);
  },
  category: function () {
    return this.belongsTo(Models.Category);
  },
  owner: function () {
    return this.belongsTo(Models.User);
  }
});

Models.Tag = bookshelf.Model.extend({
  tableName: "tags",
  posts: function () {
    return this.belongsToMany(Models.Post);
  }
});

Models.Category = bookshelf.Model.extend({
  tableName: "categories"
});

module.exports = Models;
