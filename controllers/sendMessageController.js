const { catchAsync } = require("../utils/catchAsync");
const  sendMessage  = require("./sessionController");

const sendMessages = catchAsync( async(req,res,next) => {

    const {client, message, number} = req.body
    const send = sendMessage.sendMessage
    console.log(number);

    send(client,number, message)

    res.status(200).json({client})
} )

module.exports = { sendMessages }