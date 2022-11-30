const User = require('../models').User;
const bcrypt = require('bcrypt');
const saltRounds = require('./../config').saltRounds;

// app extended of index.js in src-ssr
// app contain modelude of express
module.exports = (app) => {
  app.patch('/api/profile/updates', async (req, res) => {
    // function fetch is method of bookshelf
    const user = await new User({ 'id': req.session.userID }).fetch();

    if (user) {
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      await user.save({ name: req.body.name, password: hash }, { patch: true });

      req.session.name = req.body.name;

      return res.json({
        res: 'ok',
        message: 'Perfil actualizado correctamente',
        name: req.body.name
      })
        .status(200);
    }
  });
};
