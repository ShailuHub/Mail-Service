import { Model, DataTypes } from "sequelize";
import sequelize from "../database/database";
import bcrypt, { hash } from "bcrypt";

// UserModel class
class UserModel extends Model {
  public userId!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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

//Before creation of new User Middleware
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
