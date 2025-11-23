import { ctx, canvas, radius, type Coordinates} from "./canvas"

export const drawHero = (position: Coordinates) => {
  if (!ctx || !canvas) return

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
  ctx.fill()
}