const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

db.connect((err) => (err ? console.log("Erro") : console.log("Conectado")));

module.exports = db;
