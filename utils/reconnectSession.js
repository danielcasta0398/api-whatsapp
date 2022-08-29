const { default: axios } = require("axios")
const { Session } = require("../models/sessionModel")

const reconnectSession = async () => {

    const session = await  Session.findAll({ where:{ status:'online' } })
    
    if (session) {
        session.map( data =>{
            setTimeout( async () => {
                await axios.post('http://localhost:4000/api/v1/sessionChat', {id:data.dataValues.userId})
            }, 5000)
        } )
    }
   
}

module.exports = { reconnectSession }