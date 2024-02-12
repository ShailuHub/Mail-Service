"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Set usename or password of dabase
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
if (!username || !password)
    throw new Error("Please set valid database username or password");
// Create seqelize object
const sequelize = new sequelize_1.Sequelize("mailbox", username, password, {
    host: "localhost",
    dialect: "mysql",
});
exports.default = sequelize;
