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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.sendError = void 0;
// const sendError = async (
//   res: Response,
//   statusCode: number,
//   error: string,
//   message: string
// ) => {
//   let errorObject = {
//     error: "",
//     message: "",
//   };
//   if (error)
//     errorObject = { ...errorObject, message: "Have an issue", error: error };
//   if (message)
//     errorObject = { ...errorObject, message: message, error: "No issue" };
//   res.status(statusCode).json(errorObject);
// };
const sendError = (res, statusCode, error) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(statusCode).json(error);
});
exports.sendError = sendError;
const sendMessage = (res, statusCode, message) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(statusCode).json(message);
});
exports.sendMessage = sendMessage;
