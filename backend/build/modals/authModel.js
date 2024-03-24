"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailModel_1 = require("./mailModel");
// UserModel class
class UserModel extends sequelize_1.Model {
    // Define your custom static method
    static comparePassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement the comparison logic here
                if (!user)
                    return false;
                const isMatched = yield bcrypt_1.default.compare(password, user.password);
                if (isMatched)
                    return true;
                return false;
            }
            catch (error) {
                throw new Error("Error comparing passwords");
            }
        });
    }
}
exports.User = UserModel;
UserModel.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, { sequelize: database_1.default, modelName: "User" });
// Association of user model with mail model
UserModel.hasMany(mailModel_1.Mail, { foreignKey: "senderId", as: "sentMails" });
UserModel.hasMany(mailModel_1.Mail, { foreignKey: "receiverId", as: "recievedMails" });
mailModel_1.Mail.belongsTo(UserModel, { foreignKey: "senderId", as: "sender" });
mailModel_1.Mail.belongsTo(UserModel, { foreignKey: "receiverId", as: "reciever" });
// Before creation of new User Middleware
UserModel.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        user.password = hashedPassword;
    }
    catch (error) {
        throw new Error("Error hashing error");
    }
}));
// Before Updation of password in User Middleware
UserModel.beforeUpdate((user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user.changed("password")) {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hashedPassword;
        }
    }
    catch (error) {
        throw new Error("Error hashing error");
    }
}));
