import { Sequelize } from "sequelize";

// Set usename or password of dabase
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
if (!username || !password)
  throw new Error("Please set valid database username or password");

// Create seqelize object
const sequelize = new Sequelize("mailbox", username, password, {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
