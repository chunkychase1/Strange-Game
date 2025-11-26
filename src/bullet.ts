import { ctx, canvas, type Coordinates } from "./canvas"
import { getHeroPosition } from "./hero-movement"
import { findClosestEnemy } from "./enemy"

export class Bullet{
    x: number
    y: number
    radius: number
    lifespan: number
    xadd: number//how much to move x or y every time
    yadd: number

    constructor (x: number, y: number, radius: number, lifespan: number){
    this.x = x
    this.y = y
    this.radius = radius
    this.lifespan = lifespan
    this.xadd = 0
    this.yadd = 0
    }

    drawBullet() {
        if (!ctx || !canvas) return

        ctx.fillStyle = '#4814d8ff'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }

    updateBullet() {
        if (this.yadd == 0 && this.xadd == 0) { //setup first shot direction editing xadd and yadd

            const closestEnemyCoordinates: Coordinates = findClosestEnemy() as Coordinates
            const yDifference: number = Math.abs(closestEnemyCoordinates.y - this.y)
            const xDifference: number = Math.abs(closestEnemyCoordinates.x - this.x)
            
            //setup xadd and yadd
            if (xDifference > yDifference && closestEnemyCoordinates.x - this.x > 0) {this.xadd = 1}
            else if (xDifference > yDifference && closestEnemyCoordinates.x - this.x < 0) {this.xadd = -1}
            else if (yDifference > xDifference && closestEnemyCoordinates.y - this.y > 0) {this.yadd = 1}
            else if (yDifference > xDifference && closestEnemyCoordinates.y - this.y < 0) {this.yadd = -1}
        }
        else if (this.yadd != 0) {this.y += this.yadd}
        else if (this.xadd != 0) {this.x += this.xadd}
        this.drawBullet()
        }
    }



const heroPosition: Coordinates = getHeroPosition()
const testBullet = new Bullet(heroPosition.x, heroPosition.y, 2, 100)
testBullet.drawBullet()
testBullet.updateBullet()
