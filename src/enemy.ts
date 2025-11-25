import { ctx, canvas} from "./canvas"
import { getHeroPosition } from "./hero-movement"

const globalEnemiesList: Enemy[] = []//list of all alive enemys

export class Enemy{
    x: number
    y: number
    radius: number
    stepLength: number
    touching = false

    constructor(x: number, y: number, radius: number, stepLength: number) {
        this.x = x
        this.y = y
        this.radius = radius
        this.stepLength = stepLength
    }

    drawEnemy() {
        if (!ctx || !canvas) return

        ctx.fillStyle = '#d81414ff'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }

    spawnEnemy(width: number, height: number) {
        this.x = width / 3;
        this.y = height / 3 //spawn position for enemy
    }

    handleEnemyMovement() {
        if (!this.touching) {

            const heroPosition = getHeroPosition()

            const distanceX = heroPosition.x - this.x
            const distanceY = heroPosition.y - this.y

            // move on X
            if (Math.abs(distanceX) <= this.stepLength) {this.x += distanceX}
            else {this.x += Math.sign(distanceX) * this.stepLength}  // move step toward hero

            // move on Y
            if (Math.abs(distanceY) <= this.stepLength) {this.y += distanceY}
            else {this.y += Math.sign(distanceY) * this.stepLength}

            // mark as touching when very close
            if (Math.abs(distanceX) <= this.stepLength && Math.abs(distanceY) <= this.stepLength) {this.touching = true}
        }

        this.drawEnemy()
    }
}

export function spawnRandomEnemy(){
    const enemy = new Enemy(5, 5, 10, 4)
    globalEnemiesList.push(enemy)
}

export function updateEnemies(){
    for (const enemy of globalEnemiesList) {
        enemy.handleEnemyMovement()
    }
}

