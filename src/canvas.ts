export type Coordinates = { x: number; y: number }

export let canvas: HTMLCanvasElement
export let ctx: CanvasRenderingContext2D | null
export const radius = 10

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

export const clearCanvas = () => {
  if (!ctx || !canvas) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
