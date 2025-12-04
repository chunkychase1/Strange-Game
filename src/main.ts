import { initCanvas, resizeCanvas, ctx } from './canvas'
import { Hero } from './entitys/hero'
import { resetScore, setupScore } from './scoreboard'
import { endGame, spawnRandomEnemy, updateEnemies } from './entitys/enemy'
import './style.css'
import { createBullet, updateBullets } from './entitys/bullet'

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

const handleResize = () => {
  resizeCanvas()
  spawnRandomEnemy()
}

window.addEventListener('resize', handleResize)
handleResize()

export const Chase = new Hero(100, 100, 10, 5)
Chase.initHeroMovement()//spawns hero and starts its movement logic

//scoreboard setup
const scoreDiv = document.querySelector<HTMLDivElement>('#scoreboard')! 
setupScore(scoreDiv)

//reset button
const resetDiv = document.querySelector<HTMLButtonElement>('#reset-button')!
resetScore(resetDiv)

// game loop, it will clear the canvas and then move both hero and enemy then loop
const loop = () => {
  if (!ctx || !canvas || endGame) return
  ctx.clearRect(0, 0, canvas.width, canvas.height) //clear canvas

  Chase.handleHeroMovement()//redraw hero and enemy (with updated places if)
  updateEnemies()

  createBullet()
  updateBullets()


  if (!endGame) {requestAnimationFrame(loop)}
}
requestAnimationFrame(loop)

