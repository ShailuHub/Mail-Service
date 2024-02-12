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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./routes/index");
const database_1 = __importDefault(require("./database/database"));
const app = (0, express_1.default)();
//All Middleware
// Set up body parsing for JSON and form data
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/user", index_1.authRouter);
const PORT = Number(process.env.PORT) || 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync();
        app.listen(PORT, () => {
            console.log(`Server is working on the port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
