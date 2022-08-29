const { Session } = require("./sessionModel");
const { User } = require("./userModel");


// Establish your models relations inside thins function
const initModel = () => {
    User.hasOne(Session);
    Session.belongsTo(User)
};

module.exports = { initModel };
