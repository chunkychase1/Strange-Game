// Load global CSS
import './style.css'

// Grab the root #app element and inject a canvas into it
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div class="canvas-wrapper">
    <canvas id="drawing-canvas"></canvas>
  </div>
`

// Get the canvas and its 2D drawing context
const canvas = document.querySelector<HTMLCanvasElement>('#drawing-canvas')!
const ctx = canvas.getContext('2d')

// Circle size and position
const radius = 40
let x = 0
let y = 0

// Draw the circle at the current (x, y)
const drawCircle = () => {
  if (!ctx) return // if context fails, do nothing

  // Clear the full canvas before drawing the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw a filled circle at (x, y)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

// Make the canvas fill the window and center the circle
const resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Center the circle after resizing
  x = canvas.width / 2
  y = canvas.height / 2

  drawCircle()
}

// Update canvas size when the window is resized
window.addEventListener('resize', resizeCanvas)
// Initial setup
resizeCanvas()

// Move the circle with WASD keys
window.addEventListener('keydown', (event) => {
  const step = 25 // how far to move each key press

  if (event.key === 'w') y -= step
  if (event.key === 's') y += step
  if (event.key === 'a') x -= step
  if (event.key === 'd') x += step

  drawCircle()
})