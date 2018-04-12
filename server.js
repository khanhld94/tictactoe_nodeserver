
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('New client connected')

socket.on('room', function (room) {
    socket.join(room)
    console.log('New client connected to room ' + room)
    socket.on('sendData', (data) => {
        io.sockets.in(room).emit('sendData', data)
})

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected')
})
})
// just like on the client side, we have a socket.on method that takes a callback function

})

server.listen(port, () => console.log(`Listening on port ${port}`))