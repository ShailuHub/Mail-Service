"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary module
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.post("/signup", authControllers_1.signup_post);
router.post("/signin", authControllers_1.signin_post);
exports.default = router;
