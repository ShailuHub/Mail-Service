import { Response } from "express";

const sendError = async (res: Response, statusCode: number, error: string) => {
  res.status(statusCode).json(error);
};

const sendMessage = async (
  res: Response,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).json(message);
};

export { sendError, sendMessage };
