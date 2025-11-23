import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('App root (#app) not found')

app.innerHTML = `
  <div class="canvas-wrapper">
    <canvas id="drawing-canvas"></canvas>
  </div>
`

const canvas = document.querySelector<HTMLCanvasElement>('#drawing-canvas')
if (!canvas) throw new Error('Drawing canvas (#drawing-canvas) missing')

const ctx = canvas.getContext('2d')
const radius = 40

export type Coordinates = {
  x: number
  y: number
}

export const resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

export const drawCircle = (position: Coordinates) => {
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
  ctx.fill()
}
