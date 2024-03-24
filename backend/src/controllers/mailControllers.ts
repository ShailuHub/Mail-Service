import { Request, Response } from "express";
import { Mail } from "../modals/mailModel";
import { sendError, sendMessage } from "../utils/responseHelper";
import { User } from "../modals/authModel";
import { Sequelize } from "sequelize";

const get_inbox = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (userId) {
    try {
      const mails = await Mail.findAll({
        where: { receiverId: userId, receiverDeleted: false },
        attributes: ["mailId", "subject", "body", "createdAt", "updatedAt"],
        include: [{ model: User, as: "sender", attributes: ["email"] }],
      });
      res.status(200).json({ mails });
    } catch (error) {
      console.error(error);
      const errorMessage = (error as Error).message;
      sendError(res, 500, errorMessage);
    }
  } else {
    sendError(res, 401, "Unauthorized user");
  }
};

const post_mail = async (req: Request, res: Response) => {
  const senderId = req.user?.userId;
  if (senderId) {
    const { subject, body } = req.body;
    let receiverEmail = req.query.receiverEmail as string;
    if (!receiverEmail)
      return sendError(res, 400, "Receiver email is required");
    receiverEmail = receiverEmail.trim().toLowerCase();
    try {
      const receiver = await User.findOne({ where: { email: receiverEmail } });
      if (!receiver) return sendError(res, 401, "Invalid receiver email");
      const mail = await Mail.create({
        senderId: senderId,
        receiverId: receiver.userId,
        subject,
        body,
      });
      sendMessage(res, 201, "Mail sent");
    } catch (error) {
      console.error(error);
      const errorMessage = (error as Error).message;
      sendError(res, 500, errorMessage);
    }
  } else {
    sendError(res, 401, "Unauthorized error");
  }
};

const delete_mail = async (req: Request, res: Response) => {
  try {
    const mailsToDelete = req.body.mailIds;

    for (let mailId of mailsToDelete) {
      const result = await Mail.update(
        { receiverDeleted: true },
        { where: { mailId } }
      );
      console.log(result);
    }

    sendMessage(res, 201, "Mail deleted successfully");
  } catch (error) {
    console.error("Error deleting mails:", error);
    sendMessage(res, 500, "Internal server error");
  }
};

const sent_mail = async (req: Request, res: Response) => {
  const senderId = req.user?.userId;
  if (senderId) {
    try {
      const mails = await Mail.findAll({
        where: { senderId },
        attributes: ["mailId", "subject", "body", "createdAt", "updatedAt"],
        include: [
          {
            model: User,
            as: "sender",
            attributes: ["email"],
            where: { userId: Sequelize.col("Mail.receiverId") },
          },
        ],
      });
      res.status(200).json({ mails });
    } catch (error) {
      console.log(error);
      const errorMessage = (error as Error).message;
      sendError(res, 500, errorMessage);
    }
  }
};

export { get_inbox, post_mail, delete_mail, sent_mail };
