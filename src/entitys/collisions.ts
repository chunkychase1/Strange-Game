import { globalEnemiesList } from "./enemy"
import { globalBulletList } from "./bullet"
import { addScore } from "../scoreboard"

export function handleBulletEnemyCollisions() {
  const bullets = globalBulletList
  const enemies = globalEnemiesList

  // iterate backwards so splicing is safe
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const bullet = bullets[bi]

    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      const enemy = enemies[ei]

      const dx = enemy.x - bullet.x
      const dy = enemy.y - bullet.y

      const distanceSquared = dx * dx + dy * dy
      const radii = bullet.radius + enemy.radius
      const radiiSquared = radii * radii

      if (distanceSquared <= radiiSquared) {
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