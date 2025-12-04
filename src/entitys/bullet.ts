import { ctx, canvas, mouseX, mouseY, type Coordinates } from "../canvas"
import { Chase } from "../main"
import { Entity } from "./entityClass"

export const globalBulletList: Bullet[] = []

export class Bullet extends Entity {
  lifespan: number

  // how much to move x or y every frame
  xadd: number
  yadd: number

  constructor(
    x: number,
    y: number,
    radius: number,
    stepLength: number, // this is the bullet speed
    lifespan: number
  ) {
    super(x, y, radius, stepLength)
    this.lifespan = lifespan
    this.xadd = 0
    this.yadd = 0
  }

  drawBullet() {
    if (!ctx || !canvas) return

    ctx.fillStyle = "#4814d8ff"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  updateBullet() {
    // move the bullet along its velocity
    this.x += this.xadd
    this.y += this.yadd

    this.drawBullet()
  }
}

// ----------------------
// Bullet list & helpers
// ----------------------

export function createBullet() {
  const heroPosition: Coordinates = { x: Chase.x, y: Chase.y }

  // direction from hero -> mouse
  const dx = mouseX - heroPosition.x
  const dy = mouseY - heroPosition.y

  // distance (hypotenuse)
  const length = Math.hypot(dx, dy) || 1 // avoid divide-by-zero

  // bullet speed (stepLength)
  const speed = 8

  const newBullet = new Bullet(
    heroPosition.x,
    heroPosition.y,
    2,        // radius
    speed,    // stepLength = speed
    100       // lifespan
  )

  // normalize (dx, dy) and scale by speed → per-frame movement
  newBullet.xadd = (dx / length) * newBullet.stepLength
  newBullet.yadd = (dy / length) * newBullet.stepLength

  globalBulletList.push(newBullet)
}

export function updateBullets() {
  // iterate backwards so splicing works safely
  for (let i = globalBulletList.length - 1; i >= 0; i--) {
    const bullet = globalBulletList[i]

    bullet.updateBullet()
    bullet.lifespan -= 1

    if (bullet.lifespan <= 0) {
      globalBulletList.splice(i, 1)
    }
  }
}

export function initBulletControls() {
  canvas.addEventListener("mousedown", (event: MouseEvent) => {
    if (event.button === 0) {
      createBullet()
    }
  })
}