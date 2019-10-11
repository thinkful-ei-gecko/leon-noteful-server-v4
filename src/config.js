module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_TEST_URL: process.env.DATABASE_TEST_URL,
  API_TOKEN: process.env.API_TOKEN
}