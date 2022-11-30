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
In the folder src-ssr execute:
```bash
npx quasar dev
```

### Create migrations with KNEX (npx knex <command> [migration-name])
In the folder src-ssr execute:
```bash
npx knex migrate:make [migration-name]
```

### Run migrations with KNEX (npx knex <command> [migration-name])
In the folder src-ssr execute:
```bash
npx knex migrate:latest [migration-name]
```

### Create SEEDS with KNEX
Seed files allow you to populate your database with test or seed data independent of your migration files.
In the folder src-ssr execute:
```bash
npx knex seed:make init
```

### Run SEEDS with KNEX
Seed files allow you to populate your database with test or seed data independent of your migration files.
In the folder src-ssr execute:
```bash
npx knex seed:run
```

### Build the app for production
```bash
npx quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
