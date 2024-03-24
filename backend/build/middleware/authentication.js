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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authModel_1 = require("../modals/authModel");
const responseHelper_1 = require("../utils/responseHelper");
// Authentication middleware function
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        const secret = process.env.JWT_SECRET_KEY;
        if (token && secret) {
            const decodeToken = jsonwebtoken_1.default.verify(token, secret);
            const user = yield authModel_1.User.findOne({
                where: { userId: decodeToken.userId },
            });
            if (user) {
                req.user = user;
                next();
            }
            else {
                throw new Error("Unauthorized user");
            }
        }
        else {
            throw new Error("Invalid JWT token or secret key");
        }
    }
    catch (error) {
        console.error(error);
        const errorMessage = error.message;
        (0, responseHelper_1.sendError)(res, 403, errorMessage);
    }
});
exports.default = authentication;
