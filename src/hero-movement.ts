import type { Coordinates } from './canvas'
import { drawHero } from './hero'
import { addScore } from './scoreboard'

const heroStep = 5
const heroPosition: Coordinates = { x: 0, y: 0 }

//this spawns the hero
export const spawnHero = (width: number, height: number) => {
  heroPosition.x = width / 2
  heroPosition.y = height / 2
  drawHero(heroPosition)
}

const keys: Record<string, boolean> = {}

// move based on currently held keys
export function handleHeroMovement() {
  let heroMoved = false
  if (keys['w']) {heroPosition.y -= heroStep; heroMoved = true}
  if (keys['a']) {heroPosition.x -= heroStep; heroMoved = true}
  if (keys['s']) {heroPosition.y += heroStep; heroMoved = true}
  if (keys['d']) {heroPosition.x += heroStep; heroMoved = true}
  if (heroMoved) {
    addScore(1)
  }
  drawHero(heroPosition)
}

export const initHeroMovement = () => {
  // set keydown state
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    keys[event.key.toLowerCase()] = true
  })
  //set keyup state
  window.addEventListener('keyup', (event: KeyboardEvent) => {
    keys[event.key.toLowerCase()] = false
  })

}

//gets hero position
export function getHeroPosition(): Coordinates{
  return {x: heroPosition.x, y: heroPosition.y}
}
