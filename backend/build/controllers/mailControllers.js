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
exports.update_mail = exports.sent_mail = exports.delete_mail = exports.post_mail = exports.get_inbox = void 0;
const mailModel_1 = require("../modals/mailModel");
const responseHelper_1 = require("../utils/responseHelper");
const authModel_1 = require("../modals/authModel");
const sequelize_1 = require("sequelize");
const get_inbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (userId) {
        try {
            const mails = yield mailModel_1.Mail.findAll({
                where: { receiverId: userId, receiverDeleted: false },
                attributes: [
                    "mailId",
                    "subject",
                    "body",
                    "isRead",
                    "createdAt",
                    "updatedAt",
                ],
                include: [{ model: authModel_1.User, as: "sender", attributes: ["email"] }],
            });
            res.status(200).json({ mails });
        }
        catch (error) {
            console.error(error);
            const errorMessage = error.message;
            (0, responseHelper_1.sendError)(res, 500, errorMessage);
        }
    }
    else {
        (0, responseHelper_1.sendError)(res, 401, "Unauthorized user");
    }
});
exports.get_inbox = get_inbox;
const post_mail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const senderId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    if (senderId) {
        const { subject, body } = req.body;
        let receiverEmail = req.query.receiverEmail;
        if (!receiverEmail)
            return (0, responseHelper_1.sendError)(res, 400, "Receiver email is required");
        receiverEmail = receiverEmail.trim().toLowerCase();
        try {
            const receiver = yield authModel_1.User.findOne({ where: { email: receiverEmail } });
            if (!receiver)
                return (0, responseHelper_1.sendError)(res, 401, "Invalid receiver email");
            const mail = yield mailModel_1.Mail.create({
                senderId: senderId,
                receiverId: receiver.userId,
                subject,
                body,
            });
            (0, responseHelper_1.sendMessage)(res, 201, "Mail sent");
        }
        catch (error) {
            console.error(error);
            const errorMessage = error.message;
            (0, responseHelper_1.sendError)(res, 500, errorMessage);
        }
    }
    else {
        (0, responseHelper_1.sendError)(res, 401, "Unauthorized error");
    }
});
exports.post_mail = post_mail;
const delete_mail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailsToDelete = req.body.mailIds;
        console.log(mailsToDelete);
        for (let mail of mailsToDelete) {
            if (mail.mailType === "inboxMails") {
                yield mailModel_1.Mail.update({ receiverDeleted: true }, { where: { mailId: mail.mailId } });
            }
            else if (mail.mailType === "sentMails") {
                yield mailModel_1.Mail.update({ senderDeleted: true }, { where: { mailId: mail.mailId } });
            }
        }
        (0, responseHelper_1.sendMessage)(res, 201, "Mail deleted successfully");
    }
    catch (error) {
        console.error("Error deleting mails:", error);
        (0, responseHelper_1.sendMessage)(res, 500, "Internal server error");
    }
});
exports.delete_mail = delete_mail;
const sent_mail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const senderId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    if (senderId) {
        try {
            const mails = yield mailModel_1.Mail.findAll({
                where: { senderId, senderDeleted: false },
                attributes: ["mailId", "subject", "body", "createdAt", "updatedAt"],
                include: [
                    {
                        model: authModel_1.User,
                        as: "reciever",
                        attributes: ["email"],
                        where: { userId: sequelize_1.Sequelize.col("Mail.receiverId") },
                    },
                ],
            });
            res.status(200).json({ mails });
        }
        catch (error) {
            console.log(error);
            const errorMessage = error.message;
            (0, responseHelper_1.sendError)(res, 500, errorMessage);
        }
    }
});
exports.sent_mail = sent_mail;
const update_mail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mailId = req.query.mailId;
    if (!mailId)
        return (0, responseHelper_1.sendMessage)(res, 401, "No such mail exists");
    if (mailId) {
        try {
            const mail = yield mailModel_1.Mail.findOne({ where: { mailId } });
            if (mail) {
                mail.isRead = true;
                mail.save();
                console.log(mail);
                res.status(201).json(mail);
            }
        }
        catch (error) {
            console.log(error);
            const errorMessage = error.message;
            (0, responseHelper_1.sendError)(res, 500, errorMessage);
        }
    }
});
exports.update_mail = update_mail;
