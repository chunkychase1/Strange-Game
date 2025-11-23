import { initCanvas, resizeCanvas } from './canvas'
import { centerCircle, initMovement } from './movement'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('App root (#app) not found')

app.innerHTML = `
  <div id="score"></div>
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