import { ctx, canvas, type Coordinates } from "../canvas"
import { Chase } from "../main"
import { Entity } from "./entityClass"

// list of all alive enemies
const globalEnemiesList: Enemy[] = []

export let endGame = false

export class Enemy extends Entity {
  touching = false

  drawEnemy() {
    if (!ctx || !canvas) return

    ctx.fillStyle = "#d81414ff"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  handleEnemyMovement() {
    if (!this.touching) {
      const heroPosition = { x: Chase.x, y: Chase.y }

      const distanceX = heroPosition.x - this.x
      const distanceY = heroPosition.y - this.y

      // move on X
      if (Math.abs(distanceX) <= this.stepLength) {
        this.x += distanceX
      } else {
        this.x += Math.sign(distanceX) * this.stepLength // move step toward hero
      }

      // move on Y
      if (Math.abs(distanceY) <= this.stepLength) {
        this.y += distanceY
      } else {
        this.y += Math.sign(distanceY) * this.stepLength
      }

      // mark as touching when very close
      if (
        Math.abs(distanceX) <= this.stepLength &&
        Math.abs(distanceY) <= this.stepLength
      ) {
        this.touching = true
      }
    } else {
      // end game if touching
      endGame = true
    }

    this.drawEnemy()
  }
}

export function spawnRandomEnemy() {
  const enemy = new Enemy(5, 5, 10, 4)
  globalEnemiesList.push(enemy)
}

export function updateEnemies() {
  for (const enemy of globalEnemiesList) {
    enemy.handleEnemyMovement()
  }
}

export function findClosestEnemy(): Coordinates | undefined {
  let closest: Coordinates | undefined = undefined
  let closestIndex: number = 0
  let currentIndex: number = 0
  let closestTotal: number = 0

  // helper function for updating values including index, closest, etc
  function updateValues(x: number, y: number, absoluteDifferenceXY: number) {
    closest = { x, y }
    currentIndex += 1
    closestTotal = absoluteDifferenceXY
  }

  const heroPosition = { x: Chase.x, y: Chase.y }

  for (const enemy of globalEnemiesList) {
    const absoluteDifferenceXY: number =
      Math.abs(heroPosition.x - enemy.x) +
      Math.abs(heroPosition.y - enemy.y)

    if (!closestIndex) {
      updateValues(enemy.x, enemy.y, absoluteDifferenceXY)
      continue
    }

    if (closestTotal < absoluteDifferenceXY) {
      updateValues(enemy.x, enemy.y, absoluteDifferenceXY)
    }
  }

  return closest
}