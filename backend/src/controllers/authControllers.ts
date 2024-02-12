import { Request, Response } from "express";
import { User } from "../modals/authModal";
import bcrypt from "bcrypt";
import sendError from "../utils/sendError";

const signup_post = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) return sendError(res, 400, "Email already exist", "");
    await User.create({ username, email, password });
    sendError(res, 200, "", "User is sucessfully created");
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).message;
    sendError(res, 500, errorMessage, "");
  }
};

const signin_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(400).json({ error: "Invalid email" });
    // The first paremeter must be plain text and second parament will be hashed password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(400).json({ error: "Invalid email or password" });
    if (isMatched) {
      console.log("User is sucessfully logged in");
      return res.status(200).json({ error: "Logged in successfully" });
    }
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).message;
    sendError(res, 500, errorMessage, "");
  }
};

export { signup_post, signin_post };
