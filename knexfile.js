module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lambda.sqlite3"
    },
    useNullAsDefault: true // new configuration for SQLite
  }
}
