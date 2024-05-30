window.addEventListener('keydown', (event) => {
    if (frontEndPlayers[socket.id]) {
        switch (event.code) {
            case 'KeyW':
                keys.w.pressd = true
                break
            case 'KeyA':
                keys.a.pressd = true
                break
            case 'KeyS':
                keys.s.pressd = true
                break
            case 'KeyD':
                keys.d.pressd = true
                break
        }
    }
})

window.addEventListener('keyup', (event) => {
    if (frontEndPlayers[socket.id]) {
        switch (event.code) {
            case 'KeyW':
                keys.w.pressd = false
                break
            case 'KeyA':
                keys.a.pressd = false
                break
            case 'KeyS':
                keys.s.pressd = false
                break
            case 'KeyD':
                keys.d.pressd = false
        }
    }
})