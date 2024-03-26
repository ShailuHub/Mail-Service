import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import bcrypt from "bcrypt";
import { Mail } from "./mailModel";

// UserModel class
class UserModel extends Model {
  public userId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Define your custom static method
  static async comparePassword(
    user: UserModel,
    password: string
  ): Promise<boolean> {
    try {
      // Implement the comparison logic here
      if (!user) return false;
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) return true;
      return false;
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }
}

UserModel.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize, modelName: "User" }
);

// Association of user model with mail model
UserModel.hasMany(Mail, { foreignKey: "senderId", as: "sentMails" });
UserModel.hasMany(Mail, { foreignKey: "receiverId", as: "recievedMails" });
Mail.belongsTo(UserModel, { foreignKey: "senderId", as: "sender" });
Mail.belongsTo(UserModel, { foreignKey: "receiverId", as: "reciever" });

// Before creation of new User Middleware
UserModel.beforeCreate(async (user: UserModel) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error("Error hashing error");
  }
});

// Before Updation of password in User Middleware
UserModel.beforeUpdate(async (user: UserModel) => {
  try {
    if (user.changed("password")) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  } catch (error) {
    throw new Error("Error hashing error");
  }
});

export { UserModel as User };
