require("dotenv").config();
const mysql = require("mysql2");
const PORT = process.env.PORT;
const HOST=process.env.HOST;
const port_c=process.env.port_c;
const connection = mysql.createPool({
  host: HOST,
  port: port_c,
  user: "sql12659926",
  password: "LtLdBAcSdW",
  database: "sql12659926",
});

connection.getConnection((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected successfully");
});

module.exports = connection.promise();

/* jdbc:mysql://sql12.freesqldatabase.com:3306/sql12658523*/
