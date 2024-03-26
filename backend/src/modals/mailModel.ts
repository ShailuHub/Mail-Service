import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

class MailModel extends Model {
  public mailId!: string;
  public senderId!: number;
  public receiverId!: number;
  public subject!: string;
  public body!: string;
  public receiverDeleted!: boolean;
  public senderDeleted!: boolean;
  public isRead!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

MailModel.init(
  {
    mailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    senderDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "Mail" }
);

export { MailModel as Mail };
