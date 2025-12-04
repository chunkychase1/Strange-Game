import { ctx, canvas} from "../canvas"
import { Entity } from "./entityClass"

export class Hero extends Entity {
  keys: Record<string, boolean> = {}//key bullshit 

  initHeroMovement() {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (["w", "a", "s", "d"].includes(key)) {
        this.keys[key] = true
      }
    })
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (["w", "a", "s", "d"].includes(key)) {
        this.keys[key] = false
      }
    })
  }

  drawHero(){
    if (!ctx || !canvas) return

    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // move based on currently held keys each loop
  handleHeroMovement() {
    
    //2 keys pressed logic
    const diagonal_step = this.stepLength/Math.sqrt(2)
    if (this.keys['w'] && this.keys['d']){this.y -= diagonal_step; this.x += diagonal_step;}
    else if (this.keys['w'] && this.keys['a']){this.y -= diagonal_step; this.x -= diagonal_step;}
    else if (this.keys['s'] && this.keys['a']){this.y += diagonal_step; this.x -= diagonal_step;}
    else if (this.keys['s'] && this.keys['d']){this.y += diagonal_step; this.x += diagonal_step;}

    //1 key pressed logic
    else if (this.keys['w']) {this.y -= this.stepLength;}
    else if (this.keys['a']) {this.x -= this.stepLength;}
    else if (this.keys['s']) {this.y += this.stepLength;}
    else if (this.keys['d']) {this.x += this.stepLength;}

    //draw hero in updated spot
    this.drawHero()
}
}