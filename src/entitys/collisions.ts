import { globalEnemiesList } from "./enemy"
import { globalBulletList } from "./bullet"
import { addScore } from "../scoreboard"
import type { Bullet } from "./bullet"
import type { Enemy } from "./enemy"

// use bullet.prevX/prevY -> bullet.x/y as a segment against enemy circle
function bulletHitsEnemy(bullet: Bullet, enemy: Enemy): boolean {
  const x1 = bullet.prevX
  const y1 = bullet.prevY
  const x2 = bullet.x
  const y2 = bullet.y

  const cx = enemy.x
  const cy = enemy.y
  const r = bullet.radius + enemy.radius

  const dx = x2 - x1
  const dy = y2 - y1

  const lenSq = dx * dx + dy * dy

  // if the bullet didn't move, fall back to simple point-circle check
  if (lenSq === 0) {
    const pdx = cx - x1
    const pdy = cy - y1
    return pdx * pdx + pdy * pdy <= r * r
  }

  // project circle center onto segment [x1,y1] -> [x2,y2]
  let t = ((cx - x1) * dx + (cy - y1) * dy) / lenSq
  if (t < 0) t = 0
  else if (t > 1) t = 1

  const closestX = x1 + t * dx
  const closestY = y1 + t * dy

  const distX = closestX - cx
  const distY = closestY - cy
  const distSq = distX * distX + distY * distY

  return distSq <= r * r
}

export function handleBulletEnemyCollisions() {
  const bullets = globalBulletList
  const enemies = globalEnemiesList

  // iterate backwards so splicing is safe
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const bullet = bullets[bi]

    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      const enemy = enemies[ei]

      if (bulletHitsEnemy(bullet, enemy)) {
        // bullet hit enemy -> remove both
        bullets.splice(bi, 1)
        enemies.splice(ei, 1)
        addScore(1)

        // stop checking this bullet (it's gone)
        break
      }
    }
  }
}