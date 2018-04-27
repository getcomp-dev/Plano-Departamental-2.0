const socketIO = require('socket.io')
let io = null

exports.initialize = function (server) {
  io = socketIO(server)

  io.on('connection', function (socket) {

    io.emit('message', {'msg': 'Novo usuário conectado!'})

    socket.on('event', function () {
    })

  })

}

exports.broadcast = function (event, payload) {
  io.emit(event, payload)
}
