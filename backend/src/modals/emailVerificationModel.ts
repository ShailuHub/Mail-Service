import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";

class EmailVerificationSchema extends Model {
  public token!: string;
  public createdAt!: Date;
  public userId!: number;

  static isExpired(verificationRecord: EmailVerificationSchema) {
    const expiredTime = 60 * 60 * 1000;
    const currentTime = new Date();
    return (
      currentTime.getTime() - verificationRecord.createdAt.getTime() >
      expiredTime
    );
  }
}

EmailVerificationSchema.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  { sequelize, modelName: "EmailVerification" }
);
