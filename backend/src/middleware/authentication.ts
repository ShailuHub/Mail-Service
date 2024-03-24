import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../modals/authModel";
import { sendError } from "../utils/responseHelper";

// Redeclare express module;
declare module "express" {
  interface Request {
    user?: User;
  }
}

// Authentication middleware function
const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    const secret: string = process.env.JWT_SECRET_KEY as string;
    if (token && secret) {
      const decodeToken = jwt.verify(token, secret) as JwtPayload;
      const user = await User.findOne({
        where: { userId: decodeToken.userId },
      });
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error("Unauthorized user");
      }
    } else {
      throw new Error("Invalid JWT token or secret key");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;
    sendError(res, 403, errorMessage);
  }
};

export default authentication;
