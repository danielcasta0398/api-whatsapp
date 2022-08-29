const { Session } = require("../models/sessionModel");

const resetQR = async() => {
    await Session.update({ generateQR: 0},{ where:{generateQR:1}});
}


module.exports = { resetQR }