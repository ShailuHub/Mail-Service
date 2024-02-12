// Import necessary module
import { Router } from "express";
import { signup_post, signin_post } from "../controllers/authControllers";
const router = Router();

router.post("/signup", signup_post);
router.post("/signin", signin_post);

export default router;
