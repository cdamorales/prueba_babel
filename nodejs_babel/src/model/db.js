const mysql = require("mysql2/promise");
console.log(process.env.MYSQL_USER);
const connectionInformation = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const getConnection = () => {
  return new Promise(async (res, rej) => {
    try {
      const connection = await mysql.createConnection(connectionInformation);
      return res(connection);
    } catch (error) {
      return rej(error);
    }
  });
};

module.exports.getConnection = getConnection;
