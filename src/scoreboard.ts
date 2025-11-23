let score = 0
export function setupScore (element: HTMLDivElement): void{
    scoreElement = element
    element.innerHTML = score.toString()
}

//adds score to scoreboard
let scoreElement: HTMLDivElement | null = null
export function addScore (addAmount: number): void{
    try {
        score += addAmount
        if (scoreElement) {
            scoreElement.innerHTML = score.toString() //updates scoreboard
        }
    } catch (error) {
        console.log(`score add error : ${error}`)
    }
}