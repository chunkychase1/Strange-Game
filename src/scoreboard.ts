let score = 0
export function setupScore (element: HTMLDivElement): void{
    element.innerHTML = score.toString()
}

//adds score to scoreboard
export function addScore (addAmount: number): void{
    try {
        score += addAmount
    } catch (error) {
        console.log(`score add error : ${error}`)
    }
}