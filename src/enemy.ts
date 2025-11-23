import { ctx, canvas, radius} from "./canvas"
import type { Coordinates } from "./canvas"

export const drawCircle = (position: Coordinates) => {
  if (!ctx || !canvas) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
  ctx.fill()
}