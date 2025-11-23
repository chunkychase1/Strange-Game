// Load global CSS
import './style.css'

// Inject a canvas into the #app root
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div class="canvas-wrapper">
    <canvas id="drawing-canvas"></canvas>
  </div>
`

// Get canvas + 2D context
const canvas = document.querySelector<HTMLCanvasElement>('#drawing-canvas')!
const ctx = canvas.getContext('2d')

const radius = 40
let x = 0
let y = 0

const drawCircle = () => {
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

const resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  x = canvas.width / 2
  y = canvas.height / 2
  drawCircle()
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

window.addEventListener('keydown', (event) => {
  const step = 25

  if (event.key === 'w') y -= step
  if (event.key === 's') y += step
  if (event.key === 'a') x -= step
  if (event.key === 'd') x += step

  drawCircle()
})
