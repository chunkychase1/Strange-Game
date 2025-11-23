import type { Coordinates } from './canvas'
import { getHeroPosition } from './hero-movement'
import { drawEnemy } from './enemy'

const step = 4
const enemyPosition: Coordinates = { x: 0, y: 0 }
let touching = false

export function handleEnemyMovement() {
  if (!touching) {
    const heroPosition = getHeroPosition()

    const distanceX = heroPosition.x - enemyPosition.x
    const distanceY = heroPosition.y - enemyPosition.y

    // move on X
    if (Math.abs(distanceX) <= step) {enemyPosition.x += distanceX}
    else {enemyPosition.x += Math.sign(distanceX) * step}  // move step toward hero

    // move on Y
    if (Math.abs(distanceY) <= step) {enemyPosition.y += distanceY}
    else {enemyPosition.y += Math.sign(distanceY) * step}

    // mark as touching when very close
    if (Math.abs(distanceX) <= step && Math.abs(distanceY) <= step) {touching = true}
  }

  drawEnemy(enemyPosition)
}

//spawn enemy
export const spawnEnemy = (width: number, height: number) => {
  enemyPosition.x = width / 3;
  enemyPosition.y = height / 3 //spawn position for enemy
}

