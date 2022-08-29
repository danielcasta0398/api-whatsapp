const { Client, LocalAuth } = require('whatsapp-web.js');
const { catchAsync } = require('../utils/catchAsync');
const qrcode = require('qrcode');
const fs = require('fs');
const { Session } = require('../models/sessionModel');
const emitMessage = require('../server');

const sessionChat = catchAsync(async (req, res, next) => {
  //init socket.io serve
  const { id, status } = req.body;
  const emit = emitMessage.emitMessage;

  const existSession = await Session.findOne({ where: { userId: id } });

  //const generateQR = existSession.dataValues.generateQR

  if (!existSession) {
    await Session.create({ userId: id });
  }

 /*if (generateQR == 1) {
    return res.status(200).json({ message: 'Se restablecio el QR' })
}*/


  let clients = {
     1 : new Client({
      authStrategy: new LocalAuth({ clientId : id }),
    }),
  };

 if (!clients[id]) {
    clients = {
      ...clients,
      [id]: new Client({
        authStrategy: new LocalAuth({ clientId : id }),
      }),
    };
  }

 clients[id].on('qr', async qr => {
    let url = await qrcode.toDataURL(qr);
    await Session.update(
      { generateQR:1 },
      { where: { userId: id } }
    );
    if (emit) {
      emit(id,'qr',{url})
    }
    console.log(qr);
    console.log(`Se genero qr ${id}`);
  });

  clients[id].on('ready', async () => {
    console.log(`Se conecto con exito el cliente con id: ${id}`);
    //console.log(clients[id]);
    await Session.update(
      { status: 'online', number: clients[id].info.wid.user, generateQR: 0 },
      { where: { userId: id } }
    );
    if (emit) {
      emit(id,'ready',{status: 'connect'})
    }
  });

  sendMessage = (idUs, number, message) => {
    const numero = number + '@c.us';
    console.log(numero);
    clients[idUs].sendMessage(numero, message);
  };

  module.exports.sendMessage = sendMessage;

  //clients[userId].sendMessage('34641009503@c.us', 'Mensaje Automatico');

  clients[id].on('message', message => {
    const { from, body, hasMedia } = message;

    console.log(from);

    if (from === 'status@broadcast') {
      return;
    }

    console.log(body);

    //clients[id].sendMessage(from, 'hola');
  });

  clients[id].on('disconnected', async reason => {
    console.log('Cliente Desconectado', reason);
    await Session.update(
      { status: 'disconnect', number: 0 },
      { where: { userId: id } }
    );
    if (emit) {
      emit(id,'disconnectBot',{status: 'disconnect'})
      console.log('Entramos');
    }    
  });

  clients[id].initialize()

  res.status(200).json({ message: 'Se genero la conexion con exito' });
});

const getSession = catchAsync(async (req, res, next) => {
  const { userId } = req.body;

  console.log(userId + 'bien');

  if (!userId) {
    return res
      .status(403)
      .json({ message: 'Necesitas enviar el id del usuario', status: false });
  }

  const session = await Session.findOne({ where: { userId } });

  if (!session) {
    return res
      .status(403)
      .json({ message: 'No se encontro session', status: false });
  }

  res.status(200).json({ session });
});

module.exports = { sessionChat, getSession };
