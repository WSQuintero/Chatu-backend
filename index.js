import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: 'https://chatu-front.vercel.app',
    credentials: true,
    cors: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'https://chatu-front.vercel.app',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    },
  },
})

app.use(
  cors({
    origin: 'https://chatu-front.vercel.app/', // Reemplaza con tu origen específico
    methods: ['GET', 'POST'],
    credentials: true,
  }),
)// Objeto para mantener un seguimiento de las salas abiertas
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
      message: 'Successfully joined the room',
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
    io.to(socket.room).emit('message', {
      message: data,
      sender: socket.sender,
    })
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Servidor de sockets escuchando en el puerto ${PORT}`)
})
