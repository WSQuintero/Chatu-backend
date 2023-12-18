import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

// Objeto para mantener un seguimiento de las salas abiertas
const rooms = {}

io.on('connection', (socket) => {
  socket.on('join', (dataId) => {
    // Salir de la sala anterior, si está en alguna
    if (socket.room) {
      socket.leave(socket.room)
      console.log(`Usuario desconectado de la sala ${socket.room}`)
    }

    // Unirse a la nueva sala
    socket.join(dataId.id)
    socket.room = dataId.id
    socket.sender = dataId.sender

    // Mantener un seguimiento de las salas abiertas
    rooms[dataId.id] = true

    console.log(`Usuario conectado a la sala ${socket.room}`)
    socket.emit('joinResponse', {
      success: true,
      message: 'Successfully joined the room'
    })
  })

  socket.on('leave', () => {
    // Salir de la sala actual, si está en alguna
    if (socket.room) {
      socket.leave(socket.room)
      console.log(`Usuario desconectado de la sala ${socket.room}`)
    }
  })

  socket.on('message', (data) => {
    io.to(socket.room).emit('message', { message: data, sender: socket.sender })
  })
})

server.listen(4000)
console.log('Server on port', 4000)
