import { DataTypes } from "sequelize";

export const createCommentModel = (sequelize) =>
  sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // Ideally we would have authorId here instead of simple string
    author: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  }, {
    tableName: "comments",
    paranoid: true,
  });
