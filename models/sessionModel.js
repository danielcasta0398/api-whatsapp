const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

//Users
const Session = db.define("session", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  number:{
    type: DataTypes.BIGINT,
    allowNull: true   
  },
  
  generateQR:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "disconnect",
  },
});

module.exports = { Session };
