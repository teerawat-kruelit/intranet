const config = {
  user: "sa",
  password: "admin",
  database: "member",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
module.exports = config;
