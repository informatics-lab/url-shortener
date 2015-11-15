module.exports = {
  port: process.env.PORT || 3000,
  dbhost: process.env.DB_HOST || "localhost",
  dbname: process.env.DB_NAME || "urlshort",
  domain: process.env.DOMAIN || "localhost"
}
