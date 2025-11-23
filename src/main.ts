import { initCanvas, resizeCanvas } from './canvas'
import { centerCircle, initMovement } from './hero-movement'
import { resetScore, setupScore } from './scoreboard'
import './style.css'

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
  centerCircle(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', handleResize)
handleResize()
initMovement()

//scoreboard setup
const scoreDiv = document.querySelector<HTMLDivElement>('#scoreboard')! 
setupScore(scoreDiv)

//reset button
const resetDiv = document.querySelector<HTMLButtonElement>('#reset-button')!
resetScore(resetDiv)

