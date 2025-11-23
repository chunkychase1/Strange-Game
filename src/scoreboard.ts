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
        updateScore()
    } catch (error) {
        console.log(`score add error : ${error}`)
    }
}

//reset scoreboard button
export function resetScore (element: HTMLButtonElement): void{
    element.addEventListener('click', () => {
        score=0
        updateScore()
})
}

//updates score helper function
function updateScore () {
    if (scoreElement) {
    scoreElement.innerHTML = score.toString() //updates scoreboard
}
}