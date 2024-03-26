"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const mailControllers_1 = require("../controllers/mailControllers");
const route = (0, express_1.Router)();
route.get("/inbox", authentication_1.default, mailControllers_1.get_inbox);
route.post("/send-mail", authentication_1.default, mailControllers_1.post_mail);
route.post("/delete-mail", authentication_1.default, mailControllers_1.delete_mail);
route.get("/sent-mail", authentication_1.default, mailControllers_1.sent_mail);
route.patch("/update-mail", authentication_1.default, mailControllers_1.update_mail);
exports.default = route;
