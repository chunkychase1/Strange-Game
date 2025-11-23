import { drawCircle, type Coordinates } from './canvas'

const step = 25
const position: Coordinates = { x: 0, y: 0 }

export const centerCircle = (width: number, height: number) => {
  position.x = width / 2
  position.y = height / 2

  drawCircle(position)
}

//mapping wasd to movement
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key.toLowerCase()) {
    case 'w':
      position.y -= step
      break
    case 's':
      position.y += step
      break
    case 'a':
      position.x -= step
      break
    case 'd':
      position.x += step
      break
    default:
      return
  }

  drawCircle(position)
}


export const initMovement = () => {
  window.addEventListener('keydown', handleKeydown)
}
