const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const socket = io()

const devicePixelRatio = window.devicePixelRatio || 1

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

const frontEndPlayers = {}

const map = {
    width: 3000,
    height: 3000
}

SPEED = 10

socket.on('connect', () => {
    socket.emit('initCanvas', {
        width: canvas.width,
        height: canvas.height,
    })
    socket.emit('initGame', {
        width: canvas.width,
        height: canvas.height
    })
})


socket.on('updatePlayers', (backEndPlayers) => {
    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        if (!frontEndPlayers[id]) {
            frontEndPlayers[id] = new Player({
                x: backEndPlayer.x,
                y: backEndPlayer.y,
                color: backEndPlayer.color,
            })

            keys.w.pressd = false
            keys.a.pressd = false
            keys.s.pressd = false
            keys.d.pressd = false
            
        }
        if (id != socket.id) {
            frontEndPlayers[id].angle = backEndPlayer.angle
            gsap.to(frontEndPlayers[id], {
                x: backEndPlayer.x,
                y: backEndPlayer.y,
                duration: 0.033,
                ease: 'linear'
            })

        }
    }

    for (const id in frontEndPlayers) {
        if (!backEndPlayers[id]) {
            delete frontEndPlayers[id]
        }
    }
    // console.log(frontEndPlayers)
})

let animationId
function animate() {
    var playerPosition = {
        x: 0,
        y: 0
    }
    for (const id in frontEndPlayers) {
        if (id === socket.id) {
            playerPosition = {
                x: frontEndPlayers[id].x,
                y: frontEndPlayers[id].y,
            }
        }
    }
    c.translate(-(playerPosition.x - canvas.width / 2), -(playerPosition.y - canvas.height / 2))
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(32, 32, 32, 1)'
    c.fillRect(-1500, -1500, 3000, 3000)

    for (const id in frontEndPlayers) {
        const player = frontEndPlayers[id]
        player.draw()
    }

    c.translate((playerPosition.x - canvas.width / 2), (playerPosition.y - canvas.height / 2))
}
animate()


const keys = {
    w: {
        pressd: false
    },
    a: {
        pressd: false
    },
    s: {
        pressd: false
    },
    d: {
        pressd: false
    },
}

setInterval(() => {
    
    if (frontEndPlayers[socket.id]) {
        const prePosition = {
            x: frontEndPlayers[socket.id].x,
            y: frontEndPlayers[socket.id].y,
        }

        frontEndPlayers[socket.id].update(keys)

        socket.emit('updatePlayers', {
            x: frontEndPlayers[socket.id].x,
            y: frontEndPlayers[socket.id].y,
            angle: frontEndPlayers[socket.id].angle
        })
    }
}, 33)

