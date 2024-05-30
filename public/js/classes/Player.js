function darkenColor(color, l) {
    color = color.replace("50%", l.toString()+"%")
    return color;
}


class Player {
    constructor({ x, y, angle, color}) {
        this.x = x
        this.y = y
        this.angle = 0
        this.color = color
    }
    update(keys) {
        if (keys.w.pressd) {
            this.x += SPEED * Math.sin(this.angle)
            this.y += SPEED * Math.cos(this.angle)
        }
        if (keys.a.pressd) {
            this.angle += Math.PI / 180 * 5
            if (this.angle > Math.PI * 2) {
                this.angle -= Math.PI * 2
            }
        }
        if (keys.s.pressd) {
            this.x -= SPEED * Math.sin(this.angle)
            this.y -= SPEED * Math.cos(this.angle)
        }
        if (keys.d.pressd) {
            this.angle -= Math.PI / 180 * 5
            if (this.angle < 0) {
                this.angle += Math.PI * 2
            }
        }
        if (keys.angle) {
            this.angle = keys.angle
        }
    }

    draw() {
        c.save()
        c.translate(this.x, this.y)
        c.rotate(-this.angle)
        c.translate(-this.x, -this.y)

        c.beginPath()
        c.rect(this.x - 25, this.y - 35, 50, 70)
        c.fillStyle = this.color
        c.fill()

        c.strokeStyle = darkenColor(this.color, 15)
        c.lineWidth = 2
        c.stroke()

        c.beginPath()
        c.arc(this.x, this.y, 15, 0, Math.PI * 2)
        c.strokeStyle = darkenColor(this.color, 15)
        c.lineWidth = 2
        c.stroke()

        c.beginPath()
        c.rect(this.x - 7, this.y, 14, 50)
        c.fillStyle = this.color
        c.fill()

        c.strokeStyle = darkenColor(this.color, 15)
        c.lineWidth = 2
        c.stroke()

        c.restore()
    }
}
