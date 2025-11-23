import type { Coordinates } from './canvas'
import { getHeroPosition } from './hero-movement'
import { drawEnemy } from './enemy'

const step = 4
const enemyPosition: Coordinates = { x: 0, y: 0 } //FIX THIS SHIT

//enemy infinite tracking to player
let touching = false 
export function handleEnemyMovement () {
    if (touching == false) {
        const heroPosition = getHeroPosition()

        if (heroPosition.x-enemyPosition.x > 0){enemyPosition.x += step}
        else if (heroPosition.x-enemyPosition.x < 0){enemyPosition.x -= step}

        if (heroPosition.y-enemyPosition.y > 0){enemyPosition.y += step}
        else if (heroPosition.y-enemyPosition.y < 0){enemyPosition.y -= step}

    }
    drawEnemy({x: enemyPosition.x, y: enemyPosition.y})
}

//spawn enemy
export const spawnEnemy = (width: number, height: number) => {
  enemyPosition.x = width / 3
  enemyPosition.y = height / 3 //spawn position for enemy
}

