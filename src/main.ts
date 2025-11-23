import { resizeCanvas } from './canvas'
import { centerCircle, initMovement } from './movement'

const handleResize = () => {
  resizeCanvas()
  centerCircle(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', handleResize)
handleResize()
initMovement()
