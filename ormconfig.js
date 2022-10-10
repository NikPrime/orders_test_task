module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.API_DB_HOST,
    port: process.env.API_DB_PORT,
    username: process.env.API_DB_USERNAME,
    password: process.env.API_DB_PASSWORD,
    database: process.env.API_DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migration/**/*.js'],
    cli: {
      migrationsDir: 'migration',
    },
    synchronize: false,
  },
];
