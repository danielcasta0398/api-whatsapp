const { app } = require('./app');

const { db } = require('./utils/database');

const { Server, Socket } = require('socket.io');
// Models
const { initModel } = require('./models/initModels');
const { default: axios } = require('axios');
const { reconnectSession } = require('./utils/reconnectSession');
const { sessionChat } = require('./controllers/sessionController');
const { resetQR } = require('./utils/resetQr');

//Conection to databases

db.authenticate()
  .then(() => console.log('Successful connection to Databases'))
  .catch(err => console.log(err));

// Establish models relations
initModel();

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));
  


//resetQR()

//Create PORT
const PORT = process.env.PORT || 4000;

//Listen the server
const server = app.listen(PORT, () => {
  console.log(`Express app runing on port: ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {

  const idClient = socket.handshake.auth.key
  socket.join(idClient); 

  console.log(`Conectado cliente con ID: ${idClient}`);
  
  emitMessage = (client, key, message) => io.to(client).emit(key, message);

  module.exports.emitMessage = emitMessage;
});

reconnectSession()