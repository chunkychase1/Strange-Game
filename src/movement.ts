import type { Coordinates } from './canvas'
import { drawCircle } from './hero'
import { addScore } from './scoreboard'

const step = 5
const position: Coordinates = { x: 0, y: 0 }

export const centerCircle = (width: number, height: number) => {
  position.x = width / 2
  position.y = height / 2
  drawCircle(position)
}

const keys: Record<string, boolean> = {}

// move based on currently held keys
function handleMovement() {
  let moved = false
  if (keys['w']) {position.y -= step; moved = true}
  if (keys['a']) {position.x -= step; moved = true}
  if (keys['s']) {position.y += step; moved = true}
  if (keys['d']) {position.x += step; moved = true}
  if (moved) {
    addScore(1)
    drawCircle(position)
  }
}

export const initMovement = () => {
  // set keydown state
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    keys[event.key.toLowerCase()] = true
  })
  //set keyup state
  window.addEventListener('keyup', (event: KeyboardEvent) => {
    keys[event.key.toLowerCase()] = false
  })

  // game loop
  const loop = () => {
    handleMovement()
    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}