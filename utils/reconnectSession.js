const { default: axios } = require('axios');
const { Session } = require('../models/sessionModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const reconnectSession = async () => {
  const session = await Session.findAll({ where: { status: 'online' } });

  if (session) {
    session.map(data => {
      setTimeout(async () => {
        await axios.post(
          process.env.NODE_ENV == 'production'
            ? 'https://whatsapp-api-atumano.herokuapp.com/api/v1/sessionchat'
            : 'http://localhost:4000/api/v1/sessionChat',
          { id: data.dataValues.userId }
        );
      }, 5000);
    });
  }
};

module.exports = { reconnectSession };
