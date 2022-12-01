const Post = require('./../models').Post;
const Category = require('./../models').Category;
const Tag = require('./../models').Tag;

// app extended of index.js in src-ssr
// app contain modelude of express
module.exports = (app) => {
  app.get('/api/blog/posts', (req, res) => {
    // function fetchAll is method of bookshelf
    Post.fetchAll({
      require: true,
      withRelated: [{
        owner: function (qb) {
          qb.column("id", "name");
        },
        category: function (qb) {
          qb.column("id", "name");
        },
        tags: function (qb) {
          qb.column("id", "name");
        },
      }]
    })
      .then(posts => {
        return res.json(posts.toJSON()).status(200);
      })
      .catch(e => {
        if (e.message === 'EmptyResponse') {
          return res.json([]).status(200);
        }
      });
  });

  app.get('/api/blog/posts/:id', (req, res) => {
    // function where is method of bookshelf
    // fetch where is method of bookshelf
    Post
      .where('id', req.params.id)
      .fetch({ require: true, withRelated: ['category', 'tags', 'owner'] })
      .then(post => {
        return res.json(post.toJSON()).status(200);
      })
      .catch(e => {
        if (e.message === 'EmptyResponse') {
          return res.json([]).status(200);
        }
      });
  });

  app.get('/api/blog/tagsAndCategories', async (req, res) => {
    // function fetchAll is method of bookshelf
    try {
      const categories = await Category.fetchAll({ columns: ['id', 'name'], require: true });
      const tags = await Tag.fetchAll({ columns: ['id', 'name'], require: true });

      return res.json({
        categories: categories.toJSON(),
        tags: tags.toJSON()
      })
        .status(200);
    } catch (error) {
      return res.json({
        res: 'ok',
        message: 'Error',
        trace: e.message
      })
        .status(e.code);
    }
  });

  app.post('/api/blog/posts', async (req, res) => {
    // function fetchAll is method of bookshelf
    try {
      const post = req.body.post;
      post.user_id = req.session.userID;

      const newPost = await new Post(post).save();
      const tags = req.body.tags;

      if (tags.length) {
        newPost.tags().attach(req.body.tags);
      }

      return res.json({
        res: 'ok',
        message: 'El post ha sido creado correctamente'
      })
        .status(200);
    } catch (error) {
      return res.json({
        res: 'ok',
        message: 'Error',
        trace: e.message
      })
        .status(e.code);
    }
  });

  app.delete('/api/blog/posts/:id', async (req, res) => {
    // function forge is method of bookshelf
    try {
      Post.forge({ id: req.params.id })
        .fetch(async (post) => {
          await post.tags().detach(); // eliminamos las relaciones
          await post.destroy(); // eliminamos el post

          return res.json({
            res: 'ok',
            message: 'El post ha sido eliminado correctamente'
          })
            .status(200);
        });
    } catch (error) {
      return res.json({
        res: 'ok',
        message: 'Error',
        trace: e.message
      })
        .status(e.code);
    }
  });
};
