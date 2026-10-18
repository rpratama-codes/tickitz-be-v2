require("dotenv").config();

const useSSL =
  process.env.DB_SSL === "true" ||
  Boolean(
    process.env.DB_URI &&
      (process.env.DB_URI.includes("sslmode=require") ||
        process.env.DB_URI.includes("ssl=true"))
  );

const baseConfig = {
  use_env_variable: process.env.DB_URI ? "DB_URI" : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
};

module.exports = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig,
};
