module.exports = {
  type: "postgres",
  host: process.env.DATABASE_HOSTNAME,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_BASENAME,
  synchronize: false,
  entities: ["entities/*.js"],
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
