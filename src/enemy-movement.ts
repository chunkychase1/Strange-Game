import type { Coordinates } from './canvas'
import { getHeroPosition } from './hero-movement'
import { drawEnemy } from './enemy'

const step = 6
const enemyPosition: Coordinates = { x: 0, y: 0 } //FIX THIS SHIT

let touching = false //enemy infinite tracking to player
export function initEnemyMovement () {
    while (touching == false) {
        const heroPosition = getHeroPosition()
        if (Math.abs(heroPosition.x-enemyPosition.x) > Math.abs(heroPosition.y-enemyPosition.y)){
            enemyPosition.x += step
        }
        else if (Math.abs(heroPosition.x-enemyPosition.x) < Math.abs(heroPosition.y-enemyPosition.y)){
            enemyPosition.x += step
        }

    }
}

export const centerCircle = (width: number, height: number) => {
  enemyPosition.x = width / 2
  enemyPosition.y = height / 2
  drawEnemy(enemyPosition)
}

