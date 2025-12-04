export class Entity{
    x: number
    y: number
    radius: number 
    stepLength: number

    constructor(x: number, y: number, radius: number, stepLength: number) {
        this.x = x
        this.y = y
        this.radius = radius
        this.stepLength = stepLength
    }
}