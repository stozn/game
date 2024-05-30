function darkenColor(color, l) {
    color = color.replace("50%", l.toString()+"%")
    return color;
}


class Player {
    constructor({ x, y, angle, color, username }) {
        this.x = x
        this.y = y
        this.angle = angle
        this.color = color
        this.username = username
        this.projectileCount = 0
        this.maxProjectileCount = 10
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

        c.fillStyle = this.color
        c.font = 18 + "px Arial";
        
        c.fillText(this.username, this.x - 25, this.y - 60)
        // c.restore()
    }

    drawRoundedRect(x, y, width, height, radius) {
        c.beginPath();
        c.moveTo(x + radius, y);
        c.arcTo(x + width, y, x + width, y + height, radius);
        c.arcTo(x + width, y + height, x, y + height, radius);
        c.arcTo(x, y + height, x, y, radius);
        c.arcTo(x, y, x + width, y, radius);
        c.closePath();
    }

    drawBubbleMessage(text) {
        var dialogPadding = 2;
        var dialogFontSize = 24;
        var offsetX = 40;
        var offsetY = -22;

        var textWidth = c.measureText(text).width;
        var dialogWidth = (textWidth + dialogPadding) * 1.35;
        var dialogHeight = dialogFontSize + dialogPadding * 2;

        c.fillStyle = darkenColor(this.color, 85);
        this.drawRoundedRect(this.x + offsetX, this.y + offsetY, dialogWidth, dialogHeight, 10);
        c.fill();

        c.strokeStyle = darkenColor(this.color, 15);
        c.lineWidth = 2;
        this.drawRoundedRect(this.x + offsetX, this.y + offsetY, dialogWidth, dialogHeight, 10);
        c.stroke();

        c.fillStyle = darkenColor(this.color, 5);
        c.font = dialogFontSize + "px Arial";
        c.fillText(text, this.x + dialogPadding + offsetX, this.y + dialogPadding + dialogFontSize + offsetY - 3);
    }
}
