const socketIO = require('socket.io')
let io = null

exports.initialize = function (server) {
  io = socketIO(server)

  io.on('connection', function (socket) {

    console.log('Usuário conectado!');
    io.emit('message', {'msg': 'Novo usuário conectado!'})

    socket.on('disconnect', function () {
      console.log('Usuário Disconectado!');
    });

  })

}

exports.broadcast = function (event, payload) {
  io.emit(event, payload)
}
