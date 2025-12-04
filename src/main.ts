import './style.css'

import { initCanvas, resizeCanvas, ctx } from './canvas'
import { Hero } from './entitys/hero'
import { resetScore, setupScore } from './scoreboard'
import { endGame, spawnRandomEnemy, updateEnemies } from './entitys/enemy'
import { createBullet, updateBullets } from './entitys/bullet'

// ----------------------
// DOM & Canvas Setup
// ----------------------

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('App root (#app) not found')

app.innerHTML = `
  <div id="scoreboard"></div>
  <button id="reset-button">reset score</button>
  <div class="canvas-wrapper">
    <canvas id="drawing-canvas"></canvas>
  </div>
`

const canvas = document.querySelector<HTMLCanvasElement>('#drawing-canvas')
if (!canvas) throw new Error('Drawing canvas (#drawing-canvas) missing')

initCanvas(canvas)

// ----------------------
// Resize
// ----------------------

const handleResize = () => {
  resizeCanvas()
}

window.addEventListener('resize', handleResize)
handleResize()

// ----------------------
// Hero Setup & Enemy Setup
// ----------------------

export const Chase = new Hero(500, 500, 10, 5)
Chase.initHeroMovement() // spawns hero and starts its movement logic
spawnRandomEnemy()

// ----------------------
// Scoreboard & Reset UI
// ----------------------

const scoreDiv = document.querySelector<HTMLDivElement>('#scoreboard')!
setupScore(scoreDiv)

const resetDiv = document.querySelector<HTMLButtonElement>('#reset-button')!
resetScore(resetDiv)

// ----------------------
// Game Loop
// ----------------------

const loop = () => {
  if (!ctx || !canvas || endGame) return

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // update & draw entities
  Chase.handleHeroMovement()
  updateEnemies()

  createBullet()
  updateBullets()

  if (!endGame) {
    requestAnimationFrame(loop)
  }
}

requestAnimationFrame(loop)