require("dotenv").config({
  path: "./.env",
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DB_URL || {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       user: process.env.DB_USER || 'user',
//       database: process.env.DB_NAME || 'las_damas_primero',
//     },
//     migrations: {
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },

//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: './migrations',
//     },

//     seeds: { directory: './seeds' },
//   },
// };
