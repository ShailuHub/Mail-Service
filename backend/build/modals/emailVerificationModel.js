"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
class EmailVerificationSchema extends sequelize_1.Model {
    static isExpired(verificationRecord) {
        const expiredTime = 60 * 60 * 1000;
        const currentTime = new Date();
        return (currentTime.getTime() - verificationRecord.createdAt.getTime() >
            expiredTime);
    }
}
EmailVerificationSchema.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: Date.now(),
    },
}, { sequelize: database_1.default, modelName: "EmailVerification" });
