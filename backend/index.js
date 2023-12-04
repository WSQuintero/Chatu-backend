import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', (socket) => {
  console.log('Client connected')
  socket.on('message', (data) => {
    socket.broadcast.emit('message', data)
  })
})
server.listen(4000)
console.log('Server on port', 4000)
