"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRouter = exports.authRouter = void 0;
const authRoute_1 = __importDefault(require("../routes/authRoute"));
exports.authRouter = authRoute_1.default;
const mailRoute_1 = __importDefault(require("../routes/mailRoute"));
exports.mailRouter = mailRoute_1.default;
