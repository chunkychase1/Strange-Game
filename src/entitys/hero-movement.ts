import type { Coordinates } from '../canvas'
import { drawHero } from './hero'

const heroStep = 5
const heroPosition: Coordinates = { x: 0, y: 0 }

//this spawns the hero
export const spawnHero = (width: number, height: number) => {
  heroPosition.x = width / 2
  heroPosition.y = height / 2
  drawHero(heroPosition)
}

const keys: Record<string, boolean> = {}

// move based on currently held keys each loop
export function handleHeroMovement() {

  //2 keys pressed logic
  if (keys['w'] && keys['d']){heroPosition.y -= heroStep/2; heroPosition.x += heroStep/2;}
  else if (keys['w'] && keys['a']){heroPosition.y -= heroStep/2; heroPosition.x -= heroStep/2;}
  else if (keys['s'] && keys['a']){heroPosition.y += heroStep/2; heroPosition.x -= heroStep/2;}
  else if (keys['s'] && keys['d']){heroPosition.y += heroStep/2; heroPosition.x += heroStep/2;}

  //1 key pressed logic
  else if (keys['w']) {heroPosition.y -= heroStep;}
  else if (keys['a']) {heroPosition.x -= heroStep;}
  else if (keys['s']) {heroPosition.y += heroStep;}
  else if (keys['d']) {heroPosition.x += heroStep;}

  //draw hero in updated spot
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
