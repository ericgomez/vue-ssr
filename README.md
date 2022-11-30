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
npx quasar dev -m ssr
```

The "error:0308010C:digital envelope routines::unsupported" occurs because Node.js v17 and later use OpenSSL v3.0 which has had breaking changes. To resolve the error, set the NODE_OPTIONS environment variable to --openssl-legacy-provider when running your development server.

#### 👇️ for macOS, Linux or Windows Git Bash
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

#### 👇️ for Windows PowerShell
```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

### Add Plugin in Quasar boot (npx quasar new boot [plugin-name])
Add [plugin-name] in quasar.config.js
```bash
npx quasar new boot [plugin-name]
```

### Add new store module in Quasar (npx quasar new store [store-module-name])
```bash
npx quasar new store [store-module-name]
```

### Add new layout in Quasar (npx quasar new layout [layout-name])
```bash
npx quasar new layout [layout-name]
```

### Add new page in Quasar (npx quasar new page [directory]/[page-name])
```bash
npx quasar new page [directory]/[page-name]
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
