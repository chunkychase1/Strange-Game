import { ctx, canvas } from "./canvas"

export class Bullet{
    x: number
    y: number
    radius: number
    lifespan: number

    constructor (x: number, y: number, radius: number, lifespan: number){
    this.x = x
    this.y = y
    this.radius = radius
    this.lifespan = lifespan
    }

    drawEnemy() {
        if (!ctx || !canvas) return

        ctx.fillStyle = '#4814d8ff'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }


}