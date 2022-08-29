const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

//Users
const User = db.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  cedulaNit: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  number: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  urlQr: {
    type: DataTypes.STRING,
    allowNull: true
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = { User };
