export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 10))
  setCounter(0)
}

// the infinite counter ascending
export function speedyCount(element: HTMLDivElement) {
    let count:number = 0
    setInterval(() => {
        count += 1
        element.innerHTML = count.toString()
        console.log("speedyCount works?!")
    }, 1000);
}
