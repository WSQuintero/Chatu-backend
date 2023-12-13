import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', (socket) => {
  socket.on('join', (dataId) => {
    socket.join(dataId.id)
    socket.room = dataId.id
    socket.sender = dataId.sender
    console.log(`usuario conectado a sala ${dataId.sender}`)
    socket.emit('joinResponse', {
      success: true,
      message: 'Successfully joined the room'
    })
  })
  socket.on('message', (data) => {
    io.to(socket.room).emit('message', { message: data, sender: socket.sender })
  })
})
server.listen(4000)
console.log('Server on port', 4000)
