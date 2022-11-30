# Quasar App (website-blog-ssr)

A Quasar@1.1.0 Project

## Install the dependencies default
Selected on quasar/click install vuex and axios


## Install the dependencies
```bash
yarn add vuelidate bookshelf dotenv express-session knex mysql bcrypt body-parser
# or
npm install vuelidate bookshelf dotenv express-session knex mysql bcrypt body-parser
```

### Start mode SSR Quasar
```bash
npx quasar mode add ssr
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npx quasar dev
```

### Create migrations with KNEX (npx knex <command> [migration-name])
```bash
npx knex migrate:make [migration-name]
```

### Run migrations with KNEX (npx knex <command> [migration-name])
```bash
npx knex migrate:latest [migration-name]
```

### Build the app for production
```bash
npx quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
