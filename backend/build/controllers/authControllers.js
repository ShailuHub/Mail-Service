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
const authModal_1 = require("../modals/authModal");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendError_1 = __importDefault(require("../utils/sendError"));
const signup_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield authModal_1.User.findOne({ where: { email: email } });
        if (user)
            return (0, sendError_1.default)(res, 400, "Email already exist", "");
        yield authModal_1.User.create({ username, email, password });
        (0, sendError_1.default)(res, 200, "", "User is sucessfully created");
    }
    catch (error) {
        console.log(error);
        const errorMessage = error.message;
        (0, sendError_1.default)(res, 500, errorMessage, "");
    }
});
exports.signup_post = signup_post;
const signin_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield authModal_1.User.findOne({ where: { email: email } });
        if (!user)
            return res.status(400).json({ error: "Invalid email" });
        // The first paremeter must be plain text and second parament will be hashed password
        const isMatched = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatched)
            return res.status(400).json({ error: "Invalid email or password" });
        if (isMatched) {
            console.log("User is sucessfully logged in");
            return res.status(200).json({ error: "Logged in successfully" });
        }
    }
    catch (error) {
        console.log(error);
        const errorMessage = error.message;
        (0, sendError_1.default)(res, 500, errorMessage, "");
    }
});
exports.signin_post = signin_post;
