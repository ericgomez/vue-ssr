const saltRounds = require('./../config').saltRounds;
const User = require('./../models').User;
const bcrypt = require('bcrypt');

// app extended of index.js in src-ssr
// app contain modelude of express
module.exports = (app) => {
  app.post('/api/login', async (req, res) => {
    try {
      const user = await User.where('email', req.body.email).fetch();
      const userJSON = user.toJSON();
      const result = await bcrypt.compare(req.body.password, userJSON.password);

      if (result === true) {
        req.session.userID = userJSON.id;
        req.session.email = userJSON.email;
        req.session.logged = true;
        req.session.name = userJSON.name;

        return res.json({
          res: 'ok',
          message: 'Bienvenido',
          userJSON
        })
          .status(200);
      }

      return res.json({
        res: 'ok',
        message: 'La contraseña es correcta'
      })
        .status(400);
    } catch (e) {
      if (e.message === "EmptyResponse") {
        return res.json({
          res: 'ok', message: 'No existe un usuario con este correo electrónico'
        }).status(200);
      }
      return res.json({ res: 'ok', message: 'Error', trace: e.message }).status(e.code);
    }
  });

  app.post('/api/register', async (req, res) => {
    try {
      await User.where('email', req.body.email).fetch({ require: true });

      return res.json({
        res: 'ok',
        message: 'Este usuario ya esta registrado'
      })
        .status(200);
    } catch (e) {
      if (e.message === 'EmptyResponse') {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await new User({
          name: req.body.name,
          email: req.body.email,
          password: hash
        }).save();

        return res.json({
          res: 'ok',
          message: 'Nueva cuenta creada!',
          newUser
        })
          .status(200);
      }

      return res.json({
        res: 'ok',
        message: 'Error',
        trace: e.message
      })
        .status(e.code);
    }
  });

  app.post('/api/logout', async (req, res) => {
    req.session.userID = null;
    req.session.email = null;
    req.session.logged = false;
    req.session.name = null;

    return res.json({
      res: 'ok',
      message: 'Has cerrado sesión correctamente'
    })
      .status(200);
  });
};
