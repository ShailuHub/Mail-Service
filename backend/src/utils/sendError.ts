import { Response } from "express";

const sendError = async (
  res: Response,
  statusCode: number,
  error: string,
  message: string
) => {
  let errorObject = {
    error: "",
    message: "",
  };
  if (error)
    errorObject = { ...errorObject, message: "Have an issue", error: error };
  if (message)
    errorObject = { ...errorObject, message: message, error: "No issue" };

  res.status(statusCode).json(errorObject);
};

export default sendError;
