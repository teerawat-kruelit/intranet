const config = {
  user: "sa",
  password: "tokota55",
  database: "member",
  server: "IT-NB-03\\SQL2019",
  pool: {
      max: 10,
      min: 0,
  },
  options: {
      encrypt: true,
      trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
module.exports = config