const express = require('express')
const app = express()

const http = require('http')
const { emit } = require('process')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 8081

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const backEndPlayers = {}


io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('initGame', ({ width, height }) => {
        const playerColor = Math.random() * 360
        var positionValid = false;
        var x = width * Math.random()
        var y = height * Math.random()
        
        backEndPlayers[socket.id] = {
            x,
            y,
            color: `hsl(${playerColor}, 100%, 50%)`,
        }

        backEndPlayers[socket.id].canvas = {
            width,
            height,
        }
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)
        delete backEndPlayers[socket.id]
    })

    socket.on('updatePlayers', ({ x, y, angle }) => {
        if (backEndPlayers[socket.id]) {
            backEndPlayers[socket.id].x = x
            backEndPlayers[socket.id].y = y
            backEndPlayers[socket.id].angle = angle
        }
    })

    socket.on('kill', (playerId) => {
        if (backEndPlayers[socket.id]) {
            delete backEndPlayers[socket.id]
        }
        console.log('kill', playerId, socket.id)
    })
})

setInterval(() => {
    io.emit('updatePlayers', backEndPlayers)
}, 50)

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

console.log('server loaded')