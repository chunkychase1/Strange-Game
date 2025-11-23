export type Coordinates = { x: number; y: number }

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D | null
const radius = 10

export const initCanvas = (el: HTMLCanvasElement) => {
  canvas = el
  ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get 2D context')
  }
}

export const resizeCanvas = () => {
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

export const drawCircle = (position: Coordinates) => {
  if (!ctx || !canvas) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
  ctx.fill()
}