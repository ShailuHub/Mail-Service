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
exports.signin_post = exports.signup_post = void 0;
const authModel_1 = require("../modals/authModel");
const responseHelper_1 = require("../utils/responseHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield authModel_1.User.findOne({ where: { email: email } });
        if (user)
            return (0, responseHelper_1.sendError)(res, 400, "Email already exist");
        yield authModel_1.User.create({ username, email, password });
        (0, responseHelper_1.sendMessage)(res, 200, "User is sucessfully created");
    }
    catch (error) {
        console.log(error);
        const errorMessage = error.message;
        (0, responseHelper_1.sendError)(res, 500, errorMessage);
    }
});
exports.signup_post = signup_post;
const signin_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield authModel_1.User.findOne({ where: { email: email } });
        if (!user)
            return (0, responseHelper_1.sendError)(res, 400, "Invalid email or password");
        const isMatched = yield authModel_1.User.comparePassword(user, password);
        if (!isMatched)
            return (0, responseHelper_1.sendError)(res, 400, "Invalid email or password");
        const secret = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ userId: user.userId, email: email }, secret, {
            expiresIn: "1hr",
        });
        return res.status(200).json({
            message: "Logged in successfully",
            token: token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        const errorMessage = error.message;
        (0, responseHelper_1.sendError)(res, 500, errorMessage);
    }
});
exports.signin_post = signin_post;
