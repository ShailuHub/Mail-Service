import { Request, Response } from "express";
import { User } from "../modals/authModel";
import { sendError, sendMessage } from "../utils/responseHelper";
import jwt, { Secret } from "jsonwebtoken";

const signup_post = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) return sendError(res, 400, "Email already exist");
    await User.create({ username, email, password });
    sendMessage(res, 200, "User is sucessfully created");
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).message;
    sendError(res, 500, errorMessage);
  }
};

const signin_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return sendError(res, 400, "Invalid email or password");
    const isMatched = await User.comparePassword(user, password);
    if (!isMatched) return sendError(res, 400, "Invalid email or password");
    const secret: Secret = process.env.JWT_SECRET_KEY as Secret;
    const token = jwt.sign({ userId: user.userId, email: email }, secret, {
      expiresIn: "1hr",
    });
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
      user,
    });
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).message;
    sendError(res, 500, errorMessage);
  }
};

export { signup_post, signin_post };
