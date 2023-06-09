const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Student", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasSibling: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    siblings: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  });
};
