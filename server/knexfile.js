module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'cek',
    database: 'battleship'
  },
  migrations: {
    tableName: 'migrations'
  }
}